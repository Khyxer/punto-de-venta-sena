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

// ====== Rutas de Autenticación y Perfil de Usuario ======

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario en el sistema.
 * @access  Private (Solo para administradores)
 * @body    { "name": "Nombre Usuario", "email": "usuario@example.com", "password": "una_contraseña_segura", "role": "rol_del_usuario" }
 * @returns { "message": "Usuario registrado exitosamente", "user": { "id", "name", "email", "role" } }
 * @returns { "error": "El email ya está en uso" } 400 - Si el email ya existe.
 */
router.post(
  "/register",
  authenticateToken,
  authorizeRoles("admin"),
  registerUserController
);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión para obtener un token de autenticación (JWT).
 * @access  Public
 * @body    { "email": "usuario@example.com", "password": "su_contraseña" }
 * @returns { "token": "JWT_TOKEN_AQUI", "user": { "id", "name", "role" } }
 * @returns { "error": "Credenciales inválidas" } 401 - Si el email o la contraseña son incorrectos.
 */
router.post("/login", loginUserController);

/**
 * @route   GET /api/auth/validate
 * @desc    Obtener los datos del perfil del usuario actualmente autenticado (validando su JWT).
 * @access  Private (Requiere un token válido)
 * @headers { "Authorization": "Bearer JWT_TOKEN_AQUI" }
 * @returns { "user": { "id", "name", "email", "role" } }
 * @returns { "error": "Token no válido o expirado" } 403 - Si el token no es válido.
 */
router.get("/validate", authenticateToken, getProfileController);

export default router;
