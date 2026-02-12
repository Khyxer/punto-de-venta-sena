import express from "express";

import { createProductController, getProductsController, deleteProductController, updateProductController } from "../../controllers/inventory/product.controller.js";

import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";
const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto en el sistema
 * @access  Private (employee)
 * @body    {string} name - Nombre del producto
 * @body    {string} description - Descripción del producto
 * @body    {number} price - Precio del producto
 * @body    {number} stock - Cantidad en inventario
 * @body    {string} categoryId - ID de la categoría
 * @body    {string} subcategoryId - ID de la subcategoría
 * @body    {string} measureUnitId - ID de la unidad de medida
 * @body    {string} supplierId - ID del proveedor
 * @returns {Object} 201 - Mensaje y producto creado
 */
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

/**
 * @route   GET /api/products
 * @desc    Obtener productos
 * @access  Private (cashier)
 * @returns {Object} 200 - Lista de productos
 */
/*
 * Obtener productos
 * Rol minimo: cashier
 */
router.get("/", authenticateToken, authorizeRoles("cashier"), getProductsController);

/*
 * Eliminar producto
 * Rol minimo: admin
 */
router.delete("/", authenticateToken, authorizeRoles("admin"), deleteProductController);

/*
 * Actualizar producto
 * Rol minimo: employee
 */
router.put("/", authenticateToken, authorizeRoles("employee"), updateProductController);

export default router;

