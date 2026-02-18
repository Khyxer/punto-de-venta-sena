import { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronDown,
  Filter,
  Plus,
  Search,
  Info,
  Pencil,
  Trash2,
  BringToFront,
} from "lucide-react";
import toast from "react-hot-toast";
import { LayoutModal } from "../components/general/LayoutModal";
import { NewProductoForm } from "../components/inventario/NewProductoForm";
import { SimpleTable } from "../components/general/SimpleTable";
import { useInventarioContext } from "../contexts/inventario/useInventarioContext";
import {
  formatText,
  formatDate,
  formatPrice,
} from "../utils/utilFormatFunctions";
import { CompleteInfoProduct } from "../components/inventario/CompleteInfoProduct";

export const InventarioPage = () => {
  // Modales y estados
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtersDropdownRef = useRef(null);

  const {
    products,
    getProducts,
    setProducts,
    setNewFormDataInventory,
    resetFormData,
  } = useInventarioContext();

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
      expirationDate: p.expirationDate
        ? new Date(p.expirationDate).toISOString().slice(0, 10)
        : "",
    });
    setShowModalCreate(true);
  };

  // Cargar productos al montar (se ejecuta una sola vez cuando el usuario navega al submenu Inventario)
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showFilters) return;

    const handlePointerDown = (event) => {
      const el = filtersDropdownRef.current;
      if (!el) return;
      if (el.contains(event.target)) return;

      setShowFilters(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [showFilters]);

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
    name: formatText(p.name) || "Sin nombre",
    productCode: p.productCode || "Sin codigo",
    category: formatText(p.category?.name || "Sin categoria"),
    subCategory: formatText(p.subCategory?.name || "Sin subcategoria"),
    stock: `${p.stock} ${p.measureUnit?.name || "0"}`,
    sellPrice: formatPrice(p.sellPrice || "0"),
    expirationDate: p.expirationDate
      ? formatDate(p.expirationDate)
      : "No vence",
    information: p,
  }));

  // Extraer categorias activas únicas desde los productos
  const activeCategories = useMemo(() => {
    const map = new Map();
    (products || []).forEach((p) => {
      const cat = p.category;
      if (cat && cat._id && cat.active !== false) {
        if (!map.has(cat._id))
          map.set(cat._id, { id: cat._id, name: cat.name });
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
      (product.information?.category &&
        product.information.category._id === selectedCategory) ||
      product.category?.toLowerCase() ===
        (
          activeCategories.find((c) => c.id === selectedCategory)?.name || ""
        ).toLowerCase();

    return matchesName && matchesCategory;
  });

  // eliminar producto (llamar API)
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/inventory/product?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

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
          <p className="text-sm text-gray-600 mt-2">
            ¿Estás seguro de eliminar este producto?
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowModalDelete(false)}
              className="border border-gray-500 rounded-md px-4 py-2"
            >
              Cancelar
            </button>
            <button
              onClick={() => deleteProduct(currentProduct)}
              className="bg-error-color text-light-color rounded-md px-4 py-2"
            >
              Eliminar
            </button>
          </div>
        </div>
      </LayoutModal>

      {/** Modal info producto */}
      <LayoutModal
        className="w-full !max-w-4xl"
        show={showModalInfo}
        onClose={() => setShowModalInfo(false)}
      >
        <CompleteInfoProduct
          onClose={() => setShowModalInfo(false)}
          currentProduct={currentProduct}
        />
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
          <div ref={filtersDropdownRef} className="relative">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="rounded-md border focus:ring-2 focus:ring-primary-color focus:ring-offset-2 border-gray-500 hover:border-dark-color px-4 py-2 h-full w-fit cursor-pointer duration-150 flex items-center gap-2"
            >
              <Filter />
              Filtros
              {selectedCategory && (
                <span className="ml-2 text-sm text-gray-600">
                  {
                    activeCategories.find((c) => c.id === selectedCategory)
                      ?.name
                  }
                </span>
              )}
              <ChevronDown
                className={`${showFilters ? "rotate-180" : ""} duration-200`}
              />
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <BringToFront className="w-5 h-5 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Categoría
                    </span>
                  </div>
                  {selectedCategory && (
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setShowFilters(false);
                      }}
                      className="text-xs text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors duration-150"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Options */}
                <div className="max-h-56 overflow-y-auto p-2 space-y-0.5 custom-scroll">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      setShowFilters(false);
                    }}
                    className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150${
                      selectedCategory === ""
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-150 ${selectedCategory === "" ? "bg-blue-500" : "bg-gray-300"}`}
                    />
                    Todas
                  </button>

                  {activeCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.id);
                        setShowFilters(false);
                      }}
                      className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                        selectedCategory === c.id
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-150 ${selectedCategory === c.id ? "bg-blue-500" : "bg-gray-300"}`}
                      />
                      {c.name}
                    </button>
                  ))}

                  {activeCategories.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center py-4">
                      Sin categorías disponibles
                    </p>
                  )}
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
        <SimpleTable
          columns={columnas}
          data={filteredData}
          itemsPerPage={9}
          sortable={true}
        />
      </div>
    </section>
  );
};
