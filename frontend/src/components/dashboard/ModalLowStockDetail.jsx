import { Box, Calendar, TrendingUpDown } from "lucide-react";
import { formatText } from "../../utils/utilFormatFunctions";
import { Link } from "react-router-dom";

export const ModalLowStockDetail = ({ setShowModal, lowStockProducts }) => {
  // console.log("LOW STOCK", lowStockProducts);
  return (
    <div className="flex flex-col gap-2">
      {/* formulario de nueva categoria */}
      <h2 className="text-xl font-medium text-red-500">Alerta de stock bajo</h2>
      <p className="text-gray-600">
        Los siguientes productos vencen en los próximos 30 días
      </p>
      <div className="mb-3 max-h-[550px] overflow-y-auto custom-scroll">
        {lowStockProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <TrendingUpDown className="w-12 h-12 mb-2" />
            <p>No hay productos con bajo stock</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {lowStockProducts.map((product) => (
              <li key={product._id} className="flex items-center gap-3 py-2">
                {/* Imagen del producto */}
                <div className="flex-shrink-0 w-12 h-12  rounded-lg overflow-hidden">
                  {product?.imageProduct ? (
                    <img
                      src={product.imageProduct}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const placeholderDiv =
                          e.currentTarget.nextElementSibling;
                        if (placeholderDiv)
                          placeholderDiv.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      display: product?.imageProduct ? "none" : "flex",
                    }}
                    className="h-full w-full border border-primary-color/60 flex items-center justify-center bg-primary-color/10 rounded-lg"
                  >
                    <Box className="text-primary-color/60 w-5 h-5" />
                  </div>
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <div className="flex items-center justify-between pr-3">
                    <p className="text-sm text-gray-500">
                      Codigo: {product.productCode}
                    </p>
                    <p className="text-sm font-medium text-red-600">
                      <span className="text-gray-500 font-normal">Stock: </span>
                      {product.stock} {formatText(product.measureUnit.name)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* botones */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-600 hover:bg-gray-700 text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 select-none"
        >
          Cerrar
        </button>
        <Link
          to="/inventario"
          onClick={() => {
            setShowModal(false);
          }}
          className="bg-primary-color hover:bg-primary-color/90 text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 select-none"
        >
          Ir al inventario
        </Link>
      </div>
    </div>
  );
};
