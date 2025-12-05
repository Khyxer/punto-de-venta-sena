import { InputModal } from "../../UI/UiInputs";
import { useEffect, useState } from "react";
import { useConfigContext } from "../../contexts/config/useConfigContext";
import { formatText } from "../../utils/utilFormatFunctions";
import { useInventarioContext } from "../../contexts/inventario/useInventarioContext";

export const NewProductoForm = ({ onClose }) => {
  const [canExpired, setCanExpired] = useState(false);

  // datos para seleccionar
  const {
    categories,
    getCategories,
    subCategories,
    getSubCategories,
    suppliers,
    getSuppliers,
    measureUnits,
    getMeasureUnits,
    loadingGetCategory,
    loadingGetSubCategory,
    loadingGetSupplier,
    loadingGetMeasureUnit,
  } = useConfigContext();

  const {
    createProduct,
    updateProduct,
    loading,
    newFormDataInventory,
    setNewFormDataInventory,
  } = useInventarioContext();

  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
    if (!subCategories.length) {
      getSubCategories();
    }
    if (!suppliers.length) {
      getSuppliers();
    }
    if (!measureUnits.length) {
      getMeasureUnits();
    }
  }, []);

  useEffect(() => {
    if (canExpired) {
      setNewFormDataInventory({
        ...newFormDataInventory,
        expirationDate: "",
      });
    }
  }, [canExpired]);

  const handleSubmit = (e) => {
    // prevenir comportamiento por defecto del formulario lo antes posible
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    // log temporal para depuración
    console.log("NewProductoForm submit, isEdit:", !!(newFormDataInventory && newFormDataInventory._id));

    if (newFormDataInventory && newFormDataInventory._id) {
      return updateProduct(e, onClose, newFormDataInventory._id);
    }
    return createProduct(e, onClose);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <header>
        <h1 className="text-xl font-medium text-primary-color">
          {newFormDataInventory && newFormDataInventory._id ? "Editar Producto" : "Nuevo Producto"}
        </h1>
        <p className="text-sm text-gray-600">
          Los campos marcados con * son obligatorios
        </p>
      </header>

      {/** datos basicos */}
      <div className="flex gap-8">
        {/* <h2 className="text-lg font-medium text-primary-color">
          Datos basicos
        </h2> */}

        {/* Foto de perfil */}
        <div className="flex flex-col gap-1 justify-center items-center">
          <label htmlFor="profilePicture" className="text-sm">
            Imagen
          </label>
          <div className="h-30 w-30 bg-gray-100 border-2 border-dashed border-gray-300 aspect-square rounded-lg relative mx-auto">
            <input
              type="file"
              id="profilePicture"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* <img
              src={"NULL"}
              alt="Perfil"
              className="aspect-square h-full object-cover rounded-lg ring-2 ring-primary-color select-none"
              draggable={false}
            /> */}
          </div>
        </div>

        {/* Nombre y codigo */}
        <div className="flex flex-col gap-1 flex-1">
          <InputModal
            label="Nombre"
            name="name"
            placeholder="Ej: Leche deslactosada"
            autoFocus
            value={newFormDataInventory.name || ""}
            onChange={(e) =>
              setNewFormDataInventory({
                ...newFormDataInventory,
                name: e.target.value,
              })
            }
            required
          />
          <InputModal
            label="Código"
            placeholder="Ej: PROD-2024-001"
            name="productCode"
            value={newFormDataInventory.productCode || ""}
            onChange={(e) =>
              setNewFormDataInventory({
                ...newFormDataInventory,
                productCode: e.target.value,
              })
            }
            required
          />
        </div>
      </div>

      {/** descripcion */}
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          placeholder="Ej: Leche deslactosada, en presentacion megalitro en oferta."
          rows="2"
          className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150 resize-none"
          value={newFormDataInventory.description || ""}
          onChange={(e) =>
            setNewFormDataInventory({
              ...newFormDataInventory,
              description: e.target.value,
            })
          }
        ></textarea>
      </div>

      {/** categoria y subcategoria */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="category">
            Categoria
          </label>
          <select
            id="category"
            value={newFormDataInventory.category || ""}
            onChange={(e) =>
              setNewFormDataInventory({
                ...newFormDataInventory,
                category: e.target.value,
              })
            }
            className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
          >
            <option value="" disabled>
              {loadingGetCategory
                ? "Obteniendo categorias..."
                : "Seleccionar categoria"}
            </option>
            {categories?.map((category, index) => (
              <option key={`${category}-${index}`} value={category._id}>
                {formatText(category.name)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="subCategory">
            Subcategoria
          </label>
          <select
            id="subCategory"
            value={newFormDataInventory.subCategory || ""}
            onChange={(e) =>
              setNewFormDataInventory({
                ...newFormDataInventory,
                subCategory: e.target.value,
              })
            }
            className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
          >
            <option value="" disabled>
              {loadingGetSubCategory
                ? "Obteniendo subcategorias..."
                : "Seleccionar subcategoria"}
            </option>
            {subCategories?.map((subCategory, index) => (
              <option key={`${subCategory}-${index}`} value={subCategory._id}>
                {formatText(subCategory.name)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/** codigo de barras y proveedor */}
      <div className="grid grid-cols-2 gap-4">
        <InputModal
          label="Codigo de barras"
          placeholder="Ej: 1234567890"
          name="barcode"
          value={newFormDataInventory.barCode || ""}
          onChange={(e) =>
            setNewFormDataInventory({
              ...newFormDataInventory,
              barCode: e.target.value,
            })
          }
        />
        <div className="flex flex-col gap-1 w-full">
          <label className="text-sm" htmlFor="supplier">
            Proveedor
          </label>
          <select
            id="supplier"
            value={newFormDataInventory.supplier || ""}
            onChange={(e) =>
              setNewFormDataInventory({
                ...newFormDataInventory,
                supplier: e.target.value,
              })
            }
            className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
          >
            <option value="" disabled>
              {loadingGetSupplier
                ? "Obteniendo proveedores..."
                : "Seleccionar proveedor"}
            </option>
            {suppliers?.map((supplier, index) => (
              <option key={`${supplier}-${index}`} value={supplier._id}>
                {formatText(supplier.name)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Costo y precio */}
      <div className="grid grid-cols-2 gap-4">
        <InputModal
          label="Costo"
          name="cost"
          type="number"
          placeholder="Ej: 32000"
          value={newFormDataInventory.costPrice || ""}
          onChange={(e) =>
            setNewFormDataInventory({
              ...newFormDataInventory,
              costPrice: e.target.value,
            })
          }
          required
        />
        <InputModal
          label="Precio"
          placeholder="Ej: 35000"
          name="price"
          type="number"
          value={newFormDataInventory.sellPrice || ""}
          onChange={(e) =>
            setNewFormDataInventory({
              ...newFormDataInventory,
              sellPrice: e.target.value,
            })
          }
          required
        />
      </div>

      {/* Stock actual, minimo y unidad de medida */}
      <div className="grid grid-cols-3 gap-4">
        <InputModal
          label="Stock minimo"
          name="stockMin"
          type="number"
          placeholder="Ej: 32000"
          required
          value={newFormDataInventory.minStock || ""}
          onChange={(e) =>
            setNewFormDataInventory({
              ...newFormDataInventory,
              minStock: e.target.value,
            })
          }
        />
        <InputModal
          label="Stock actual"
          placeholder="Ej: 35000"
          name="stockActual"
          type="number"
          value={newFormDataInventory.stock || ""}
          onChange={(e) =>
            setNewFormDataInventory({
              ...newFormDataInventory,
              stock: e.target.value,
            })
          }
          required
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="unitMeasure">
            Unidad de medida <span className="text-primary-color">*</span>
          </label>
          <select
            id="unitMeasure"
            value={newFormDataInventory.measureUnit || ""}
            onChange={(e) =>
              setNewFormDataInventory({
                ...newFormDataInventory,
                measureUnit: e.target.value,
              })
            }
            className="border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2 duration-150"
          >
            <option value="" disabled>
              {loadingGetMeasureUnit
                ? "Obteniendo unidades de medida..."
                : "Seleccionar unidad de medida"}
            </option>
            {measureUnits?.map((measureUnit, index) => (
              <option key={`${measureUnit}-${index}`} value={measureUnit._id}>
                {formatText(measureUnit.name)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expiracion */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-sm flex flex-col">
            <h6 className="font-medium text-lg leading-5">
              ¿Tiene fecha de expiración?
            </h6>
            <p className="text-sm text-gray-600">
              Si el producto tiene fecha de expiración, marque la casilla
            </p>
          </label>
          <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary-color">
            <input
              className="peer sr-only"
              id="AcceptConditions"
              type="checkbox"
              onChange={(e) => setCanExpired(e.target.checked)}
            />
            <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
          </label>
        </div>
        {canExpired && (
          <InputModal
            label="Fecha de expiración"
            name="expirationDate"
            type="date"
            value={newFormDataInventory.expirationDate || ""}
            onChange={(e) =>
              setNewFormDataInventory({
                ...newFormDataInventory,
                expirationDate: e.target.value,
              })
            }
            required
          />
        )}
      </div>

      {/* Boton de crear */}
      <footer className="flex justify-between select-none">
        <button
          onClick={onClose}
          type="button"
          className="border border-gray-500 hover:border-black text-gray-600 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-default"
          disabled={loading}
        >
          {loading ? (newFormDataInventory && newFormDataInventory._id ? "Guardando..." : "Creando...") : (newFormDataInventory && newFormDataInventory._id ? "Guardar" : "Crear Producto")}
        </button>
      </footer>
    </form>
  );
};
