import {
  CreditCard,
  Box,
  TrendingUp,
  BriefcaseBusiness,
  User,
} from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";

import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { HeaderDashboardCards } from "../components/dashboard/HeaderDashboardCards";
import { formatPrice, formatText } from "../utils/utilFormatFunctions";
import { useState } from "react";
import { DashboardSkeletonLoader } from "../components/dashboard/DashboardSkeletonLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const DashboardPage = () => {
  const { data, loading } = useDashboard();

  console.log("data", data);

  const [totalDays, setTotalDays] = useState(10); // numero total de dias de la grafica
  const [inputValue, setInputValue] = useState(10); // valor temporal para el input

  // Configuración del gráfico de pie (Métodos de pago)
  const paymentMethodsData = {
    labels: data?.totalPaymentMethods?.map((pm) => pm._id),
    datasets: [
      {
        data: data?.totalPaymentMethods?.map((pm) => pm.count),
        backgroundColor: [
          "rgba(16, 185, 129, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(251, 50, 60, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // al inicio iban a ser 30 dias pero quedaba muy grande por eso ahora son 10, pero la funcion ya quedo como 30 dias porque me da pereza cambiarle el nombre
  const salesLineData = {
    labels: data?.last30Days.slice(-totalDays).map((d) => {
      // Agrega 'T12:00:00' para evitar problemas de timezone
      const date = new Date(d.date + "T12:00:00");
      return date.toLocaleDateString("es-CO", {
        month: "short",
        day: "numeric",
      });
    }),
    datasets: [
      {
        label: "Ventas",
        data: data?.last30Days.slice(-totalDays).map((d) => d.totalSales),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Configuración del gráfico de barras (Top productos)
  const topProductsData = {
    labels: data?.topProductsByP.map((p) => p.productName),
    datasets: [
      {
        label: "Ingresos",
        data: data?.topProductsByP.map((p) => p.totalRevenue),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
      },
    ],
  };

  // cambiar los dias

  const handleUpdateDays = (days) => {
    // Solo permitir números o string vacío
    if (days === "" || !isNaN(days)) {
      setInputValue(days); // Solo se actualiza el input, no el gráfico
    }
  };

  const handleBlurDays = (days) => {
    // Validar los límites solo cuando pierde el foco
    const numDays = Number(days);

    if (days === "" || numDays < 5) {
      setTotalDays(5);
      setInputValue(5);
    } else if (numDays > 30) {
      setTotalDays(30);
      setInputValue(30);
    } else {
      setTotalDays(numDays);
      setInputValue(numDays);
    }
  };

  if (loading) {
    return <DashboardSkeletonLoader />;
  }

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col gap-4">
        {/* Header con las tarjetas mas pequeñass */}
        <HeaderDashboardCards data={data} />

        {/* ============== GRÁFICOS ============== */}

        {/* Gráfico de ventas últimos días */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-blue-600" size={20} />
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <h3>Ventas de los últimos</h3>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleUpdateDays(e.target.value)}
                onBlur={(e) => handleBlurDays(e.target.value)}
                className="w-12 text-center border border-gray-200 rounded outline-none focus:outline-none focus:ring-1 focus:ring-blue-500 ring-offset-1 duration-200"
              />
              <h3>días</h3>{" "}
              <span className="text-xs text-gray-500 font-normal">
                (minimo 5, maximo 30)
              </span>
            </div>
          </div>
          <div className="h-64">
            <Line data={salesLineData} options={chartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Gráfico de métodos de pago */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-orange-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">
                Métodos de Pago
              </h3>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                <Pie data={paymentMethodsData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-green-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">
                Top Productos por Ingresos
              </h3>
            </div>
            <div className="h-64">
              <Bar data={topProductsData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/** Grid 2 */}

      <div className="grid grid-rows-2 gap-4">
        {/* Tabla de ventas por cliente */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <User className="text-purple-600" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              Top Clientes
            </h3>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[170px] h-full custom-scroll">
            {data.totalSalesByClient.map((client) => (
              <div
                key={client._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {formatText(client.client.name)}{" "}
                    {formatText(client.client.lastName)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-purple-600">
                  {formatPrice(client.totalSales)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla de ventas por empleado */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <BriefcaseBusiness className="text-primary-color" size={20} />
            <h3 className="text-lg font-semibold text-gray-800">
              Top Empleados
            </h3>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[170px] h-full custom-scroll">
            {data.totalSalesByEmployee.map((employee) => (
              <div
                key={employee._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {formatText(employee.employee.name)}{" "}
                    {formatText(employee.employee.lastName)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-primary-color">
                  {formatPrice(employee.totalSales)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
