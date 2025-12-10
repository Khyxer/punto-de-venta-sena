import { CircleCheck } from "lucide-react";
import { useVentasContext } from "../../contexts/ventas/useVentasContext";

export const ModalVentaCompleta = ({ setShowModal }) => {
  const { lastSaleCreated } = useVentasContext();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="text-center">
        <CircleCheck className="w-16 h-16 mx-auto text-primary-color" />
        <h2 className="text-2xl font-medium text-primary-color mb-2">
          Venta realizada exitosamente
        </h2>
        <p className="text-gray-600">
          Factura #{lastSaleCreated?.invoiceNumber}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-gray-600">Total a pagar:</span>
          <span className="text-xl font-semibold">
            {formatCurrency(lastSaleCreated?.total)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Monto recibido:</span>
          <span className="font-medium">
            {formatCurrency(lastSaleCreated?.amountReceived)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t-2 border-primary-color">
          <span className="text-lg font-semibold text-primary-color">
            Cambio a entregar:
          </span>
          <span className="text-2xl font-bold text-primary-color">
            {formatCurrency(lastSaleCreated?.change)}
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center">
        <p>Método de pago: {lastSaleCreated?.paymentMethod}</p>
        <p>
          {lastSaleCreated?.totalItems}{" "}
          {lastSaleCreated?.totalItems === 1 ? "artículo" : "artículos"}
        </p>
      </div>

      <footer className="flex items-center justify-center pt-4">
        <button
          onClick={() => setShowModal(false)}
          className="bg-primary-color text-light-color rounded-md px-8 py-3 cursor-pointer hover:opacity-90 duration-150 select-none font-medium"
        >
          Aceptar
        </button>
      </footer>
    </div>
  );
};
