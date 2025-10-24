// principal
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// rutas
import inventoryRoutes from "./routes/inventory/inventory.routes.js";
import accountsRoutes from "./routes/accounts/user.routes.js";

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

// rutas de cuentas
app.use("/api/auth", accountsRoutes);

// ====== servidor ======

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
