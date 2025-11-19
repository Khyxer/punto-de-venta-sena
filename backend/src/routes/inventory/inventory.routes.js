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
 * @body    { "name": "Nombre Producto", "price": 150.50, "categoryId": "ID_de_la_categoria", ... }
 * @returns { "message": "Producto creado", "product": { ... } }
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
 * @body    { "name": "Nombre de la Categoría" }
 * @returns { "message": "Categoría creada", "category": { ... } }
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
 * @returns { "categories": [{ ... }] }
 */
router.get(
  "/category",
  authenticateToken,
  searchCategoriesController
);

/**
 * @route   DELETE /api/inventory/category/:id
 * @desc    Eliminar una categoría por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID de la categoría a eliminar.
 * @returns { "message": "Categoría eliminada" }
 */
router.delete(
  "/category/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCategoryController
);

/**
 * @route   PUT /api/inventory/category/:id
 * @desc    Actualizar una categoría por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID de la categoría a actualizar.
 * @body    { "name": "Nuevo nombre de categoría" }
 * @returns { "message": "Categoría actualizada", "category": { ... } }
 */
router.put(
  "/category/:id",
  authenticateToken,
  authorizeRoles("admin"),
  updateCategoryController
);

// ====== Rutas de Subcategorías ======
/**
 * @route   POST /api/inventory/subcategory
 * @desc    Crear una nueva subcategoría.
 * @access  Private (Admin)
 * @body    { "name": "Nombre Subcategoría", "categoryId": "ID_de_la_categoria_padre" }
 * @returns { "message": "Subcategoría creada", "subcategory": { ... } }
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
 * @returns { "subcategories": [{ ... }] }
 */
router.get(
  "/subcategory",
  authenticateToken,
  getSubCategoriesController
);

/**
 * @route   DELETE /api/inventory/subcategory/:id
 * @desc    Eliminar una subcategoría por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID de la subcategoría a eliminar.
 * @returns { "message": "Subcategoría eliminada" }
 */
router.delete(
  "/subcategory/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteSubCategoryController
);

/**
 * @route   PUT /api/inventory/subcategory/:id
 * @desc    Actualizar una subcategoría por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID de la subcategoría a actualizar.
 * @body    { "name": "Nuevo nombre" }
 * @returns { "message": "Subcategoría actualizada", "subcategory": { ... } }
 */
router.put(
  "/subcategory/:id",
  authenticateToken,
  authorizeRoles("admin"),
  updateSubCategoryController
);


// ====== Rutas de Unidades de Medida ======
/**
 * @route   POST /api/inventory/measureunit
 * @desc    Crear una nueva unidad de medida.
 * @access  Private (Admin)
 * @body    { "name": "Kilogramo", "abbreviation": "kg" }
 * @returns { "message": "Unidad de medida creada", "measureUnit": { ... } }
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
 * @returns { "measureUnits": [{ ... }] }
 */
router.get(
  "/measureunit",
  authenticateToken,
  getMeasureUnitsController
);

/**
 * @route   DELETE /api/inventory/measureunit/:id
 * @desc    Eliminar una unidad de medida por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID de la unidad de medida.
 * @returns { "message": "Unidad de medida eliminada" }
 */
router.delete(
  "/measureunit/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteMeasureUnitController
);

/**
 * @route   PUT /api/inventory/measureunit/:id
 * @desc    Actualizar una unidad de medida por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID de la unidad de medida.
 * @body    { "name": "Gramo", "abbreviation": "g" }
 * @returns { "message": "Unidad de medida actualizada", "measureUnit": { ... } }
 */
router.put(
  "/measureunit/:id",
  authenticateToken,
  authorizeRoles("admin"),
  updateMeasureUnitController
);


// ====== Rutas de Proveedores ======
/**
 * @route   POST /api/inventory/supplier
 * @desc    Crear un nuevo proveedor.
 * @access  Private (Admin)
 * @body    { "name": "Nombre Proveedor", "contact": "contacto@proveedor.com" }
 * @returns { "message": "Proveedor creado", "supplier": { ... } }
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
 * @returns { "suppliers": [{ ... }] }
 */
router.get(
  "/supplier",
  authenticateToken,
  getSuppliersController
);

/**
 * @route   DELETE /api/inventory/supplier/:id
 * @desc    Eliminar un proveedor por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID del proveedor a eliminar.
 * @returns { "message": "Proveedor eliminado" }
 */
router.delete(
  "/supplier/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteSupplierController
);

/**
 * @route   PUT /api/inventory/supplier/:id
 * @desc    Actualizar un proveedor por su ID.
 * @access  Private (Admin)
 * @param   {string} id - ID del proveedor a actualizar.
 * @body    { "name": "Nuevo Nombre Proveedor" }
 * @returns { "message": "Proveedor actualizado", "supplier": { ... } }
 */
router.put(
  "/supplier/:id",
  authenticateToken,
  authorizeRoles("admin"),
  updateSupplierController
);

export default router;
