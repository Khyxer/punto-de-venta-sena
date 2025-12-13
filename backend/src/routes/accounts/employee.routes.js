import express from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";
import {
  getEmployeesController,
  deleteEmployeeController,
  updateEmployeeController,
  changePasswordController,
} from "../../controllers/accounts/employee.controller.js";

const router = express.Router();

// ====== Rutas de Empleados ======

/**
 * @route   GET /api/employees
 * @desc    Obtener una lista de todos los empleados
 * @access  Private (Cualquier usuario autenticado)
 * @returns { "employees": [{ id, name, email, role, ... }] }
 */
router.get(
  "/employees",
  authenticateToken,
  // authorizeRoles("admin"), // Acceso permitido a cualquier rol autenticado
  getEmployeesController
);

/**
 * @route   DELETE /api/employee/:id
 * @desc    Eliminar un empleado por su ID (cambio de estado a inactivo)
 * @access  Private (Admin)
 * @param   {string} id - El ID único del empleado a eliminar.
 * @returns { "message": "Empleado eliminado correctamente" }
 */
router.delete(
  "/employee/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteEmployeeController
);

/**
 * @route   PUT /api/employee/:id
 * @desc    Actualizar la información de un empleado por su ID
 * @access  Private (Admin)
 * @param   {string} id - El ID único del empleado a actualizar.
 * @body    { "name": "Nuevo Nombre", "email": "nuevo.email@dominio.com", "role": "nuevo_rol" }
 * @returns { "message": "Empleado actualizado correctamente", "employee": { ... } }
 */
router.put(
  "/employee/:id",
  authenticateToken,
  authorizeRoles("admin"),
  updateEmployeeController
);

/**
 * @route   PUT /api/employee-password/:id
 * @desc    Cambiar la contraseña de un empleado por su ID
 * @access  Private (Admin)
 * @param   {string} id - El ID único del empleado cuya contraseña se cambiará.
 * @body    { "newPassword": "una_contraseña_segura" }
 * @returns { "message": "Contraseña actualizada correctamente" }
 */
router.put(
  "/employee-password/:id",
  authenticateToken,
  authorizeRoles("admin"),
  changePasswordController
);

export default router;

