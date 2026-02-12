import { CameraIcon } from "lucide-react";
import { InputModal } from "../../../UI/UiInputs";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { useEffect } from "react";

export const NewEmployeeForm = ({ onClose, currentEmployee, isEdit }) => {
  const {
    createEmployee,
    dataNewEmployee,
    setDataNewEmployee,
    loadingEmployee,
    updateEmployee,
  } = useConfigContext();

  useEffect(() => {
    if (isEdit && currentEmployee) {
      setDataNewEmployee({
        name: currentEmployee.information.name || "",
        lastName: currentEmployee.information.lastName || "",
        profilePicture: currentEmployee.information.profilePicture || "",
        telephone: currentEmployee.information.telephone || "",
        email: currentEmployee.information.email || "",
        role: currentEmployee.information.role || "",
        userName: currentEmployee.information.userName || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isEdit, currentEmployee]);

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Guardar el archivo File (no la URL aún)
      setDataNewEmployee({
        ...dataNewEmployee,
        profilePicture: file,
      });
    }
  };

  // Obtener URL de vista previa
  const getImagePreview = () => {
    if (!dataNewEmployee?.profilePicture) return null;

    // Si es un File, crear URL temporal
    if (dataNewEmployee.profilePicture instanceof File) {
      return URL.createObjectURL(dataNewEmployee.profilePicture);
    }

    // Si es una URL string (modo edición)
    return dataNewEmployee.profilePicture;
  };

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
          <span className="text-sm">Foto de perfil</span>
          <label
            htmlFor="profilePicture"
            className="h-30 w-30 bg-gray-200 aspect-square rounded-full relative mx-auto overflow-hidden cursor-pointer block"
          >
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {getImagePreview() ? (
              <img
                src={getImagePreview()}
                alt="Perfil"
                className="aspect-square h-full w-full object-cover ring-2 ring-primary-color select-none"
                draggable={false}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-gray-400">
                <CameraIcon className="w-10 h-10" />
              </div>
            )}
          </label>
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
            type="email"
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
        {!isEdit && (
          <div className="grid grid-cols-2 gap-3">
            <InputModal
              label="Contraseña"
              name="password"
              type="password"
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
              type="password"
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
        )}
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
              updateEmployee(onClose, currentEmployee.id);
            } else {
              createEmployee(onClose);
            }
          }}
          disabled={loadingEmployee}
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          {loadingEmployee ? "Procesando..." : isEdit ? "Actualizar" : "Crear"}
        </button>
      </footer>
    </div>
  );
};
