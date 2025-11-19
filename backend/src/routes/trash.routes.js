import express from "express";
import {
  getAllTrashItems,
  restoreItem,
  permanentDelete,
} from "../controllers/trash.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Middleware para proteger todas las rutas de este archivo
// Solo los administradores pueden acceder a la papelera.
router.use(authenticateToken, authorizeRoles("admin"));

// ====== Rutas de la Papelera de Reciclaje ======

/**
 * @route   GET /api/trash/
 * @desc    Obtener una lista de todos los items que han sido eliminados (soft delete).
 * @access  Private (Admin)
 * @returns { "trashItems": [{ id, type, data, ... }] }
 */
router.get("/", getAllTrashItems);

/**
 * @route   PATCH /api/trash/:type/:id/restore
 * @desc    Restaurar un item eliminado, devolviéndolo a su estado activo.
 * @access  Private (Admin)
 * @param   {string} type - El tipo de item a restaurar (ej. 'product', 'client', 'category').
 * @param   {string} id - El ID del item a restaurar.
 * @returns { "message": "Item restaurado exitosamente", "item": { ... } }
 * @returns { "error": "Item no encontrado en la papelera" } 404 - Si el item no existe.
 */
router.patch("/:type/:id/restore", restoreItem);

/**
 * @route   DELETE /api/trash/:type/:id
 * @desc    Eliminar permanentemente un item de la base de datos. ¡Esta acción no se puede deshacer!
 * @access  Private (Admin)
 * @param   {string} type - El tipo de item a eliminar (ej. 'product', 'client', 'category').
 * @param   {string} id - El ID del item a eliminar permanentemente.
 * @returns { "message": "Item eliminado permanentemente" }
 * @returns { "error": "Item no encontrado" } 404 - Si el item no existe.
 */
router.delete("/:type/:id", permanentDelete);

export default router;
