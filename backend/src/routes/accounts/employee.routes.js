import express from "express";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";
import { getEmployeesController } from "../../controllers/accounts/employee.controller.js";
const router = express.Router();

// rutas
// obtener empleados
router.get(
  "/employees",
  authenticateToken,
  authorizeRoles("admin"),
  getEmployeesController
);

export default router;
