import express from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";
import { createProductController } from "../../controllers/inventory/product.controller.js";
import {
  createCategoryController,
  searchCategoriesController,
  deleteCategoryController,
  updateCategoryController,
} from "../../controllers/inventory/category.controller.js";
import {
  createSubCategoryController,
  getSubCategoriesController,
  deleteSubCategoryController,
  updateSubCategoryController,
} from "../../controllers/inventory/subCategory.controller.js";
import {
  createMeasureUnitController,
  getMeasureUnitsController,
  deleteMeasureUnitController,
  updateMeasureUnitController,
} from "../../controllers/inventory/measureUnit.controller.js";
import {
  createSupplierController,
  getSuppliersController,
  deleteSupplierController,
  updateSupplierController,
} from "../../controllers/inventory/supplier.controller.js";

const router = express.Router();

// ====== Rutas de Productos ======

/**
 * @route   POST /api/inventory/product
 * @desc    Crear un nuevo producto en el inventario.
 * @access  Private (Admin)
 * @body    {string} name        - Nombre del producto.
 * @body    {number} price       - Precio del producto.
 * @body    {string} categoryId  - ID de la categoría asociada.
 * @returns {Object} 201         - Mensaje y producto creado.
 */
router.post(
  "/product",
  authenticateToken,
  authorizeRoles("admin"),
  createProductController
);

// ====== Rutas de Categorías ======

/**
 * @route   POST /api/inventory/category
 * @desc    Crear una nueva categoría.
 * @access  Private (Admin)
 * @body    {string} name - Nombre de la categoría.
 * @returns {Object} 201  - Mensaje y categoría creada.
 */
router.post(
  "/category",
  authenticateToken,
  authorizeRoles("admin"),
  createCategoryController
);

/**
 * @route   GET /api/inventory/category
 * @desc    Obtener todas las categorías.
 * @access  Private
 * @returns {Object} 200          - Lista de categorías.
 * @returns {Array}  200.categories - Arreglo de categorías.
 */
router.get(
  "/category",
  authenticateToken,
  searchCategoriesController
);

/**
 * @route   DELETE /api/inventory/category
 * @desc    Eliminar una categoría usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id - ID de la categoría a eliminar.
 * @returns {Object} 200 - Mensaje de eliminación.
 */
router.delete(
  "/category",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCategoryController
);

/**
 * @route   PUT /api/inventory/category
 * @desc    Actualizar una categoría usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id   - ID de la categoría a actualizar.
 * @body    {string} name - Nuevo nombre de la categoría.
 * @returns {Object} 200  - Mensaje y categoría actualizada.
 */
router.put(
  "/category",
  authenticateToken,
  authorizeRoles("admin"),
  updateCategoryController
);

// ====== Rutas de Subcategorías ======

/**
 * @route   POST /api/inventory/subcategory
 * @desc    Crear una nueva subcategoría.
 * @access  Private (Admin)
 * @body    {string} name       - Nombre de la subcategoría.
 * @body    {string} categoryId - ID de la categoría padre.
 * @returns {Object} 201        - Mensaje y subcategoría creada.
 */
router.post(
  "/subcategory",
  authenticateToken,
  authorizeRoles("admin"),
  createSubCategoryController
);

/**
 * @route   GET /api/inventory/subcategory
 * @desc    Obtener todas las subcategorías.
 * @access  Private
 * @returns {Object} 200              - Lista de subcategorías.
 * @returns {Array}  200.subcategories - Arreglo de subcategorías.
 */
router.get(
  "/subcategory",
  authenticateToken,
  getSubCategoriesController
);

/**
 * @route   DELETE /api/inventory/subcategory
 * @desc    Eliminar una subcategoría usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id - ID de la subcategoría a eliminar.
 * @returns {Object} 200 - Mensaje de eliminación.
 */
router.delete(
  "/subcategory",
  authenticateToken,
  authorizeRoles("admin"),
  deleteSubCategoryController
);

