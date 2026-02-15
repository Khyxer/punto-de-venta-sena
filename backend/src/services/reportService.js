import Sale from '../models/sale.model.js';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

// --- FUNCIÓN PRINCIPAL EXPORTADA ---
export const generateReportFile = async (reportId, params) => {
  // 1. Normalización del tipo (evita errores por mayúsculas o espacios)
  const rawType = params.type || 'general';
  const type = rawType.toLowerCase().trim();
  let data;

  console.log(`Processing report generation for ID: ${reportId}, Type: ${type}`);

  // 2. Obtener datos según el tipo
  try {
    if (['sales', 'venta', 'ventas'].includes(type)) {
      data = await getSalesData(params);
    } 
    else if (['inventory', 'inventario'].includes(type)) {
      // PROVISIONAL: Datos vacíos para inventario para que no falle
      console.log("⚠️ Reporte de inventario solicitado (Funcionalidad pendiente, generando plantilla)");
      data = {
        summary: {
          totalSalesAmount: 0,
          totalInvoices: 0,
          totalItemsSold: 0,
          startDate: params.startDate,
          endDate: params.endDate
        },
        details: []
      };
    } 
    else {
      // CASO POR DEFECTO: Para que nunca se rompa el servidor
      console.warn(`⚠️ Tipo de reporte desconocido: "${type}". Generando PDF genérico.`);
      data = {
        summary: {
          totalSalesAmount: 0,
          totalInvoices: 0,
          totalItemsSold: 0,
          startDate: null,
          endDate: null
        },
        details: []
      };
    }
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    throw error;
  }

  // 3. Definir ruta del archivo
  const fileName = `report-${reportId}.pdf`;
  // Usamos process.cwd() para asegurar que la ruta sea correcta desde la raíz del proyecto
  const filePath = path.join(process.cwd(), 'uploads', 'reports', fileName); 
  
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // --- DISEÑO DEL PDF ---
      
      // Encabezado
      doc.fontSize(20).text('NOVA POS', { align: 'center' });
      doc.fontSize(14).text(`Reporte de ${type.toUpperCase()}`, { align: 'center', underline: true });
      doc.moveDown();
      
      doc.fontSize(10).text(`Generado: ${new Date().toLocaleString()}`, { align: 'right' });
      doc.text(`ID: ${reportId}`, { align: 'right' });
      doc.moveDown(2);

      // Resumen
      doc.fontSize(12).font('Helvetica-Bold').text('RESUMEN:');
      doc.font('Helvetica').fontSize(10);
      
      // Validamos que los valores existan antes de usar toLocaleString
      const totalAmount = data.summary.totalSalesAmount || 0;
      const totalInvoices = data.summary.totalInvoices || 0;
      const totalItems = data.summary.totalItemsSold || 0;

      doc.text(`Total Ventas: $${totalAmount.toLocaleString()}`);
      doc.text(`Cantidad Facturas: ${totalInvoices}`);
      doc.text(`Items Vendidos: ${totalItems}`);
      
      if (data.summary.startDate) {
        doc.text(`Desde: ${new Date(data.summary.startDate).toLocaleDateString()}`);
      }
      if (data.summary.endDate) {
        doc.text(`Hasta: ${new Date(data.summary.endDate).toLocaleDateString()}`);
      }
      
      doc.moveDown(2);

      // Tabla de Detalles (Si se solicitaron y existen)
      if (data.details && data.details.length > 0) {
        doc.fontSize(12).font('Helvetica-Bold').text('DETALLE DE MOVIMIENTOS:');
        doc.moveDown(0.5);

        const tableTop = doc.y;
        const itemX = 50;
        const dateX = 150;
        const clientX = 250;
        const totalX = 450;

        // Cabecera Tabla
        doc.fontSize(9).font('Helvetica-Bold');
        doc.text('Factura', itemX, tableTop);
        doc.text('Fecha', dateX, tableTop);
        doc.text('Cliente', clientX, tableTop);
        doc.text('Total', totalX, tableTop);

        doc.moveTo(itemX, tableTop + 15).lineTo(550, tableTop + 15).stroke();
        
        let y = tableTop + 25;
        doc.font('Helvetica');

        data.details.forEach((item) => {
          // Nueva página si se acaba el espacio
          if (y > 700) {
            doc.addPage();
            y = 50;
          }

          doc.text(item.invoiceNumber || '-', itemX, y);
          doc.text(new Date(item.date).toLocaleDateString(), dateX, y);
          doc.text(item.client, clientX, y, { width: 180, ellipsis: true });
          doc.text(`$${item.total.toLocaleString()}`, totalX, y);
          
          y += 20;
        });
      } else {
        doc.fontSize(10).font('Helvetica-Oblique').text('(No hay detalles para mostrar o no fueron solicitados)', { align: 'center' });
      }

      // Fin PDF
      doc.end();

      stream.on('finish', () => {
        console.log(`Archivo PDF creado exitosamente: ${fileName}`);
        resolve({
          fileName,
          filePath: `/uploads/reports/${fileName}`, // URL relativa para guardar en BD
          data: data.summary 
        });
      });

      stream.on('error', (err) => {
        console.error("❌ Error escribiendo archivo PDF:", err);
        reject(err);
      });

    } catch (err) {
      console.error("❌ Error interno generando PDF:", err);
      reject(err);
    }
  });
};

// --- HELPER: OBTENER DATOS DE VENTAS ---
const getSalesData = async (params) => {
  const { startDate, endDate, include } = params;
  const query = {};

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  const sales = await Sale.find(query)
    .populate("client", "name email")
    .populate("employee", "name")
    .populate("products.product", "name price");

  const result = {
    summary: {
      totalSalesAmount: 0,
      totalInvoices: 0,
      totalItemsSold: 0,
      startDate: startDate || null,
      endDate: endDate || null,
      generatedAt: new Date(),
    },
    details: [], 
  };

  sales.forEach((sale) => {
    result.summary.totalSalesAmount += sale.total;
    result.summary.totalInvoices += 1;
    result.summary.totalItemsSold += (sale.totalItems || 0);

    // Siempre agregamos detalles para el PDF
    // (Podemos optimizar filtrando aquí si la base de datos es enorme)
    result.details.push({
      invoiceNumber: sale.invoiceNumber,
      date: sale.createdAt,
      client: sale.client?.name || "Cliente General",
      employee: sale.employee?.name || "-",
      total: sale.total,
      items: sale.products.map((item) => ({
        product: item.product?.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    });
  });

  return result;
};
