export const NewSubCategory = ({ onClose }) => {
  const categoriesSimular = [
    "Lacteos",
    "Verde",
    "Frutas",
    "Carnes",
    "Bebidas",
    "Panaderia",
    "Pasteleria",
    "Bebidas",
    "Snacks",
    "Pasteles",
    "Deposito",
    "Deportes",
    "Animales",
  ];
  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          Nueva Subcategoria
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      {/* Categoria padre */}
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="category">
          Categoria padre <span className="text-primary-color">*</span>
        </label>
        <select
          id="category"
          defaultValue=""
          autoFocus
          className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
        >
          <option value="" disabled>
            Seleccionar categoria
          </option>
          {categoriesSimular.map((category, index) => (
            <option key={`${category}-${index}`} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Nombre de la subcategoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="name">
          Nombre <span className="text-primary-color">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Lácteos"
          className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
        />
      </div>

      {/* Descripcion de la subcategoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm" htmlFor="description">
          Descripción
        </label>
        <textarea
          placeholder="Ej: Productos como leche, queso, yogurt, etc."
          rows={4}
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
        <button className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default">
          Crear
        </button>
      </footer>
    </div>
  );
};
