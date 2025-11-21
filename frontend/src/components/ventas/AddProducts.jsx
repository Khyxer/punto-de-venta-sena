import { Box, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useInventarioContext } from "../../contexts/inventario/useInventarioContext";
import { formatPrice } from "../../utils/utilFormatFunctions";
import { useVentasContext } from "../../contexts/ventas/useVentasContext";

export const AddProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const { selectedProducts, setSelectedProducts } = useVentasContext();

  //traer los productos de la base de datos
  const { products, getProducts } = useInventarioContext();

  useEffect(() => {
    getProducts();
  }, []);

  console.log("products", products);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = products?.filter(
    (product) =>
      product?.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.barCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product) => {
    const nuevoProductoForm = {
      product: product,
      productName: product?.name,
      productCode: product?.productCode,
      quantity: 1,
      unitPrice: product?.sellPrice,
    };

    // console.log("nuevoProductoForm", nuevoProductoForm);

    if (!selectedProducts.find((p) => p.product._id === product?._id)) {
      setSelectedProducts([...selectedProducts, nuevoProductoForm]);
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(e.target.value.trim().length > 0);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl text-primary-color">Agregar Productos</h2>

      {/* Buscador */}
      <div className="relative" ref={containerRef}>
        <div className="border rounded-md  border-gray-500 flex items-center pl-2 w-full focus-within:ring-2 focus-within:ring-primary-color focus-within:ring-offset-2 duration-150">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar producto por codigo o nombre..."
            className="focus:outline-none p-2 w-full select-none"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.trim() && setIsOpen(true)}
          />
        </div>

        {/* Dropdown de resultados */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-sm max-h-64 overflow-y-auto custom-scroll">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => {
                const isAdded = selectedProducts.find(
                  (p) => p.product._id === product?._id
                );
                return (
                  <div
                    key={product?._id}
                    onClick={() => !isAdded && handleAddProduct(product)}
                    className={`flex items-center justify-between p-3 hover:bg-gray-50  border-b border-gray-100 last:border-b-0 transition-colors ${
                      isAdded
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-md overflow-hidden mr-2">
                      {product?.imageProduct ? (
                        <img
                          src={product.imageProduct}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        style={{
                          display: product?.imageProduct ? "none" : "flex",
                        }}
                        className="h-full w-full border border-primary-color/60 aspect-square flex items-center justify-center bg-primary-color/10 rounded-md"
                      >
                        <Box className="text-primary-color/60" />
                      </div>
                    </div>


                    <div className="flex-1">
                      {product?.name}{" "}
                      <span className="text-xs text-gray-500">
                        ({product?.productCode})
                      </span>
                      <p className="text-sm text-gray-500">
                        Stock: {product?.stock} {product?.measureUnit?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">
                        {formatPrice(product?.sellPrice)}
                      </p>
                      {isAdded && (
                        <p className="text-xs text-green-600">✓ Agregado</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-500">
                No se encontraron productos
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
