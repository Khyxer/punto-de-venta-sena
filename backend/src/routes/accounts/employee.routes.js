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
// obtener empleados
router.get(
  "/employees",
  authenticateToken,
  // authorizeRoles("admin"),
  getEmployeesController
);

// eliminar empleado
router.delete(
  "/employee",
  authenticateToken,
  authorizeRoles("admin"),
  deleteEmployeeController
);

// actualizar empleado
router.put(
  "/employee",
  authenticateToken,
  authorizeRoles("admin"),
  updateEmployeeController
);

// cambiar contraseña
router.put(
  "/employee-password",
  authenticateToken,
  authorizeRoles("admin"),
  changePasswordController
);

export default router;
