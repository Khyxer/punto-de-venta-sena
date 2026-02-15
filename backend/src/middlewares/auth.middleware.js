import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Verificar JWT
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Acceso denegado. No se proporcionó token.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token inválido. Usuario no encontrado.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token inválido.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Tu sesión ha expirado.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error en la autenticación.",
    });
  }
};

// Escala de roles
const roleLevels = {
  cashier: 1,
  employee: 2,
  admin: 3,
  superAdmin: 4,
};

export const authorizeRoles = (minRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no autenticado.",
      });
    }

    const userRole = req.user.role;

    if (!roleLevels[userRole]) {
      return res.status(400).json({
        success: false,
        message: "Rol inválido.",
      });
    }

    if (roleLevels[userRole] < roleLevels[minRole]) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos.",
      });
    }

    next();
  };
};
