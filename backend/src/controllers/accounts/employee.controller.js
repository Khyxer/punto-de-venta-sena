import User from "../../models/user.model.js";

// crear empleado es el mismo que crear usuario
// user.controller.js --> registerUserController

// buscar empleados
export const getEmployeesController = async (req, res) => {
  try {
    const employees = await User.find({ deleted: false })
      .populate("userCreator")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Empleados obtenidos exitosamente",
      data: employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener los empleados",
      error: error.message,
    });
  }
};

// eliminar empleado
export const deleteEmployeeController = async (req, res) => {
  try {
    const employee = await User.findByIdAndUpdate(
      req.query.id,
      {
        deleted: true,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Empleado eliminado exitosamente",
      data: employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el empleado",
      error: error.message,
    });
  }
};

// actualizar empleado
export const updateEmployeeController = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.query.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    const employee = await User.findById(req.query.id).populate("userCreator");
    return res.status(200).json({
      success: true,
      message: "Empleado actualizado exitosamente",
      data: employee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el empleado",
      error: error.message,
    });
  }
};

// cambiar contraseña
export const changePasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const { id } = req.query;

    if (!password || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "La contraseña es requerida",
      });
    }

    const employee = await User.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    employee.password = password;
    await employee.save({
      new: true,
    });

    const employeeResponse = employee.toObject();
    delete employeeResponse.password;

    return res.status(200).json({
      success: true,
      message: "Contraseña cambiada exitosamente",
      data: employeeResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al cambiar la contraseña",
      error: error.message,
    });
  }
};
