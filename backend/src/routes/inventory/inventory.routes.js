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
} from "../../controllers/inventory/category.controller.js";
import { createMeasureUnitController } from "../../controllers/inventory/measureUnit.controller.js";
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

// ====== Rutas de unidad de medida ======
// Crear unidad de medida
router.post(
  "/unit",
  authenticateToken,
  authorizeRoles("admin"),
  createMeasureUnitController
);

export default router;
