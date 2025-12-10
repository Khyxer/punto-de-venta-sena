import { useVentasContext } from "../../contexts/ventas/useVentasContext";
import { formatPrice } from "../../utils/utilFormatFunctions";
import { InputModal } from "../../UI/UiInputs";
import { Box } from "lucide-react";
import { LayoutModal } from "../general/LayoutModal";
import { ModalVentaCompleta } from "./ModalVentaCompleta";
import { useState } from "react";

export const ResumenVenta = () => {
  //modales
  const [showModal, setShowModal] = useState(false);

  const {
    amountReceived,
    setAmountReceived,
    handleSaveSale,
    calculateTotal,
    selectedClient,
    selectedProducts,
    loading,
  } = useVentasContext();

  console.log("selectedProducts", selectedProducts);
  return (
    <main className="h-full flex flex-col gap-4">
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <ModalVentaCompleta setShowModal={setShowModal} />
      </LayoutModal>
      <h2 className="text-xl text-primary-color">Resumen de la Venta</h2>

      <div className="rounded-lg border border-gray-200 overflow-hidden overflow-y-auto h-full max-h-120 custom-scroll">
        {selectedProducts.length > 0 ? (
          selectedProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-center gap-2 justify-between px-4 py-2 bg-white hover:bg-gray-50"
            >
              {/** Imagen del producto */}

              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                {product?.product.imageProduct ? (
                  <img
                    src={product.product.imageProduct}
                    alt={product.product.name}
                    className="w-full h-full object-cover"
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
                  {formatPrice(product?.unitPrice)} COP
                </p>
              </div>

              <p className="px-2">
                {product.quantity} {product.product.measureUnit.name}
              </p>
            </div>
          ))
        ) : (
          <div className="mt-6">
            <p className="p-4 text-center text-gray-500">
              No se han seleccionado productos
            </p>
          </div>
        )}
      </div>

      <footer className="space-y-4">
        {/* Resumen de totales */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>{formatPrice(calculateTotal().subTotal)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>IVA:</span>
            <span>{formatPrice(calculateTotal().taxIva)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Descuento:</span>
            <span className="flex items-center gap-2">
              - {formatPrice(calculateTotal().discount)}
              <span className="text-gray-400 text-sm">
                ({selectedClient?.discountPercentage}%)
              </span>
            </span>
          </div>

          <div className="flex justify-between text-lg font-semibold border-t border-gray-300 pt-2 pb-2 border-b">
            <span>Total:</span>
            <span>{formatPrice(calculateTotal().total)}</span>
          </div>
        </div>

        {/* Input de pago */}
        <InputModal
          label="Monto Recibido"
          type="number"
          value={amountReceived}
          required
          onChange={(e) => setAmountReceived(e.target.value)}
        />

        {/* Botón de realizar venta */}
        <button
          className="w-full cursor-pointer bg-primary-color text-light-color px-4 py-3 rounded-md font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleSaveSale(setShowModal)}
          disabled={loading}
        >
          {loading ? "Procesando..." : "Realizar venta"}
        </button>
      </footer>
    </main>
  );
};
