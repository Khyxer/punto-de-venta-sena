import {
  Box,
  CircleMinus,
  CirclePlus,
  RefreshCcw,
  Trash2,
  X,
} from "lucide-react";
import { formatPrice } from "../../utils/utilFormatFunctions";
import { useVentasContext } from "../../contexts/ventas/useVentasContext";
import toast from "react-hot-toast";

export const ViewProducts = () => {
  const { selectedProducts, setSelectedProducts } = useVentasContext();

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(
      selectedProducts.filter((p) => p.product._id !== productId)
    );
  };

  const handleAddQuantity = (productId) => {
    const product = selectedProducts.find((p) => p.product._id === productId);
    if (product.quantity >= product.product.stock) {
      toast.error("No hay stock disponible");
      return;
    }
    setSelectedProducts(
      selectedProducts.map((p) => {
        if (p.product._id === productId) {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        }
        return p;
      })
    );

    console.log("selectedProducts", selectedProducts);
  };

  const handleSubtractQuantity = (productId) => {
    setSelectedProducts(
      selectedProducts.map((p) => {
        if (p.product._id === productId) {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <div>
      {selectedProducts.length > 0 ? (
        <div className="border-b border-gray-300 pb-5">
          <header className="flex items-center justify-between mb-3">
            <h3 className="text-lg text-primary-color">
              Productos Seleccionados ({selectedProducts.length})
            </h3>
            {/* <button
              onClick={() => setSelectedProducts([])}
              className="bg-error-color/10 hover:bg-error-color/20 duration-150 text-light-color rounded-md w-7 aspect-square flex items-center justify-center cursor-pointer"
            >
              <Trash2 className="text-error-color" size={18} />
            </button> */}
            <button
              onClick={() => setSelectedProducts([])}
              className="bg-primary-color/10 hover:bg-primary-color/20 duration-150 text-primary-color w-7.5 aspect-square flex items-center justify-center cursor-pointer rounded-md group"
            >
              <RefreshCcw
                size={20}
                className="group-hover:-rotate-180 duration-300"
              />
            </button>
          </header>
          <div className="rounded-lg border border-gray-200 overflow-hidden max-h-70 overflow-y-auto custom-scroll">
            {selectedProducts.map((product) => (
              <div
                key={product.product._id}
                className="flex items-center gap-2 justify-between px-4 py-2 bg-white hover:bg-gray-50"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden">
                  {product?.product.imageProduct ? (
                    <img
                      src={product.product.imageProduct}
                      alt={product.product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      display: product?.product.imageProduct ? "none" : "flex",
                    }}
                    className="h-full w-full border border-primary-color/60 aspect-square flex items-center justify-center bg-primary-color/10 rounded-md"
                  >
                    <Box className="text-primary-color/60" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {product.productName}{" "}
                    <span className="text-xs text-gray-500">
                      ({product?.productCode})
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(product?.unitPrice)} COP • Stock:{" "}
                    {product?.product?.stock}{" "}
                    {product?.product?.measureUnit?.name}
                  </p>
                </div>

                {/* acciones */}
                <footer className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {product.quantity > 1 ? (
                      <button
                        onClick={() =>
                          handleSubtractQuantity(product.product._id)
                        }
                        className="bg-yellow-500/10 hover:bg-yellow-500/20 duration-150 text-light-color rounded-md w-7 aspect-square flex items-center justify-center cursor-pointer"
                      >
                        <CircleMinus className="text-yellow-500" size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemoveProduct(product.product._id)}
                        className="bg-error-color/10 hover:bg-error-color/20 duration-150 text-light-color rounded-md w-7 aspect-square flex items-center justify-center cursor-pointer"
                      >
                        <X className="text-error-color" size={18} />
                      </button>
                    )}

                    <p className="px-2">{product.quantity}</p>
                    <button
                      onClick={() => handleAddQuantity(product.product._id)}
                      className="bg-green-500/10 hover:bg-green-500/20 duration-150 text-light-color rounded-md w-7 aspect-square flex items-center justify-center cursor-pointer"
                    >
                      <CirclePlus className="text-green-500" size={18} />
                    </button>
                  </div>
                </footer>
              </div>
            ))}
          </div>

          {/* <div className="mt-4 px-4 py-2 bg-primary-color/5 border border-primary-color/20 duration-150 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total (Sin impuestos):</span>
              <span className="text-lg font-semibold text-primary-color">
                {formatPrice(
                  selectedProducts.reduce((sum, p) => sum + p.sellPrice, 0)
                )}{" "}
                COP
              </span>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="mt-6">
          <p className="p-4 text-center text-gray-500">
            No se han seleccionado productos
          </p>
        </div>
      )}
    </div>
  );
};
