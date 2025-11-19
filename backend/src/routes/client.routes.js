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
router.get(
  "/clients",
  authenticateToken,
  // authorizeRoles("admin"), // Comentado, acceso para usuarios autenticados
  getClientsController
);

/**
 * @route   PUT /api/client/:id
 * @desc    Actualizar un cliente por su ID
 * @access  Private (Admin)
 * @param   {string} id - El ID del cliente a actualizar
 * @body    { "name": "Nuevo Nombre", "email": "nuevo@email.com" }
 * @returns { "message": "Cliente actualizado exitosamente", "client": { ... } }
 */
router.put(
  "/client/:id", // Se recomienda usar un parámetro en la URL para identificar el recurso
  authenticateToken,
  authorizeRoles("admin"),
  updateClientController
);

/**
 * @route   DELETE /api/client/:id
 * @desc    Eliminar un cliente (cambiar estado a inactivo)
 * @access  Private (Admin)
 * @param   {string} id - El ID del cliente a eliminar
 * @returns { "message": "Cliente eliminado exitosamente" }
 */
router.delete(
  "/client/:id", // Se recomienda usar un parámetro en la URL
  authenticateToken,
  authorizeRoles("admin"),
  deleteClientController
);

export default router;
