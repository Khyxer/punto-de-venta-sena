import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../../controllers/accounts/user.controller.js";
import { authenticateToken } from "../../middlewares/auth.middleware.js";
const router = express.Router();

// rutas
// Crear un nuevo usuario
router.post("/register", registerUserController);
// Iniciar sesión
router.post("/login", loginUserController);

export default router;
