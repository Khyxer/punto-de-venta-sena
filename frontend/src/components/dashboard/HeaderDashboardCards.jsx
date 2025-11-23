import { formatPrice } from "../../utils/utilFormatFunctions";
import { ArrowRight, AlertTriangle, Calendar, Clock } from "lucide-react";
import { LayoutModal } from "../general/LayoutModal";
import { ModalLowStockDetail } from "./ModalLowStockDetail";
import { useState } from "react";

export const HeaderDashboardCards = ({ data }) => {
  const [showModalLowStock, setShowModalLowStock] = useState(false);

  // console.log("HEADER", data);

  return (
    <header className="grid grid-cols-3 gap-4">
      <LayoutModal
        className="w-full !max-w-lg"
        show={showModalLowStock}
        onClose={() => setShowModalLowStock(false)}
      >
        <ModalLowStockDetail
          setShowModal={setShowModalLowStock}
          lowStockProducts={data.productLowStock}
        />
      </LayoutModal>

      {/* Ventas del dia */}

      <div className="rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-green-50">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 rounded-lg bg-green-100 text-green-700">
            <Clock />
          </span>
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wide">
            Ventas del dia
          </h2>
        </div>

        <p className="text-2xl font-semibold text-gray-900">
          {!data?.totalSalesToday?.[0]?.totalAmount
            ? 0
            : formatPrice(data?.totalSalesToday?.[0]?.totalAmount)}
        </p>
      </div>

      {/* Ventas del mes */}
      <div className="rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-primary-color/5">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 rounded-lg bg-primary-color/10 text-primary-color">
            <Calendar />
          </span>
          <h2 className="text-sm font-semibold text-primary-color uppercase tracking-wide">
            Ventas del mes
          </h2>
        </div>

        <p className="text-2xl font-semibold text-gray-900">
          {!data?.totalSalesMonth?.[0]?.totalAmount
            ? 0
            : formatPrice(data?.totalSalesMonth?.[0]?.totalAmount)}
        </p>
      </div>

      {/* Bajo stock */}
      {/* Ventas del mes */}
      <div className="rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-yellow-50">
        <div className="flex items-center gap-3 mb-2">
          <span className="p-2 rounded-lg bg-yellow-100 text-yellow-700">
            <AlertTriangle />
          </span>
          <h2 className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">
            Productos bajo stock
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-gray-900">
            {data?.productLowStock?.length}
          </p>

          <button
            onClick={() => setShowModalLowStock(true)}
            className="cursor-pointer flex items-center gap-1 text-sm hover:bg-yellow-100 px-2 py-1 rounded duration-200 select-none"
          >
            Ver detalles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
