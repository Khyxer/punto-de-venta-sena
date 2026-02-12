// principal
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// rutas
import inventoryRoutes from "./routes/inventory/inventory.routes.js";
import accountsRoutes from "./routes/accounts/user.routes.js";
import generalAccountsRoutes from "./routes/accounts/employee.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import clientRoutes from "./routes/client.routes.js";
import trashRoutes from "./routes/trash.routes.js";
import productRoutes from "./routes/inventory/product.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";

// variables de entorno
dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// middleware
app.use(express.json());

// conectar a la base de datos
mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// ====== rutas ======

// rutas de inventario
app.use("/api/inventory", inventoryRoutes);

// rutas de cuentas autenticadas
app.use("/api/auth", accountsRoutes);

// rutas de cuentas generales (empleados y clientes)
app.use("/api/accounts", generalAccountsRoutes);

// rutas de clientes
app.use("/api", clientRoutes);

// rutas de papelera
app.use("/api/trash", trashRoutes);

// rutas de productos
app.use("/api/inventory/product", productRoutes);

// rutas de ventas
app.use("/api/sale", saleRoutes);

// rutas de dashboard
app.use("/api/dashboard", dashboardRoutes);

// rutas de facturación
app.use("/api/invoice", invoiceRoutes);

// ====== servidor ======


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
