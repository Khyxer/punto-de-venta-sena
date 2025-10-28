import { useState } from "react";
import { HeaderConfig } from "../HeaderConfig";
import { LayoutModal } from "../../general/LayoutModal";
import { NewEmployeeForm } from "./NewEmployeeForm";

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
    </section>
  );
};
