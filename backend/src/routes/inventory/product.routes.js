import express from "express";

import { createProductController, getProductsController } from "../../controllers/inventory/product.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

/*
 * Crear producto
 * Rol minimo: employee
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles("employee"),
  createProductController
);

/*
 * Obtener productos
 * Rol minimo: cashier
 */
router.get("/", authenticateToken, authorizeRoles("cashier"), getProductsController);

export default router;
