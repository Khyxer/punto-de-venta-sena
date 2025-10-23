// controladores de usuarios
import User from "../../models/user.model.js";

// Controlador para registrar un usuario
export const registerUserController = async (req, res) => {
  try {
    const { name, userName, password, role } = req.body;

    // validar datos
    if (
      !userName ||
      !password ||
      userName.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Usuario y contraseña requeridos.",
      });
    }

    // validar caracteres permitidos
    if (!/^[a-zA-Z0-9_-]+$/.test(userName)) {
      return res.status(400).json({
        success: false,
        message:
          "El nombre de usuario solo puede tener letras, números, guiones y guiones bajos.",
      });
    }

    // usuario en uso
    const userExist = await User.findOne({ userName });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "El usuario ya esta en uso.",
      });
    }

    // crear usuario
    // el usuario debe ser en minusculas y sin espacios en ningun lado
    const user = new User({
      name,
      userName: userName.trim().toLowerCase().replace(/\s/g, ""),
      password,
      role,
    });

    // guardar usuario
    const savedUser = await user.save();

    // Generar token JWT
    const token = savedUser.generateAuthToken();

    // No devolver la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    // ERRORES

    // Si el error es de validación de Mongoose
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        errors: ["El nombre de usuario ya existe"],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al registrar el usuario",
      error: error.message,
    });
  }
};

// controlador de login
export const loginUserController = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // validar datos
    if (
      !userName ||
      !password ||
      userName.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Usuario y contraseña requeridos.",
      });
    }

    // buscar usuario
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Comparar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // generar token
    const token = user.generateAuthToken();

    // No devolver la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

// //obtener datos del usuario autenticado verificando su JWT
// export const getProfileController = async (req, res) => {
//   try {
//     return res.json({
//       success: true,
//       data: req.user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error al obtener el perfil.",
//       error: error.message,
//     });
//   }
// };
