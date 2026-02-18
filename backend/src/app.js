import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";

// --- RUTAS ---
import inventoryRoutes from "./routes/inventory/inventory.routes.js";
import accountsRoutes from "./routes/accounts/user.routes.js";
import generalAccountsRoutes from "./routes/accounts/employee.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import clientRoutes from "./routes/client.routes.js";
import trashRoutes from "./routes/trash.routes.js";
import productRoutes from "./routes/inventory/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
// import invoiceRoutes from "./routes/invoice.routes.js";
import reportRoutes from "./routes/reports.js";

// --- CONFIGURACIÓN ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// --- BASE DE DATOS ---
mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// --- API ROUTES ---
app.use("/api/inventory", inventoryRoutes);
app.use("/api/auth", accountsRoutes);
app.use("/api/accounts", generalAccountsRoutes);
app.use("/api", clientRoutes);
app.use("/api/trash", trashRoutes);
app.use("/api/inventory/product", productRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/invoice", invoiceRoutes);
app.use("/api/reports", reportRoutes);

// --- ARCHIVOS ESTÁTICOS (PDFs) ---
const __dirname = path.resolve();
const uploadsPath = path.join(__dirname, "uploads");
const reportsPath = path.join(uploadsPath, "reports");

// Crear carpetas si no existen
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
  // console.log('Carpeta uploads creada');
}
if (!fs.existsSync(reportsPath)) {
  fs.mkdirSync(reportsPath);
  // console.log('Carpeta reports creada');
}

// Servir uploads públicamente
app.use("/uploads", express.static(uploadsPath));

// --- SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Archivos públicos en: ${uploadsPath}`);
});
