import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const buildPDF = (dataCallback, endCallback) => {
  const doc = new PDFDocument({ margin: 50 });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  return doc;
};

export const generateHeader = (doc, title) => {
  doc
    .fontSize(20)
    .text('NOVA POS - Sistema de Gestión', { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(16)
    .text(title, { align: 'center', underline: true })
    .moveDown(1);

  doc
    .fontSize(10)
    .text(`Fecha de generación: ${new Date().toLocaleString('es-CO')}`, { align: 'right' })
    .moveDown(2);
    
  // Línea separadora
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(2);
};

export const generateTable = (doc, headers, rows) => {
  let y = doc.y;
  const startX = 50;
  const colWidth = 500 / headers.length;

  // Cabeceras
  doc.font('Helvetica-Bold');
  headers.forEach((header, i) => {
    doc.text(header, startX + (i * colWidth), y, { width: colWidth, align: 'left' });
  });
  
  y += 20;
  doc.font('Helvetica');

  // Filas
  rows.forEach((row) => {
    // Verificar si necesitamos nueva página
    if (y > 700) {
      doc.addPage();
      y = 50;
    }

    headers.forEach((_, i) => {
      // Asumimos que 'row' es un array de valores en el mismo orden que headers
      const text = row[i] ? String(row[i]) : '-';
      doc.text(text, startX + (i * colWidth), y, { width: colWidth, align: 'left' });
    });
    y += 20;
  });
};
