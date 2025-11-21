import express from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import { createSaleController, getAllSalesController } from "../controllers/sale.controller.js";

const router = express.Router();

// ====== Rutas de ventas ======
// Crear venta
router.post(
  "/",
  authenticateToken,
  authorizeRoles("cashier"),
  createSaleController
);

//obtener todas las ventas
router.get(
  "/",
  authenticateToken,
  authorizeRoles("cashier"),
  getAllSalesController
);

export default router;
