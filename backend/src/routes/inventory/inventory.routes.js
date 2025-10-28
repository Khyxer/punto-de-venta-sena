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

// ====== Rutas de productos del inventario ======
// Crear producto
router.post("/product", createProductController);

// ====== Rutas de categorias del inventario ======
// Crear categoria
router.post(
  "/category",
  authenticateToken,
  authorizeRoles("admin"),
  createCategoryController
);

// Buscar categorias
router.get(
  "/category",
  authenticateToken,
  authorizeRoles("admin"),
  searchCategoriesController
);

// Eliminar categoria
router.delete(
  "/category",
  authenticateToken,
  authorizeRoles("admin"),
  deleteCategoryController
);

// Actualizar categoria
router.put(
  "/category",
  authenticateToken,
  authorizeRoles("admin"),
  updateCategoryController
);

// ====== Rutas de Sub Categorias =======
// Crear subcategoria
router.post(
  "/subCategory",
  authenticateToken,
  authorizeRoles("admin"),
  createSubCategoryController
);

// Buscar subcategorias
router.get(
  "/subCategory",
  authenticateToken,
  authorizeRoles("admin"),
  getSubCategoriesController
);

// Eliminar subcategoria
router.delete(
  "/subCategory",
  authenticateToken,
  authorizeRoles("admin"),
  deleteSubCategoryController
);

// Actualizar subcategoria
router.put(
  "/subCategory",
  authenticateToken,
  authorizeRoles("admin"),
  updateSubCategoryController
);

// ====== Rutas de unidad de medida ======
// Crear unidad de medida
router.post(
  "/measureUnit",
  authenticateToken,
  authorizeRoles("admin"),
  createMeasureUnitController
);

// Buscar unidad de medida
router.get(
  "/measureUnit",
  authenticateToken,
  authorizeRoles("admin"),
  getMeasureUnitsController
);

// Eliminar unidad de medida
router.delete(
  "/measureUnit",
  authenticateToken,
  authorizeRoles("admin"),
  deleteMeasureUnitController
);

// Actualizar unidad de medida
router.put(
  "/measureUnit",
  authenticateToken,
  authorizeRoles("admin"),
  updateMeasureUnitController
);

// ===== Rutas de proveedores ======
router.post(
  "/supplier",
  authenticateToken,
  authorizeRoles("admin"),
  createSupplierController
);

// Buscar proveedores
router.get(
  "/supplier",
  authenticateToken,
  authorizeRoles("admin"),
  getSuppliersController
);

// Eliminar proveedor
router.delete(
  "/supplier",
  authenticateToken,
  authorizeRoles("admin"),
  deleteSupplierController
);

// Actualizar proveedor
router.put(
  "/supplier",
  authenticateToken,
  authorizeRoles("admin"),
  updateSupplierController
);

export default router;
