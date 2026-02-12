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
router.use(authenticateToken, authorizeRoles("admin"));

/**
 * @route   GET /api/trash/
 * @desc    Obtener todos los items eliminados
 * @access  Private (Admin)
 * @returns { "trashItems": [{ id, type, data, ... }] }
 */
// GET /api/trash - Obtener TODOS los items eliminados
router.get("/", getAllTrashItems);

/**
 * @route   PATCH /api/trash/:type/:id/restore
 * @desc    Restaurar un item eliminado
 * @access  Private (Admin)
 * @param   {string} type - El tipo de item a restaurar
 * @param   {string} id - El ID del item a restaurar
 * @returns { "message": "Item restaurado exitosamente", "item": { ... } }
 */
// PATCH /api/trash/:type/:id/restore - Restaurar item
router.patch("/:type/:id/restore", restoreItem);

/**
 * @route   DELETE /api/trash/:type/:id
 * @desc    Eliminar permanentemente un item de la base de datos
 * @access  Private (Admin)
 * @param   {string} type - El tipo de item a eliminar
 * @param   {string} id - El ID del item a eliminar permanentemente
 * @returns { "message": "Item eliminado permanentemente" }
 */
// DELETE /api/trash/:type/:id - Eliminar permanentemente
router.delete("/:type/:id", permanentDelete);
export default router;