import { HeaderConfig } from "./HeaderConfig";
import { LayoutModal } from "../general/LayoutModal";
import { useState } from "react";
import { NewSubCategory } from "./NewSubCategoryForm";

export const SubCategorySection = () => {
  // manejar el estado de la modal
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="max-w-6xl mx-auto">
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        {/* formulario de nueva categoria */}
        <NewSubCategory onClose={() => setShowModal(false)} />
      </LayoutModal>
      {/* header con el buscador y el boton de nueva categoria */}
      <HeaderConfig
        placeholderInput="Buscar subcategoria"
        buttonText="Nueva Subcategoria"
        onClickButton={() => setShowModal(true)}
      />
    </section>
  );
};
