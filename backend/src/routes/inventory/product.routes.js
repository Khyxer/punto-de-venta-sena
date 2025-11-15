import express from "express";

import { createProductController } from "../../controllers/inventory/product.controller.js";
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

export default router;
