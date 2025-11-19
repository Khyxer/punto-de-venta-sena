import express from "express";
import { createProductController } from "../../controllers/inventory/product.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// ====== Rutas de Productos ======

/**
 * @route   POST /api/products/
 * @desc    Crear un nuevo producto en el sistema.
 * @access  Private (Requiere rol de 'employee' o superior)
 * @body    {
 *            "name": "Nombre del Producto",
 *            "description": "Descripción detallada del producto",
 *            "price": 120.50,
 *            "stock": 100,
 *            "categoryId": "ID_de_la_categoria",
 *            "subcategoryId": "ID_de_la_subcategoria",
 *            "measureUnitId": "ID_de_la_unidad_de_medida",
 *            "supplierId": "ID_del_proveedor"
 *          }
 * @returns { "message": "Producto creado exitosamente", "product": { ... } }
 * @returns { "error": "Faltan campos requeridos" } 400 - Si no se envían todos los datos necesarios.
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles("employee"), // Rol mínimo requerido: empleado
  createProductController
);

export default router;

