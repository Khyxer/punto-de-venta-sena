import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Filter, Plus, Search, Info, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { LayoutModal } from "../components/general/LayoutModal";
import { NewProductoForm } from "../components/inventario/NewProductoForm";
import { SimpleTable } from "../components/general/SimpleTable";
import { useInventarioContext } from "../contexts/inventario/useInventarioContext";
import { formatText, formatDate, formatPrice } from "../utils/utilFormatFunctions";

export const InventarioPage = () => {
  // Modales y estados
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { products, getProducts, setProducts, setNewFormDataInventory, resetFormData } = useInventarioContext();

  // Abrir modal en modo editar y precargar formulario
  const openEditProduct = (p) => {
    setNewFormDataInventory({
      _id: p._id,
      imageProduct: p.imageProduct || "",
      name: p.name || "",
      productCode: p.productCode || "",
      description: p.description || "",
      category: p.category?._id || "",
      subCategory: p.subCategory?._id || "",
      barCode: p.barCode || "",
      supplier: p.supplier?._id || "",
      costPrice: p.costPrice || "",
      sellPrice: p.sellPrice || "",
      stock: p.stock || "",
      minStock: p.minStock || "",
      measureUnit: p.measureUnit?._id || "",
      expirationDate: p.expirationDate ? new Date(p.expirationDate).toISOString().slice(0,10) : "",
    });
    setShowModalCreate(true);
  };

  // Cargar productos al montar (se ejecuta una sola vez cuando el usuario navega al submenu Inventario)
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Columnas de la tabla (similar a ClientesPage)
  const columnas = [
    { key: "name", label: "Nombre" },
    { key: "productCode", label: "Código" },
    { key: "category", label: "Categoria" },
    { key: "subCategory", label: "Subcategoria" },
    { key: "stock", label: "Stock" },
    { key: "sellPrice", label: "Precio" },
    { key: "expirationDate", label: "Vence" },
    {
      key: "actions",
      label: "Acciones",
      render: (valor, row) => (
        <div className="flex items-center gap-2">
          <button
          title="Información"
            onClick={() => {
              setCurrentProduct(row.information);
              setShowModalInfo(true);
            }}
            className="bg-green-500/20 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Info size={18} className="text-green-500" />
          </button>
          <button
           title="Editar"
            onClick={() => {
              setCurrentProduct(row.information);
              openEditProduct(row.information);
            }}
            className="bg-primary-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Pencil size={16} className="text-primary-color" />
          </button>
          <button
           title="Eliminar"
            onClick={() => {
              setCurrentProduct(row.id);
              setShowModalDelete(true);
            }}
            className="bg-error-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
          >
            <Trash2 size={16} className="text-error-color" />
          </button>
        </div>
      ),
    },
  ];

  // Transformar productos para la tabla
  const data = (products || []).map((p) => ({
    id: p._id,
    name: formatText(p.name),
    productCode: p.productCode,
    category: formatText(p.category?.name),
    subCategory: formatText(p.subCategory?.name),
    stock: `${p.stock} ${p.measureUnit?.name || ""}`,
    sellPrice: formatPrice(p.sellPrice),
    expirationDate: p.expirationDate ? formatDate(p.expirationDate) : "",
    information: p,
  }));

  // Extraer categorias activas únicas desde los productos
  const activeCategories = useMemo(() => {
    const map = new Map();
    (products || []).forEach((p) => {
      const cat = p.category;
      if (cat && cat._id && cat.active !== false) {
        if (!map.has(cat._id)) map.set(cat._id, { id: cat._id, name: cat.name });
      }
    });
    return Array.from(map.values());
  }, [products]);

  // Filtrar datos por nombre y por categoria (si hay una seleccionada)
  const filteredData = data.filter((product) => {
    const matchesName =
      searchTerm.trim() === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      (product.information?.category && product.information.category._id === selectedCategory) ||
      product.category?.toLowerCase() ===
        (activeCategories.find((c) => c.id === selectedCategory)?.name || "").toLowerCase();

    return matchesName && matchesCategory;
  });

  // eliminar producto (llamar API)
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/inventory/product?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error al eliminar el producto");
        return;
      }

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Error al eliminar el producto");
        return;
      }

      // actualizar lista local
      setProducts((prev) => prev.filter((item) => item._id !== id));
      setShowModalDelete(false);
      toast.success(data.message || "Producto eliminado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el producto");
    }
  };

  return (
    <section className="p-4 flex flex-col gap-6">
      {/** Modal de nuevo producto */}
      <LayoutModal
        show={showModalCreate}
        onClose={() => {
          setShowModalCreate(false);
        }}
        className="!max-w-2xl !w-full"
      >
        <NewProductoForm onClose={() => setShowModalCreate(false)} />
      </LayoutModal>

      {/** Modal confirmar eliminar */}
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        <div className="p-4">
          <h3 className="text-lg font-medium">Eliminar producto</h3>
          <p className="text-sm text-gray-600 mt-2">¿Estás seguro de eliminar este producto?</p>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => setShowModalDelete(false)} className="border border-gray-500 rounded-md px-4 py-2">Cancelar</button>
            <button onClick={() => deleteProduct(currentProduct)} className="bg-error-color text-light-color rounded-md px-4 py-2">Eliminar</button>
          </div>
        </div>
      </LayoutModal>

      {/** Modal info producto */}
      <LayoutModal
        className="w-full !max-w-2xl"
        show={showModalInfo}
        onClose={() => setShowModalInfo(false)}
      >
        <div className="p-4">
          <h3 className="text-lg font-medium">Información del producto</h3>
          {currentProduct ? (
            <div className="mt-4 space-y-2">
              {/* Imagen */}
              {(currentProduct.imageProduct || currentProduct.image) && (
                <div>
                  <strong>Imagen:</strong>
                  <div className="mt-2">
                    <img
                      src={currentProduct.imageProduct || currentProduct.image}
                      alt={currentProduct.name}
                      className="max-h-40 object-contain rounded"
                    />
                  </div>
                </div>
              )}

              <p><strong>Nombre:</strong> {currentProduct.name}</p>
              <p><strong>Código:</strong> {currentProduct.productCode}</p>
              <p><strong>Código de barras:</strong> {currentProduct.barCode || "-"}</p>
              <p><strong>Descripción:</strong> {currentProduct.description || "-"}</p>
              <p><strong>Costo:</strong> {typeof currentProduct.costPrice === 'number' ? formatPrice(currentProduct.costPrice) : (currentProduct.costPrice || "-")}</p>
              <p><strong>Precio:</strong> {formatPrice(currentProduct.sellPrice)}</p>
              <p><strong>Stock actual:</strong> {currentProduct.stock ?? "-"} {currentProduct.measureUnit?.name || ""}</p>
              <p><strong>Stock mínimo:</strong> {currentProduct.minStock ?? "-"}</p>
              <p><strong>Unidad de medida:</strong> {currentProduct.measureUnit?.name || "-"}</p>
              <p><strong>Categoria:</strong> {currentProduct.category?.name || "-"}</p>
              <p><strong>Subcategoria:</strong> {currentProduct.subCategory?.name || "-"}</p>
              <p><strong>Proveedor:</strong> {currentProduct.supplier?.name || "-"}</p>
              <p><strong>Vence:</strong> {currentProduct.expirationDate ? formatDate(currentProduct.expirationDate) : "-"}</p>
              <p><strong>Activo:</strong> {currentProduct.active ? "Sí" : "No"}</p>
              <p><strong>Eliminado:</strong> {currentProduct.deleted ? "Sí" : "No"}</p>
              <p><strong>Creado por:</strong> {currentProduct.userCreator?.name || currentProduct.userCreator || "-"}</p>
              <p><strong>Creado:</strong> {currentProduct.createdAt ? formatDate(currentProduct.createdAt) : "-"}</p>
              <p><strong>Actualizado:</strong> {currentProduct.updatedAt ? formatDate(currentProduct.updatedAt) : "-"}</p>
            </div>
          ) : (
            <p>No hay información</p>
          )}
        </div>
      </LayoutModal>

      {/** Header: Buscar y nuevo producto (igual que antes) */}
      <header className="flex items-center justify-between w-full">
        {/** buscar */}
        <div className="flex items-center gap-2 w-full max-w-2xl">
          <div className="border rounded-md border-gray-500 flex items-center pl-2 w-full focus-within:ring-2 focus-within:ring-primary-color focus-within:ring-offset-2 duration-150">
            <Search />
            <input
              type="text"
              placeholder="Buscar producto por su codigo o nombre..."
              className="focus:outline-none p-2 w-full select-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/** filtros */}
          <div className="relative">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="rounded-md border border-gray-500 hover:border-dark-color px-4 py-2 h-full w-fit cursor-pointer duration-150 flex items-center gap-2"
            >
              <Filter />
              Filtros
              <ChevronDown />
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-md z-20 p-3">
                <div className="text-sm font-medium mb-2">Filtrar por categoría</div>
                <div className="max-h-48 overflow-auto space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${selectedCategory === "" ? "font-semibold" : ""}`}
                  >
                    Todas
                  </button>
                  {activeCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.id);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${selectedCategory === c.id ? "font-semibold" : ""}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setShowFilters(false);
                    }}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/** nuevo producto */}
        <button
          onClick={() => {
            resetFormData();
            setShowModalCreate(true);
          }}
          className="flex items-center gap-2 text-nowrap bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150"
        >
          <Plus />
          Nuevo Producto
        </button>
      </header>

      {/** Tabla de inventario */}
      <div className="w-full pt-6">
        <SimpleTable columns={columnas} data={filteredData} itemsPerPage={9} sortable={true} />
      </div>
    </section>
  );
};
