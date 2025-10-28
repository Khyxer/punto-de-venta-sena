import { HeaderConfig } from "../HeaderConfig";
import { LayoutModal } from "../../general/LayoutModal";
import { useEffect, useState } from "react";
import { NewSubCategory } from "./NewSubCategoryForm";
import { useConfigContext } from "../../../contexts/config/useConfigContext";
import { SimpleTable } from "../../general/SimpleTable";
import { formatDate, formatText } from "../../../utils/utilFormatFunctions";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { DeleteModalContent } from "../../general/DeleteModalContent";

export const SubCategorySection = () => {
  // manejar el estado de la modal
  const [showModal, setShowModal] = useState(false);

  // context
  const {
    subCategories,
    getSubCategories,
    loadingGetSubCategory,
    deleteSubCategory,
    setDataNewSubCategory,
  } = useConfigContext();

  // manejar el estado de la modal de eliminar
  const [showModalDelete, setShowModalDelete] = useState(false);

  // id actual
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getSubCategories();
  }, []);

  // limpiar modal
  useEffect(() => {
    if (!showModal) {
      setDataNewSubCategory({ name: "", description: "" });
      setCurrentCategory(null);
      setIsEdit(false);
    }
  }, [showModal]);

  // buscar
  const [searchTerm, setSearchTerm] = useState("");

  // columnas
  const columnas = [
    { key: "name", label: "Nombre" },
    {
      key: "mainCategory",
      label: "Categoria padre",
      render: (valor) => <p>{formatText(valor.name)}</p>,
    },
    {
      key: "description",
      label: "Descripción",
      render: (valor) => (
        <p className="text-sm line-clamp-2 max-w-[290px] text-wrap">{valor}</p>
      ),
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
      key: "totalProducts",
      label: "Productos",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (valor, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentCategory(row);
              // console.log("ROW", row.mainCategory._id);
              setIsEdit(true);
              setShowModal(true);
            }}
            className="bg-primary-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Pencil size={19} className="text-primary-color" />
          </button>
          <button
            onClick={() => {
              setCurrentCategory(row.id);
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

  // console.log("subCategori", subCategories);

  //data
  const data = subCategories.map((subCategory) => ({
    id: subCategory?._id,
    name: formatText(subCategory?.name),
    mainCategory: subCategory?.mainCategory,
    description:
      subCategory?.description === ""
        ? "Sin descripción"
        : formatText(subCategory?.description),
    nameCreator:
      formatText(subCategory?.userCreator?.name) +
      " " +
      formatText(subCategory?.userCreator?.lastName),
    createdAt: formatDate(subCategory?.createdAt),
    totalProducts: subCategory?.totalProducts,
  }));

  return (
    <section className="w-full mx-auto h-full flex flex-col">
      {/* modal con el formulario de nueva subcategoria */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        {/* formulario de nueva categoria */}
        <NewSubCategory
          onClose={() => setShowModal(false)}
          currentCategory={currentCategory}
          isEdit={isEdit}
        />
      </LayoutModal>

      {/* modal confirmar eliminar */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        <DeleteModalContent
          title="Eliminar subcategoria"
          message="¿Estas seguro de eliminar esta subcategoria?"
          setShowModalDelete={setShowModalDelete}
          onDelete={() => deleteSubCategory(currentCategory)}
        />
      </LayoutModal>

      {/* header con el buscador y el boton de nueva categoria */}
      <HeaderConfig
        placeholderInput="Buscar subcategoria"
        buttonText="Nueva Subcategoria"
        onClickButton={() => setShowModal(true)}
        valueInput={searchTerm}
        onChangeInput={(e) => setSearchTerm(e.target.value)}
      />

      {/** tabla */}
      <div className="w-full pt-6 flex-1">
        {loadingGetSubCategory ? (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            <Loader2 className="w-14 h-14 animate-spin mx-auto text-primary-color" />
            <p className="text-primary-color">Cargando subcategorias...</p>
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