/**
 * @route   PUT /api/inventory/subcategory
 * @desc    Actualizar una subcategoría usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id - ID de la subcategoría a actualizar.
 * @body    {string} name - Nuevo nombre de la subcategoría.
 * @returns {Object} 200  - Mensaje y subcategoría actualizada.
 */
router.put(
  "/subcategory",
  authenticateToken,
  authorizeRoles("admin"),
  updateSubCategoryController
);

// ====== Rutas de Unidades de Medida ======

/**
 * @route   POST /api/inventory/measureunit
 * @desc    Crear una nueva unidad de medida.
 * @access  Private (Admin)
 * @body    {string} name         - Nombre de la unidad (ej. "Kilogramo").
 * @body    {string} abbreviation - Abreviatura (ej. "kg").
 * @returns {Object} 201          - Mensaje y unidad creada.
 */
router.post(
  "/measureunit",
  authenticateToken,
  authorizeRoles("admin"),
  createMeasureUnitController
);

/**
 * @route   GET /api/inventory/measureunit
 * @desc    Obtener todas las unidades de medida.
 * @access  Private
 * @returns {Object} 200           - Lista de unidades de medida.
 * @returns {Array}  200.measureUnits - Arreglo de unidades de medida.
 */
router.get(
  "/measureunit",
  authenticateToken,
  getMeasureUnitsController
);

/**
 * @route   DELETE /api/inventory/measureunit
 * @desc    Eliminar una unidad de medida usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id - ID de la unidad de medida a eliminar.
 * @returns {Object} 200 - Mensaje de eliminación.
 */
router.delete(
  "/measureunit",
  authenticateToken,
  authorizeRoles("admin"),
  deleteMeasureUnitController
);

/**
 * @route   PUT /api/inventory/measureunit
 * @desc    Actualizar una unidad de medida usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id - ID de la unidad de medida a actualizar.
 * @body    {string} name         - Nuevo nombre.
 * @body    {string} abbreviation - Nueva abreviatura.
 * @returns {Object} 200          - Mensaje y unidad actualizada.
 */
router.put(
  "/measureunit",
  authenticateToken,
  authorizeRoles("admin"),
  updateMeasureUnitController
);

// ====== Rutas de Proveedores ======

/**
 * @route   POST /api/inventory/supplier
 * @desc    Crear un nuevo proveedor.
 * @access  Private (Admin)
 * @body    {string} name    - Nombre del proveedor.
 * @body    {string} contact - Información de contacto.
 * @returns {Object} 201     - Mensaje y proveedor creado.
 */
router.post(
  "/supplier",
  authenticateToken,
  authorizeRoles("admin"),
  createSupplierController
);

/**
 * @route   GET /api/inventory/supplier
 * @desc    Obtener todos los proveedores.
 * @access  Private
 * @returns {Object} 200        - Lista de proveedores.
 * @returns {Array}  200.suppliers - Arreglo de proveedores.
 */
router.get(
  "/supplier",
  authenticateToken,
  getSuppliersController
);

/**
 * @route   DELETE /api/inventory/supplier
 * @desc    Eliminar un proveedor usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id - ID del proveedor a eliminar.
 * @returns {Object} 200 - Mensaje de eliminación.
 */
router.delete(
  "/supplier",
  authenticateToken,
  authorizeRoles("admin"),
  deleteSupplierController
);

/**
 * @route   PUT /api/inventory/supplier
 * @desc    Actualizar un proveedor usando query params (?id=).
 * @access  Private (Admin)
 * @query   {string} id - ID del proveedor a actualizar.
 * @body    {string} name - Nuevo nombre del proveedor.
 * @returns {Object} 200 - Mensaje y proveedor actualizado.
 */
router.put(
  "/supplier",
  authenticateToken,
  authorizeRoles("admin"),
  updateSupplierController
);

export default router;
