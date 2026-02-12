import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const counterFile = path.join(__dirname, "../../data/invoiceCounter.json");

// Crear carpeta data si no existe
const dataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Inicializar archivo si no existe
if (!fs.existsSync(counterFile)) {
  fs.writeFileSync(counterFile, JSON.stringify({ lastNumber: 0 }, null, 2));
}

export const getNextInvoiceNumber = () => {
  try {
    const data = JSON.parse(fs.readFileSync(counterFile, "utf-8"));
    const nextNumber = data.lastNumber + 1;

    // Guardar el nuevo número
    fs.writeFileSync(
      counterFile,
      JSON.stringify({ lastNumber: nextNumber }, null, 2)
    );

    return nextNumber;
  } catch (error) {
    console.error("Error al obtener número de factura:", error);
    return 1;
  }
};

export const getCurrentInvoiceNumber = () => {
  try {
    const data = JSON.parse(fs.readFileSync(counterFile, "utf-8"));
    return data.lastNumber || 0;
  } catch (error) {
    console.error("Error al leer número de factura:", error);
    return 0;
  }
};
