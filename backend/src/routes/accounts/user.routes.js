import express from "express";
import {
  registerUserController,
  loginUserController,
  getProfileController,
} from "../../controllers/accounts/user.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../../middlewares/auth.middleware.js";
const router = express.Router();
// rutas

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario en el sistema
 * @access  Private (Admin)
 * @body    { "name": "Nombre Usuario", "email": "usuario@example.com", "password": "una_contraseña_segura", "role": "rol_del_usuario" }
 * @returns { "message": "Usuario registrado exitosamente", "user": { "id", "name", "email", "role" } }
 */
// Crear un nuevo usuario
router.post(
  "/register",
  authenticateToken,
  authorizeRoles("admin"),
  registerUserController
);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión para obtener un token de autenticación (JWT)
 * @access  Public
 * @body    { "email": "usuario@example.com", "password": "su_contraseña" }
 * @returns { "token": "JWT_TOKEN_AQUI", "user": { "id", "name", "role" } }
 */
// Iniciar sesión
router.post("/login", loginUserController);

/**
 * @route   GET /api/auth/validate
 * @desc    Obtener los datos del perfil del usuario autenticado verificando su JWT
 * @access  Private
 * @headers { "Authorization": "Bearer JWT_TOKEN_AQUI" }
 * @returns { "user": { "id", "name", "email", "role" } }
 */
//obtener datos del usuario autenticado verificando su JWT
router.get("/validate", authenticateToken, getProfileController);
export default router;