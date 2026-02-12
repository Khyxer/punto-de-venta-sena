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

/**
 * @route   POST /api/client
 * @desc    Crear un nuevo cliente
 * @access  Private (Admin)
 * @body    { "name": "Nombre del Cliente", "email": "cliente@example.com", "phone": "123456789" }
 * @returns { "message": "Cliente creado exitosamente", "client": { ... } }
 */
// Crear cliente
router.post(
  "/client",
  authenticateToken,
  authorizeRoles("admin"),
  createClientController
);

/**
 * @route   GET /api/clients
 * @desc    Obtener todos los clientes
 * @access  Private
 * @returns { "clients": [{ ... }, { ... }] }
 */
// Obtener todos los clientes
router.get(
  "/clients",
  authenticateToken,
  // authorizeRoles("admin"),
  getClientsController
);

/**
 * @route   PUT /api/client
 * @desc    Actualizar un cliente
 * @access  Private (Admin)
 * @body    { "name": "Nuevo Nombre", "email": "nuevo@email.com" }
 * @returns { "message": "Cliente actualizado exitosamente", "client": { ... } }
 */
// Actualizar cliente
router.put(
  "/client",
  authenticateToken,
  authorizeRoles("admin"),
  updateClientController
);

/**
 * @route   DELETE /api/client
 * @desc    Eliminar cliente (cambiar estado)
 * @access  Private (Admin)
 * @returns { "message": "Cliente eliminado exitosamente" }
 */
// Eliminar cliente (Estado)
router.delete(
  "/client",
  authenticateToken,
  authorizeRoles("admin"),
  deleteClientController
);
export default router;