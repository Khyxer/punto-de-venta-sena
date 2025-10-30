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
    const employee = await User.findByIdAndUpdate(req.query.id, {
      deleted: true,
    });
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
