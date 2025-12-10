import express from "express";
import { createProductController } from "../../controllers/inventory/product.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// ====== Rutas de Productos ======

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto en el sistema.
 * @access  Private (requiere rol de "employee" o superior)
 * @body    {string} name           - Nombre del producto.
 * @body    {string} description    - Descripción detallada del producto.
 * @body    {number} price          - Precio del producto.
 * @body    {number} stock          - Cantidad en inventario.
 * @body    {string} categoryId     - ID de la categoría.
 * @body    {string} subcategoryId  - ID de la subcategoría.
 * @body    {string} measureUnitId  - ID de la unidad de medida.
 * @body    {string} supplierId     - ID del proveedor.
 * @returns {Object} 201 - Mensaje de éxito y producto creado.
 * @returns {Object} 400 - Error si faltan campos requeridos o los datos no son válidos.
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles("employee"), // Rol mínimo requerido: employee
  createProductController
);

export default router;
