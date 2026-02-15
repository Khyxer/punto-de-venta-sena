import Report from '../models/Report.js';
import Sale from '../models/sale.model.js';       
import Product from '../models/product.model.js'; 
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONTROLADORES BÁSICOS ---

export const getReports = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, type, startDate, endDate } = req.query;
    let filter = {};
    if (type && type !== 'all') filter.type = type;
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const reports = await Report.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Report.countDocuments(filter);

    res.status(200).json({ success: true, data: reports, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByIdAndDelete(id);
    if (!report) return res.status(404).json({ message: 'Reporte no encontrado' });

    // Intentar borrar archivo
    const filepath = path.join(process.cwd(), 'uploads', 'reports', `report-${id}.pdf`);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);

    res.status(200).json({ success: true, message: 'Reporte eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: 'Reporte no encontrado' });

    let filepath;
    if (report.downloadUrl && report.downloadUrl.startsWith('/uploads')) {
        filepath = path.join(process.cwd(), report.downloadUrl);
    } else {
        filepath = path.join(process.cwd(), 'uploads', 'reports', `report-${id}.pdf`);
    }

    if (!fs.existsSync(filepath)) return res.status(404).json({ message: 'Archivo físico no encontrado' });

    res.download(filepath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GENERACIÓN DE REPORTE ---

export const generateReport = async (req, res) => {
  try {
    const { title, type, startDate, endDate } = req.body;

    // 1. Crear registro en BD (estado 'processing')
    const newReport = new Report({
      title,
      type,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      status: 'processing'
    });
    await newReport.save();
    
    // Responder rápido al cliente
    res.status(201).json(newReport);

    // 2. Procesar PDF en segundo plano
    generatePDF(newReport).then(async (url) => {
        newReport.status = 'completed';
        newReport.downloadUrl = url;
        await newReport.save();
    }).catch(async (err) => {
        console.error("Error PDF:", err);
        newReport.status = 'failed';
        await newReport.save();
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- LÓGICA DE DATOS Y PDF ---

async function generatePDF(report) {
  const doc = new PDFDocument({ margin: 40 });
  const filename = `report-${report._id}.pdf`;
  const folderPath = path.join(process.cwd(), 'uploads', 'reports');
  
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
  
  const filepath = path.join(folderPath, filename);
  const stream = fs.createWriteStream(filepath);
  doc.pipe(stream);

  // 1. Obtener Datos Reales
  let data = {};
  if (report.type === 'sales') data = await getSalesData(report.startDate, report.endDate);
  else if (report.type === 'inventory') data = await getInventoryData();
  else if (report.type === 'cash') data = await getCashFlowData(report.startDate, report.endDate);

  // 2. Diseño del PDF
  
  // LOGO
  // Intentamos buscar logo.png o logo.jpg en la raíz del backend
  const logoPathPNG = path.join(process.cwd(), 'logo.png');
  const logoPathJPG = path.join(process.cwd(), 'logo.jpg');
  
  if (fs.existsSync(logoPathPNG)) {
      doc.image(logoPathPNG, { fit: [100, 50], align: 'center' });
  } else if (fs.existsSync(logoPathJPG)) {
      doc.image(logoPathJPG, { fit: [100, 50], align: 'center' });
  } else {
      // Si no hay logo, texto grande
      doc.fillColor('#2563eb').fontSize(24).font('Helvetica-Bold').text('NOVA POS', { align: 'center' });
  }
  
  doc.moveDown(0.5);
  doc.fillColor('black').fontSize(10).font('Helvetica').text('Sistema de Gestión de Ventas', { align: 'center' });
  doc.moveDown();
  
  // Línea divisoria
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  // Título del Reporte
  doc.fontSize(16).font('Helvetica-Bold').text(`REPORTE DE ${report.type.toUpperCase()}`, { align: 'center' });
  doc.fontSize(10).font('Helvetica').text(`Generado el: ${new Date().toLocaleString()}`, { align: 'center' });
  
  if (report.startDate) {
      const start = new Date(report.startDate).toLocaleDateString();
      const end = report.endDate ? new Date(report.endDate).toLocaleDateString() : 'Hoy';
      doc.text(`Periodo: ${start} - ${end}`, { align: 'center' });
  }
  
  doc.moveDown(2);

  // Contenido dinámico
  if (report.type === 'sales') {
      doc.fontSize(14).font('Helvetica-Bold').text('RESUMEN DE VENTAS');
      doc.moveDown(0.5);
      
      doc.fontSize(11).font('Helvetica').text(`Total Vendido: `, { continued: true }).font('Helvetica-Bold').text(`$${data.total.toLocaleString()}`);
      doc.font('Helvetica').text(`Transacciones: `, { continued: true }).font('Helvetica-Bold').text(`${data.count}`);
      
      doc.moveDown(1.5);
      doc.fontSize(14).font('Helvetica-Bold').text('TOP 5 PRODUCTOS MÁS VENDIDOS');
      doc.moveDown(0.5);
      
      data.topProducts.forEach((p, i) => {
          doc.fontSize(10).font('Helvetica').text(`${i+1}. ${p.name} - ${p.qty} unid. - $${p.total.toLocaleString()}`);
      });
      
      if(data.topProducts.length === 0) {
          doc.fontSize(10).font('Helvetica-Oblique').text('No se encontraron ventas en este periodo.');
      }
  } 
  else if (report.type === 'inventory') {
      doc.fontSize(14).font('Helvetica-Bold').text('ESTADO DEL INVENTARIO');
      doc.moveDown(0.5);
      
      doc.fontSize(11).font('Helvetica').text(`Total Productos Registrados: `, { continued: true }).font('Helvetica-Bold').text(`${data.totalProducts}`);
      doc.font('Helvetica').text(`Valor Total Inventario: `, { continued: true }).font('Helvetica-Bold').text(`$${data.totalValue.toLocaleString()}`);
      
      doc.moveDown(1.5);
      doc.fontSize(14).font('Helvetica-Bold').text('ALERTAS DE STOCK BAJO (< 10 unid.)');
      doc.moveDown(0.5);
      
      if(data.lowStock.length > 0) {
          data.lowStock.forEach(p => {
              doc.fontSize(10).font('Helvetica').fillColor('red').text(`• ${p.name}: ${p.stock} unidades (Precio: $${p.price})`);
          });
      } else {
          doc.fontSize(10).font('Helvetica').fillColor('green').text('Todo el inventario tiene buen nivel de stock.');
      }
      doc.fillColor('black'); // Reset color
  }
  else if (report.type === 'cash') {
      doc.fontSize(14).font('Helvetica-Bold').text('FLUJO DE CAJA (Estimado)');
      doc.moveDown(0.5);
      doc.fontSize(11).text(`Ingresos Totales por Ventas: $${data.totalIncome.toLocaleString()}`);
      doc.text(`Cantidad de Ventas: ${data.transactionCount}`);
      doc.moveDown();
      doc.fontSize(9).font('Helvetica-Oblique').text('* Nota: Este reporte se basa en el total de ventas registradas, ya que no se encontró módulo de apertura/cierre de caja.');
  }

  // Pie de página
  doc.fontSize(8).text('Reporte generado automáticamente por NOVA POS', 50, 700, { align: 'center', width: 500 });

  doc.end();

  return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(`/uploads/reports/${filename}`));
      stream.on('error', reject);
  });
}

// --- FUNCIONES AUXILIARES PARA DATOS ---

async function getSalesData(start, end) {
    const filter = {};
    if (start || end) {
        filter.createdAt = {};
        if (start) filter.createdAt.$gte = start;
        if (end) filter.createdAt.$lte = end;
    }
    
    // IMPORTANTE: Populate para traer nombres de productos si es referencia
    const sales = await Sale.find(filter);
    
    const total = sales.reduce((sum, s) => sum + (s.total || 0), 0);
    
    // Calcular productos más vendidos
    let productMap = {};
    
    sales.forEach(sale => {
        // Adaptación flexible a tu estructura de datos
        const items = sale.products || sale.items || [];
        
        items.forEach(item => {
            // Intentamos obtener el nombre de varias formas posibles
            const name = item.name || (item.product && item.product.name) || item.productId?.name || 'Producto Desconocido';
            
            if (!productMap[name]) productMap[name] = { name, qty: 0, total: 0 };
            
            const quantity = item.quantity || item.qty || 1;
            const price = item.price || 0;
            
            productMap[name].qty += quantity;
            productMap[name].total += (quantity * price);
        });
    });

    const topProducts = Object.values(productMap)
        .sort((a,b) => b.qty - a.qty)
        .slice(0, 5);
    
    return { total, count: sales.length, topProducts };
}

async function getInventoryData() {
    const products = await Product.find();
    
    // Asumiendo campos standard: price, stock, quantity
    const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || p.quantity || 0)), 0);
    
    // Umbral de stock bajo: 10
    const lowStock = products.filter(p => (p.stock || p.quantity || 0) < 10); 
    
    return { 
        totalProducts: products.length, 
        totalValue, 
        lowStock: lowStock.map(p => ({
            name: p.name,
            stock: p.stock || p.quantity || 0,
            price: p.price || 0
        }))
    };
}

async function getCashFlowData(start, end) {
    const salesData = await getSalesData(start, end);
    return {
        totalIncome: salesData.total,
        transactionCount: salesData.count
    };
}
