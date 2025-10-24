import { HeaderConfig } from "./HeaderConfig";
import { LayoutModal } from "../general/LayoutModal";
import { useEffect, useState } from "react";
import { NewCategory } from "./NewCategoryForm";
import { useCategory } from "../../hooks/config/useCategory";
import { SimpleTable } from "../general/SimpleTable";
import { formatDate, formatText } from "../../utils/utilFormatFunctions";
import { Pencil, Trash, Trash2 } from "lucide-react";

export const CategorySection = () => {
  // manejar el estado de la modal
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  // manejar el estado de la tabla
  const { categories, getCategories, deleteCategory } = useCategory();

  // buscar
  const [searchTerm, setSearchTerm] = useState("");

  // id actual
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    getCategories();
  }, [categories]);

  //columnas de la tabla
  const columnas = [
    { key: "name", label: "Nombre" },
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
      label: "Fecha creación",
    },

    {
      key: "totalProducts",
      label: "Total productos",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (valor, row) => (
        <div className="flex items-center gap-2">
          <button className="bg-primary-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer">
            <Pencil size={19} className="text-primary-color" />
          </button>
          <button
            onClick={() => {
              setCurrentId(row.id);
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

  //   console.log(categories);

  const data = categories.map((category) => ({
    id: category._id,
    name: formatText(category.name),
    description:
      category.description === ""
        ? "Sin descripción"
        : formatText(category.description),
    nameCreator:
      formatText(category.userCreator.name) +
      " " +
      formatText(category.userCreator.lastName),
    createdAt: formatDate(category.createdAt),
    totalProducts: category.totalProducts,
  }));

  //   console.log(data);

  return (
    <section className="w-full mx-auto max-w-6xl">
      {/* modal con el formulario de nueva categoria */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        {/* formulario de nueva categoria */}
        <NewCategory onClose={() => setShowModal(false)} />
      </LayoutModal>

      {/* header con el buscador y el boton de nueva categoria */}
      <HeaderConfig
        placeholderInput="Buscar categoria"
        buttonText="Nueva Categoria"
        onClickButton={() => setShowModal(true)}
        valueInput={searchTerm}
        onChangeInput={(e) => setSearchTerm(e.target.value)}
      />

      {/* modal confirmar eliminar */}

      <LayoutModal
        className="w-full !max-w-lg"
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        {/* formulario de nueva categoria */}
        <h2 className="text-xl font-medium text-red-500 mb-4">
          Eliminar categoria
        </h2>
        <p className="mb-3">
          ¿Estas seguro de eliminar esta categoria?{" "}
          <strong className="font-medium">
            Esta acción NO se puede deshacer
          </strong>
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowModalDelete(false)}
            className="bg-gray-200 text-gray-600 rounded-md px-4 py-2 cursor-pointer select-none"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              deleteCategory(currentId);
              setShowModalDelete(false);
            }}
            className="bg-error-color text-light-color rounded-md px-4 py-2 cursor-pointer select-none"
          >
            Eliminar
          </button>
        </div>
      </LayoutModal>

      {/* tabla de categorias */}
      <div className="w-full pt-6">
        <SimpleTable
          columns={columnas}
          data={data}
          itemsPerPage={9}
          sortable={true}
          searchTerm={searchTerm}
        />
      </div>
    </section>
  );
};
