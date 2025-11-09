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

// GET /api/trash - Obtener TODOS los items eliminados
router.get("/", getAllTrashItems);

// PATCH /api/trash/:type/:id/restore - Restaurar item
router.patch("/:type/:id/restore", restoreItem);

// DELETE /api/trash/:type/:id - Eliminar permanentemente
router.delete("/:type/:id", permanentDelete);

export default router;
