import express from "express";
import {
  registerUserController,
  loginUserController,
  getProfileController,
} from "../../controllers/accounts/user.controller.js";
import { authenticateToken } from "../../middlewares/auth.middleware.js";
const router = express.Router();

// rutas
// Crear un nuevo usuario
router.post("/register", registerUserController);
// Iniciar sesión
router.post("/login", loginUserController);
//obtener datos del usuario autenticado verificando su JWT
router.get("/validate", authenticateToken, getProfileController);

export default router;
