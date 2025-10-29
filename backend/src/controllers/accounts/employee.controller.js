import User from "../../models/user.model.js";

// crear empleado es el mismo que crear usuario
// user.controller.js --> registerUserController

// obtener empleados
export const getEmployeesController = async (req, res) => {
  try {
    const employees = await User.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los empleados" });
  }
};
