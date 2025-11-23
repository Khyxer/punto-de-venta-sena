export const DashboardSkeletonLoader = () => {
  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col gap-4">
        {/* Header con las tarjetas mas pequeñass */}
        <header className="grid grid-cols-3 gap-4">
          {Array(3)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="rounded-lg border bg-gray-50 animate-pulse border-gray-200 shadow-sm transition-shadow duration-200 h-26"
              ></div>
            ))}
        </header>

        {/* ============== GRÁFICOS ============== */}

        {/* Gráfico de ventas últimos días */}
        <div className="rounded-lg border bg-gray-50 animate-pulse border-gray-200 shadow-sm transition-shadow duration-200 h-90"></div>

        <div className="grid grid-cols-2 gap-4 h-87.5">
          {/* Gráfico de métodos de pago */}
          {Array(2)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="rounded-lg border bg-gray-50 animate-pulse border-gray-200 shadow-sm transition-shadow duration-200"
              ></div>
            ))}
        </div>
      </div>

      {/** Grid 2 */}

      <div className="grid grid-rows-2 gap-4">
        {/* Tabla de ventas por cliente */}
        {Array(2)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="rounded-lg border bg-gray-50 animate-pulse border-gray-200 shadow-sm transition-shadow duration-200"
            ></div>
          ))}
      </div>
    </div>
  );
};
