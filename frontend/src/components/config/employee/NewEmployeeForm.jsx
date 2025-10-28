import { InputModal } from "../../../UI/UiInputs";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { useEffect } from "react";

export const NewEmployeeForm = ({ onClose, currentEmployee, isEdit }) => {
  const {
    createEmployee,
    dataNewEmployee,
    setDataNewEmployee,
    loadingEmployee,
  } = useConfigContext();

  useEffect(() => {
    if (isEdit && currentEmployee) {
      setDataNewEmployee({
        name: currentEmployee.name || "",
        lastName: currentEmployee.lastName || "",
        telephone: currentEmployee.telephone || "",
        email: currentEmployee.email || "",
        role: currentEmployee.role || "",
        userName: currentEmployee.userName || "",
        password: currentEmployee.password || "",
        confirmPassword: currentEmployee.confirmPassword || "",
      });
    }
  }, [isEdit, currentEmployee]);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          {isEdit ? "Editar Empleado" : "Nuevo Empleado"}
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium text-primary-color">
          Información personal
        </h2>

        {/* Foto de perfil */}
        <div className="flex flex-col gap-1 justify-center items-center">
          <label htmlFor="profilePicture" className="text-sm">
            Foto de perfil
          </label>
          <div className="h-30 w-30 bg-gray-200 aspect-square rounded-full relative mx-auto">
            <input
              type="file"
              id="profilePicture"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Nombre y apellido */}
        <div className="grid grid-cols-2 gap-3">
          <InputModal
            label="Nombre"
            name="name"
            autoFocus
            value={dataNewEmployee?.name || ""}
            onChange={(e) =>
              setDataNewEmployee({ ...dataNewEmployee, name: e.target.value })
            }
            required
          />
          <InputModal
            label="Apellido"
            name="lastName"
            value={dataNewEmployee?.lastName || ""}
            onChange={(e) =>
              setDataNewEmployee({
                ...dataNewEmployee,
                lastName: e.target.value,
              })
            }
            required
          />
        </div>
      </div>

      {/* Información de contacto */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium text-primary-color">
          Información de contacto
        </h2>

        {/* Telefono y correo */}
        <div className="grid grid-cols-2 gap-3">
          <InputModal
            label="Telefono"
            name="telephone"
            type="number"
            value={dataNewEmployee?.telephone || ""}
            onChange={(e) =>
              setDataNewEmployee({
                ...dataNewEmployee,
                telephone: e.target.value,
              })
            }
            required
          />
          <InputModal
            label="Correo electrónico"
            name="email"
            value={dataNewEmployee?.email || ""}
            onChange={(e) =>
              setDataNewEmployee({
                ...dataNewEmployee,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Datos de acceso */}
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium text-primary-color">
          Datos de acceso
        </h2>

        {/* Usuario y rol */}
        <div className="grid grid-cols-2 gap-3">
          <InputModal
            label="Usuario"
            name="userName"
            value={dataNewEmployee?.userName || ""}
            onChange={(e) =>
              setDataNewEmployee({
                ...dataNewEmployee,
                userName: e.target.value,
              })
            }
            required
          />

          {/** ROL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="category">
              Rol <span className="text-primary-color">*</span>
            </label>
            <select
              id="category"
              value={dataNewEmployee?.role || ""}
              onChange={(e) =>
                setDataNewEmployee({
                  ...dataNewEmployee,
                  role: e.target.value,
                })
              }
              className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
            >
              <option value="" disabled>
                Seleccionar rol
              </option>
              <option value="cashier">Cajero</option>
              <option value="employee">Empleado</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Contraseña y confirmar contraseña */}
        <div className="grid grid-cols-2 gap-3">
          <InputModal
            label="Contraseña"
            name="password"
            value={dataNewEmployee?.password || ""}
            onChange={(e) =>
              setDataNewEmployee({
                ...dataNewEmployee,
                password: e.target.value,
              })
            }
            required
          />
          <InputModal
            label="Confirmar contraseña"
            name="confirmPassword"
            value={dataNewEmployee?.confirmPassword || ""}
            onChange={(e) =>
              setDataNewEmployee({
                ...dataNewEmployee,
                confirmPassword: e.target.value,
              })
            }
            required
          />
        </div>
      </div>

      <footer className="flex justify-between">
        <button
          onClick={onClose}
          className="border border-gray-500 hover:border-black text-gray-600 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            if (isEdit) {
              updateEmployee(currentEmployee.id, onClose);
            } else {
              createEmployee(onClose);
            }
          }}
          disabled={loadingEmployee}
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </footer>
    </div>
  );
};
