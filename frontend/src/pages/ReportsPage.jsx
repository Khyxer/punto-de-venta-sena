import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  Plus,
  RefreshCw,
  FileText,
  Download,
  Trash2,
  TrendingUp,
  Package,
  Users,
  Wallet,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
// Usamos API_URL sin '/api' si la variable de entorno ya lo incluye, o ajustamos según tu config
// IMPORTANTE: Si tus PDFs no cargan, verifica esta URL base
const SERVER_URL = API_URL.replace("/api", "");

// Diccionario de tipos de reporte
const REPORT_TYPES = {
  sales: { label: "Ventas", icon: TrendingUp },
  inventory: { label: "Inventario", icon: Package },
  clients: { label: "Clientes", icon: Users },
  cash: { label: "Caja", icon: Wallet },
};

// Diccionario de estados
const REPORT_STATUS = {
  pending: { label: "Pendiente", icon: Clock, color: "yellow" },
  processing: { label: "Procesando", icon: AlertCircle, color: "blue" },
  completed: { label: "Completado", icon: CheckCircle, color: "green" },
  failed: { label: "Fallido", icon: XCircle, color: "red" },
};

function ReportsPage() {
  // Estados principales
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    sort: "date_desc",
    from: "",
    to: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    type: "sales",
    from: "",
    to: "",
    include: { totals: true, details: false, charts: false },
    format: "pdf",
  });

  // Función para obtener token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  // Cargar reportes del backend
  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: 1,
        limit: 50,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.type !== "all" && { type: filters.type }),
        ...(filters.from && { startDate: filters.from }),
        ...(filters.to && { endDate: filters.to }),
      });

      const res = await fetch(`${API_URL}/reports?${params}`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Error al cargar reportes");

      const data = await res.json();
      setReportData(data.data || []);
    } catch (error) {
      console.error("Error:", error);
      // Si falla, limpiar datos para no confundir
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar y cuando cambien filtros
  useEffect(() => {
    fetchReports();
  }, [searchTerm, filters.type, filters.from, filters.to]);

  // Filtrado y ordenamiento LOCAL
  const filteredReports = useMemo(() => {
    let data = [...reportData];

    // Ordenamiento
    switch (filters.sort) {
      case "date_desc":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date_asc":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title_asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return data;
  }, [reportData, filters.sort]);

  // Paginación
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const pageData = filteredReports.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  // Generar reporte
  const handleGenerateReport = async () => {
    if (!newReport.title) {
      alert("El título es requerido");
      return;
    }

    try {
      setLoading(true);

      const reportPayload = {
        title: newReport.title,
        type: newReport.type,
        startDate: newReport.from || undefined,
        endDate: newReport.to || undefined,
        include: newReport.include,
        format: newReport.format,
      };

      const res = await fetch(`${API_URL}/reports/generate`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(reportPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al generar reporte");
      }

      alert("Reporte generado exitosamente. Se procesará en segundo plano.");

      setIsModalOpen(false);
      setNewReport({
        title: "",
        type: "sales",
        from: "",
        to: "",
        include: { totals: true, details: false, charts: false },
        format: "pdf",
      });

      // Esperar un poco para dar tiempo a que se cree
      setTimeout(() => {
        fetchReports();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVA FUNCIÓN: ELIMINAR REPORTE ---
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "¿Estás seguro de eliminar este reporte y su archivo PDF?",
      )
    )
      return;

    try {
      const res = await fetch(`${API_URL}/reports/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (res.ok) {
        fetchReports(); // Recargar tabla
      } else {
        toast.error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error eliminando:", error);
      toast.error("Error de conexión al intentar eliminar");
    }
  };

  const handleNewReportSubmit = (e) => {
    e.preventDefault();
    handleGenerateReport();
  };

  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  return (
    <div className="p-5 max-w-7xl mx-auto font-sans">
      <h1 className="text-primary-color text-[28px] mb-[30px] font-semibold flex items-center gap-3">
        Módulo de Reportes
      </h1>

      {/* CONTROLES */}
      <div className="flex gap-[15px] items-end flex-wrap mb-[30px] p-[25px] bg-light-color rounded-xl border border-gray-200">
        <div className="flex-[2] min-w-[250px]">
          <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Buscar
          </label>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar reporte..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base"
          />
        </div>

        <div className="flex-1 min-w-[180px]">
          <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Tipo
          </label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base"
          >
            <option value="all">Todos</option>
            <option value="sales">Ventas</option>
            <option value="inventory">Inventario</option>
            <option value="clients">Clientes</option>
            <option value="cash">Caja</option>
          </select>
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Desde
          </label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => updateFilter("from", e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Hasta
          </label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => updateFilter("to", e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg"
          />
        </div>

        {/* --- BOTÓN ACTUALIZAR CON TEXTO --- */}
        <button
          onClick={fetchReports}
          disabled={loading}
          title="Actualizar lista"
          className="px-5 py-[14px] bg-white text-gray-700 border-2 border-gray-200 rounded-lg text-base font-semibold cursor-pointer h-[50px] flex items-center gap-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
          className="px-7 py-[14px] cursor-pointer bg-primary-color text-white border-none rounded-lg text-base font-semibold h-[50px] flex items-center gap-2 hover:bg-second-color disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          {loading ? "Cargando..." : "Nuevo Reporte"}
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 bg-light-color">
          <h3 className="m-0 text-dark-color text-lg font-semibold">
            Reportes Generados ({filteredReports.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-4 text-left font-semibold text-gray-600">
                  Título
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-600">
                  Tipo
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-600">
                  Fecha
                </th>
                <th className="px-4 py-4 text-left font-semibold text-gray-600">
                  Estado
                </th>
                <th className="px-4 py-4 text-right font-semibold text-gray-600">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">
                    {loading
                      ? "Cargando reportes..."
                      : "No hay reportes disponibles"}
                  </td>
                </tr>
              ) : (
                pageData.map((item) => (
                  <tr
                    key={item._id || item.id}
                    className="border-b border-gray-100"
                  >
                    <td className="px-4 py-4 text-dark-color font-medium">
                      {item.title}
                    </td>
                    <td className="px-4 py-4">
                      {REPORT_TYPES[item.type] ? (
                        <span className="px-[10px] py-1 bg-blue-100 text-second-color rounded-full text-xs font-medium inline-flex items-center gap-1">
                          {React.createElement(REPORT_TYPES[item.type].icon, {
                            className: "w-3 h-3",
                          })}
                          {REPORT_TYPES[item.type].label}
                        </span>
                      ) : (
                        <span className="px-[10px] py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {item.type}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-gray-700">
                      {new Date(item.createdAt).toLocaleDateString("es-CO")}
                    </td>
                    <td className="px-4 py-4">
                      {REPORT_STATUS[item.status] ? (
                        <span
                          className={`px-3 py-[6px] rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                            REPORT_STATUS[item.status].color === "green"
                              ? "bg-green-100 text-green-800"
                              : REPORT_STATUS[item.status].color === "red"
                                ? "bg-red-100 text-red-800"
                                : REPORT_STATUS[item.status].color === "blue"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {React.createElement(
                            REPORT_STATUS[item.status].icon,
                            { className: "w-3 h-3" },
                          )}
                          {REPORT_STATUS[item.status].label}
                        </span>
                      ) : (
                        <span className="px-3 py-[6px] rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                          {item.status}
                        </span>
                      )}
                    </td>

                    {/* --- COLUMNA DE ACCIONES --- */}
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        {/* Botón VER */}
                        {item.status === "completed" && item.downloadUrl && (
                          <a
                            href={`${SERVER_URL}${item.downloadUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline text-indigo-600 bg-indigo-50 px-3 py-[6px] rounded-md text-[13px] font-medium border border-indigo-200 hover:bg-indigo-100 inline-flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Ver PDF
                          </a>
                        )}

                        {/* Botón ELIMINAR */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-error-color bg-red-50 px-3 py-[6px] rounded-md text-[13px] font-medium border border-red-200 cursor-pointer hover:bg-red-100 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-xl max-w-[500px] w-full p-6">
            <div className="flex justify-between mb-5">
              <h2 className="m-0 text-xl font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nuevo Reporte
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent border-none text-2xl cursor-pointer hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleNewReportSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Título *</label>
                <input
                  type="text"
                  required
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport({ ...newReport, title: e.target.value })
                  }
                  placeholder="Ej: Ventas enero 2026"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 font-medium">Tipo</label>
                  <select
                    value={newReport.type}
                    onChange={(e) =>
                      setNewReport({ ...newReport, type: e.target.value })
                    }
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg"
                  >
                    <option value="sales">Ventas</option>
                    <option value="inventory">Inventario</option>
                    <option value="clients">Clientes</option>
                    <option value="cash">Caja</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-medium">Formato</label>
                  <select
                    value={newReport.format}
                    onChange={(e) =>
                      setNewReport({ ...newReport, format: e.target.value })
                    }
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg"
                  >
                    <option value="pdf">PDF</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block mb-2 font-medium">Desde</label>
                  <input
                    type="date"
                    value={newReport.from}
                    onChange={(e) =>
                      setNewReport({ ...newReport, from: e.target.value })
                    }
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Hasta</label>
                  <input
                    type="date"
                    value={newReport.to}
                    onChange={(e) =>
                      setNewReport({ ...newReport, to: e.target.value })
                    }
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border-2 border-gray-300 bg-white rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-500 text-white border-none rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Generar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;
