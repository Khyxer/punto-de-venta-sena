import { useEffect } from "react";
import { formatText } from "../../../utils/utilFormatFunctions.js";
import { useConfigContext } from "../../../contexts/config/useConfigContext";

export const NewSubCategory = ({ onClose, currentCategory, isEdit }) => {
  const {
    createSubCategory,
    updateSubCategory,
    dataNewSubCategory,
    setDataNewSubCategory,
    loadingSubCategory,
    getCategories,
    categories,
    loadingGetCategory,
  } = useConfigContext();

  useEffect(() => {
    if (isEdit && currentCategory) {
      setDataNewSubCategory({
        name: currentCategory.name || "",
        description: currentCategory.description || "",
        mainCategory: currentCategory.mainCategory?._id || "",
      });
    }
  }, [isEdit, currentCategory]);

  useEffect(() => {
    //solo obtener las categorias si no hay categorias ya guardadas
    if (!categories.length) {
      getCategories();
    }
  }, [categories.length]);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          {isEdit ? "Editar SubCategoria" : "Nueva SubCategoria"}
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      {/* categoria padre */}
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="category">
          Categoria padre <span className="text-primary-color">*</span>
        </label>
        <select
          id="category"
          autoFocus
          value={dataNewSubCategory?.mainCategory || ""}
          onChange={(e) =>
            setDataNewSubCategory({
              ...dataNewSubCategory,
              mainCategory: e.target.value,
            })
          }
          className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
        >
          <option value="" disabled>
            {loadingGetCategory
              ? "Obteniendo categorias..."
              : "Seleccionar categoria"}
          </option>
          {categories.map((category, index) => (
            <option key={`${category}-${index}`} value={category._id}>
              {formatText(category.name)}
            </option>
          ))}
        </select>
      </div>

      {/* Nombre de la categoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="name">
          Nombre <span className="text-primary-color">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Leche"
          value={dataNewSubCategory.name}
          onChange={(e) =>
            setDataNewSubCategory({
              ...dataNewSubCategory,
              name: e.target.value,
            })
          }
          className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
        />
      </div>

      {/* Descripcion de la categoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="description">
          Descripción
        </label>
        <textarea
          placeholder="Ej: De la marca Alqueria."
          rows={4}
          value={dataNewSubCategory.description}
          onChange={(e) =>
            setDataNewSubCategory({
              ...dataNewSubCategory,
              description: e.target.value,
            })
          }
          className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150 resize-none"
        ></textarea>
      </div>

      {/* Botones de cancelar y crear */}
      <footer className="flex justify-between pt-2">
        <button
          onClick={onClose}
          className="border border-gray-500 hover:border-black text-gray-600 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            if (isEdit) {
              updateSubCategory(currentCategory.id, onClose);
            } else {
              createSubCategory(onClose);
            }
          }}
          disabled={loadingSubCategory}
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          {loadingSubCategory ? "Cargando..." : isEdit ? "Actualizar" : "Crear"}
        </button>
      </footer>
    </div>
  );
};
