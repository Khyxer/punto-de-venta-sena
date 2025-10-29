import { useState, useEffect } from "react";
import { HeaderConfig } from "../HeaderConfig";
import { LayoutModal } from "../../general/LayoutModal";
import { NewEmployeeForm } from "./NewEmployeeForm";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { SimpleTable } from "../../general/SimpleTable";
import { Info, Loader2, Pencil, Trash2 } from "lucide-react";
import { formatText, formatDate } from "../../../utils/utilFormatFunctions";
import { BagdeRole } from "../../../UI/BagdeRole";

export const EmployeeSection = () => {
  //modales
  //modal nuevo empleado
  const [showModal, setShowModal] = useState();

  //modal confirmar eliminar
  const [showModalDelete, setShowModalDelete] = useState();

  //modal de la informacion completa del proveedor
  const [showModalCompleteInfo, setShowModalCompleteInfo] = useState();

  //buscar
  const [searchTerm, setSearchTerm] = useState();

  // id actual
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  //context
  const {
    deleteEmployee,
    loadingGetEmployee,
    employees,
    setDataNewEmployee,
    getEmployees,
  } = useConfigContext();

  useEffect(() => {
    getEmployees();
  }, []);

  // console.log(employees, "EMPLOYEES");

  // limpiar modal
  useEffect(() => {
    if (!showModal) {
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
        typeProduct: "",
        comment: "",
      });
      setCurrentEmployee(null);
      setIsEdit(false);
    }
  }, [showModal]);

  // columnas
  const columnas = [
    { key: "name", label: "Nombre" },
    { key: "userName", label: "Usuario" },
    {
      key: "role",
      label: "Rol",
      render: (valor) => <BagdeRole role={valor} />,
    },
    {
      key: "telephone",
      label: "Telefono",
    },
    {
      key: "nameCreator",
      label: "Creador",
    },
    {
      key: "createdAt",
      label: "Fecha de creación",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (valor, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentEmployee(row);
              setShowModalCompleteInfo(true);
            }}
            className="bg-green-500/20 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Info size={22} className="text-green-500" />
          </button>
          <button
            onClick={() => {
              setCurrentEmployee(row);
              setIsEdit(true);
              setShowModal(true);
            }}
            className="bg-primary-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Pencil size={19} className="text-primary-color" />
          </button>
          <button
            onClick={() => {
              setCurrentEmployee(row.id);
              setShowModalDelete(true);
            }}
            className="bg-error-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Trash2 size={19} className="text-error-color" />
          </button>
        </div>
      ),
    },
  ];

  //data
  const data = employees.map((employee) => ({
    id: employee?._id,
    name: formatText(employee?.name) + " " + formatText(employee?.lastName),
    userName: employee?.userName,
    role: employee?.role,
    telephone: employee?.telephone,
    nameCreator:
      formatText(employee?.userCreator?.name) +
      " " +
      formatText(employee?.userCreator?.lastName),
    createdAt: formatDate(employee?.createdAt),
  }));

  return (
    <section className="w-full flex flex-col h-full">
      {/* header con el buscador y el boton de nueva categoria */}
      <HeaderConfig
        placeholderInput="Buscar empleado"
        buttonText="Nuevo Empleado"
        onClickButton={() => setShowModal(true)}
        valueInput={searchTerm}
        onChangeInput={(e) => setSearchTerm(e.target.value)}
      />

      {/* modal con el formulario de nueva categoria */}
      <LayoutModal
        className="w-full !max-w-2xl"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        {/* formulario de nueva categoria */}
        <NewEmployeeForm
          onClose={() => setShowModal(false)}
          currentEmployee={currentEmployee}
          isEdit={isEdit}
        />
      </LayoutModal>

      {/** tabla */}
      <div className="w-full pt-6 flex-1">
        {loadingGetEmployee ? (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-14 h-14 animate-spin mx-auto text-primary-color" />
            <p className="text-primary-color">Cargando empleados...</p>
          </div>
        ) : (
          <SimpleTable
            columns={columnas}
            data={data}
            itemsPerPage={9}
            sortable={true}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </section>
  );
};
