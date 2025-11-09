import express from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import {
  createClientController,
  getClientsController,
  updateClientController,
  deleteClientController,
} from "../controllers/client.controller.js";

const router = express.Router();

// ====== Rutas de clientes ======
// Crear cliente
router.post(
  "/client",
  authenticateToken,
  authorizeRoles("admin"),
  createClientController
);

// Obtener todos los clientes
router.get(
  "/clients",
  authenticateToken,
  // authorizeRoles("admin"),
  getClientsController
);

// Actualizar cliente
router.put(
  "/client",
  authenticateToken,
  authorizeRoles("admin"),
  updateClientController
);

// Eliminar cliente (Estado)
router.delete(
  "/client",
  authenticateToken,
  authorizeRoles("admin"),
  deleteClientController
);

export default router;
