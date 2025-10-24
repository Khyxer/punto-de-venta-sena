import { useCategory } from "../../hooks/config/useCategory.js";

export const NewCategory = ({ onClose }) => {
  const { createCategory, dataNewCategory, setDataNewCategory, loading } =
    useCategory();
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          Nueva Categoria
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      {/* Nombre de la categoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="name">
          Nombre <span className="text-primary-color">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Lácteos"
          autoFocus
          value={dataNewCategory.name}
          onChange={(e) =>
            setDataNewCategory({ ...dataNewCategory, name: e.target.value })
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
          placeholder="Ej: Productos como leche, queso, yogurt, etc."
          rows={4}
          value={dataNewCategory.description}
          onChange={(e) =>
            setDataNewCategory({
              ...dataNewCategory,
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
          onClick={() => createCategory(onClose)}
          disabled={loading}
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
        >
          {loading ? "Cargando..." : "Crear categoria"}
        </button>
      </footer>
    </div>
  );
};
