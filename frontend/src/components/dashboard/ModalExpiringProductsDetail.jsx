import { Calendar, Box } from "lucide-react";
import { formatText } from "../../utils/utilFormatFunctions";
import { Link } from "react-router-dom";

export const ModalExpiringProductsDetail = ({
  setShowModal,
  expiringProducts,
}) => {
  // Función para calcular días restantes
  const getDaysRemaining = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Función para obtener color según días restantes
  const getExpirationColor = (days) => {
    if (days <= 7) return "text-red-600";
    if (days <= 15) return "text-orange-600";
    return "text-yellow-600";
  };

  // Función para formatear fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium text-red-500">
        Productos próximos a vencer
      </h2>

      <p className="text-gray-600">
        Los siguientes productos vencen en los próximos 30 días
      </p>

      <div className="mb-3 max-h-[550px] overflow-y-auto custom-scroll">
        {expiringProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Calendar className="w-12 h-12 mb-2" />
            <p>No hay productos próximos a vencer</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {expiringProducts.map((product) => {
              const daysRemaining = getDaysRemaining(product.expirationDate);
              const colorClass = getExpirationColor(daysRemaining);

              return (
                <li
                  key={product._id}
                  className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  {/* Imagen del producto */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    {product?.imageProduct ? (
                      <img
                        src={product.imageProduct}
                        alt={product.name}
                        className="w-full h-full object-cover"
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
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-500">
                        Codigo: {product.productCode}
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock: {product.stock}{" "}
                        {product.measureUnit?.name
                          ? formatText(product.measureUnit.name)
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* Información de expiración */}
                  <div className="flex flex-col items-end flex-shrink-0">
                    <p className={`text-sm font-bold ${colorClass}`}>
                      {daysRemaining === 0
                        ? "Vence hoy"
                        : daysRemaining === 1
                        ? "Vence mañana"
                        : `${daysRemaining} días`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(product.expirationDate)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Botones */}
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
