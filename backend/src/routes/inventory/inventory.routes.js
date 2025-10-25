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
import { createMeasureUnitController } from "../../controllers/inventory/measureUnit.controller.js";
import {
  createSubCategoryController,
  getSubCategoriesController,
  deleteSubCategoryController,
  updateSubCategoryController,
} from "../../controllers/inventory/subCategory.controller.js";
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
  "/unit",
  authenticateToken,
  authorizeRoles("admin"),
  createMeasureUnitController
);

export default router;
