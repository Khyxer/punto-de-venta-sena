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
// rutas

/**
 * @route   GET /api/employees
 * @desc    Obtener una lista de todos los empleados
 * @access  Private
 * @returns { "employees": [{ id, name, email, role, ... }] }
 */
// obtener empleados
router.get(
  "/employees",
  authenticateToken,
  // authorizeRoles("admin"),
  getEmployeesController
);

/**
 * @route   DELETE /api/employee
 * @desc    Eliminar un empleado (cambio de estado a inactivo)
 * @access  Private (Admin)
 * @returns { "message": "Empleado eliminado correctamente" }
 */
// eliminar empleado
router.delete(
  "/employee",
  authenticateToken,
  authorizeRoles("admin"),
  deleteEmployeeController
);

/**
 * @route   PUT /api/employee
 * @desc    Actualizar la información de un empleado
 * @access  Private (Admin)
 * @body    { "name": "Nuevo Nombre", "email": "nuevo.email@dominio.com", "role": "nuevo_rol" }
 * @returns { "message": "Empleado actualizado correctamente", "employee": { ... } }
 */
// actualizar empleado
router.put(
  "/employee",
  authenticateToken,
  authorizeRoles("admin"),
  updateEmployeeController
);

/**
 * @route   PUT /api/employee-password
 * @desc    Cambiar la contraseña de un empleado
 * @access  Private (Admin)
 * @body    { "newPassword": "una_contraseña_segura" }
 * @returns { "message": "Contraseña actualizada correctamente" }
 */
// cambiar contraseña
router.put(
  "/employee-password",
  authenticateToken,
  authorizeRoles("admin"),
  changePasswordController
);
export default router;