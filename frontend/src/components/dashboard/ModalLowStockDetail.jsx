import { Box } from "lucide-react";
import { formatText } from "../../utils/utilFormatFunctions";
import { Link } from "react-router-dom";

export const ModalLowStockDetail = ({ setShowModal, lowStockProducts }) => {
  console.log("LOW STOCK", lowStockProducts);
  return (
    <div className="flex flex-col gap-2">
      {/* formulario de nueva categoria */}
      <h2 className="text-xl font-medium text-red-500">Alerta de stock bajo</h2>
      <p>Los siguientes productos tienen stock bajo</p>
      <div className="mb-3 max-h-[550px] overflow-y-auto custom-scroll">
        {/* lista de productos con stock bajo */}
        <ul className="flex flex-col gap-2">
          {lowStockProducts.map((product) => (
            <li key={product._id} className="flex items-center gap-3 py-2">
              {/* Imagen del producto */}
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                {product?.imageProduct ? (
                  <img
                    src={product.imageProduct}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholderDiv = e.currentTarget.nextElementSibling;
                      if (placeholderDiv) placeholderDiv.style.display = "flex";
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
                <div className="flex items-center gap-3 ">
                  <p className="text-sm text-gray-500">{product.productCode}</p>
                  <p className="text-sm font-medium text-red-600">
                    {product.stock} {formatText(product.measureUnit.name)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* botones */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowModal(false)}
          className="bg-error-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 select-none"
        >
          Ok
        </button>
        <Link
          to="/inventario"
          onClick={() => {
            setShowModal(false);
          }}
          className="border border-gray-700 hover:border-black text-gray-700 hover:text-black rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 select-none"
        >
          Ir al inventario
        </Link>
      </div>
    </div>
  );
};
