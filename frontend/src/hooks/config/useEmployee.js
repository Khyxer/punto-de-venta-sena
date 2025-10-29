import { useState } from "react";
import toast from "react-hot-toast";

export const useEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);

  // enviar sin el confirmPassword
  const [dataNewEmployee, setDataNewEmployee] = useState({
    name: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    role: "",
    telephone: "",
    email: "",
    profilePicture: "",
  });

  const [employees, setEmployees] = useState([]);

  //create employee
  const createEmployee = async (onClose) => {
    console.log("employeeDataToSend");
    try {
      if (
        !dataNewEmployee.name.trim() ||
        !dataNewEmployee.lastName.trim() ||
        !dataNewEmployee.userName.trim() ||
        !dataNewEmployee.password.trim() ||
        !dataNewEmployee.confirmPassword.trim() ||
        !dataNewEmployee.role.trim() ||
        !dataNewEmployee.telephone.trim()
      ) {
        toast.error("Faltan campos obligatorios");
        return;
      }

      if (
        dataNewEmployee.password.trim() !==
        dataNewEmployee.confirmPassword.trim()
      ) {
        toast.error("Las contraseñas no coinciden");
        return;
      }

      setLoading(true);

      // enviar sin el confirmPassword
      const { confirmPassword, ...employeeDataToSend } = dataNewEmployee;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(employeeDataToSend),
        }
      );

      const data = await response.json();

      console.log(data, "DATA");

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      // limpiar el formulario
      setDataNewEmployee({
        name: "",
        lastName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        role: "",
        telephone: "",
        email: "",
        profilePicture: "",
      });

      // actualizar localmente
      const updatedEmployees = [data.data, ...employees];
      setEmployees(updatedEmployees);

      toast.success(data.message);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //get employees
  const getEmployees = async () => {
    try {
      setLoadingGet(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/accounts/employees`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingGet(false);
    }
  };

  //delete employee
  const deleteEmployee = () => {};

  //update employee
  const updateEmployee = () => {};

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    dataNewEmployee,
    setDataNewEmployee,
    loading,
    loadingGet,
    employees,
    setEmployees,
  };
};
