import React, { useState, useEffect, useMemo } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Usamos API_URL sin '/api' si la variable de entorno ya lo incluye, o ajustamos según tu config
// IMPORTANTE: Si tus PDFs no cargan, verifica esta URL base
const SERVER_URL = API_URL.replace('/api', ''); 

function ReportsPage() {
  // Estados principales
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    sort: 'date_desc',
    from: '',
    to: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'sales',
    from: '',
    to: '',
    include: { totals: true, details: false, charts: false },
    format: 'pdf'
  });

  // Función para obtener token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
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
        ...(filters.type !== 'all' && { type: filters.type }),
        ...(filters.from && { startDate: filters.from }),
        ...(filters.to && { endDate: filters.to })
      });

      const res = await fetch(`${API_URL}/reports?${params}`, {
        headers: getAuthHeaders()
      });

      if (!res.ok) throw new Error('Error al cargar reportes');

      const data = await res.json();
      setReportData(data.data || []);
    } catch (error) {
      console.error('Error:', error);
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
      case 'date_desc':
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'date_asc':
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title_asc':
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return data;
  }, [reportData, filters.sort]);

  // Paginación
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const pageData = filteredReports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Generar reporte
  const handleGenerateReport = async () => {
    if (!newReport.title) {
      alert('⚠️ El título es requerido');
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
        format: newReport.format
      };

      const res = await fetch(`${API_URL}/reports/generate`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(reportPayload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al generar reporte');
      }

      alert('✅ Reporte generado exitosamente. Se procesará en segundo plano.');
      
      setIsModalOpen(false);
      setNewReport({
        title: '',
        type: 'sales',
        from: '',
        to: '',
        include: { totals: true, details: false, charts: false },
        format: 'pdf'
      });
      
      // Esperar un poco para dar tiempo a que se cree
      setTimeout(() => {
          fetchReports(); 
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVA FUNCIÓN: ELIMINAR REPORTE ---
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este reporte y su archivo PDF?')) return;

    try {
      const res = await fetch(`${API_URL}/reports/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (res.ok) {
        fetchReports(); // Recargar tabla
      } else {
        alert('Error al eliminar');
      }
    } catch (error) {
      console.error('Error eliminando:', error);
      alert('Error de conexión al intentar eliminar');
    }
  };

  const handleNewReportSubmit = (e) => {
    e.preventDefault();
    handleGenerateReport();
  };

  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(1);
  };

    return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h1 style={{ color: '#2563eb', fontSize: '28px', marginBottom: '30px', fontWeight: '600' }}>
        📊 Módulo de Reportes
      </h1>
      
      {/* CONTROLES */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'end', flexWrap: 'wrap', marginBottom: '30px', padding: '25px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        
        <div style={{ flex: 2, minWidth: '250px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>🔍 Buscar</label>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar reporte..."
            style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}
          />
        </div>

        <div style={{ flex: 1, minWidth: '180px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Tipo</label>
          <select value={filters.type} onChange={(e) => updateFilter('type', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px' }}>
            <option value="all">Todos</option>
            <option value="sales">Ventas</option>
            <option value="inventory">Inventario</option>
            <option value="cash">Caja</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '160px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Desde</label>
          <input type="date" value={filters.from} onChange={(e) => updateFilter('from', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px' }} />
        </div>

        <div style={{ flex: 1, minWidth: '160px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Hasta</label>
          <input type="date" value={filters.to} onChange={(e) => updateFilter('to', e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '2px solid #e5e7eb', borderRadius: '8px' }} />
        </div>

        {/* --- NUEVO BOTÓN DE ACTUALIZAR --- */}
             {/* --- BOTÓN ACTUALIZAR CON TEXTO --- */}
        <button 
            onClick={fetchReports} 
            disabled={loading}
            title="Actualizar lista"
            style={{ 
              padding: '14px 20px', 
              backgroundColor: 'white', 
              color: '#374151', 
              border: '2px solid #e5e7eb', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: '600',
              cursor: 'pointer',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
        >
            🔄 Actualizar

        </button>

        <button onClick={() => setIsModalOpen(true)} disabled={loading} style={{ padding: '14px 28px', backgroundColor: loading ? '#9ca3af' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', height: '50px' }}>
          {loading ? '⏳...' : '➕ Nuevo Reporte'}
        </button>
      </div>

    {/* TABLA */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
          <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px', fontWeight: '600' }}>
            Reportes Generados ({filteredReports.length})
          </h3>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Título</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Tipo</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Fecha</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Estado</th>
                <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#475569' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                    {loading ? '⏳ Cargando reportes...' : 'No hay reportes disponibles'}
                  </td>
                </tr>
              ) : (
                pageData.map((item) => (
                  <tr key={item._id || item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px', color: '#1e293b', fontWeight: '500' }}>{item.title}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '4px 10px', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#334155' }}>
                      {new Date(item.createdAt).toLocaleDateString('es-CO')}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', backgroundColor: item.status === 'completed' ? '#dcfce7' : '#fef9c3', color: item.status === 'completed' ? '#166534' : '#854d0e' }}>
                        {item.status === 'completed' ? 'Completado' : item.status === 'failed' ? 'Fallido' : 'Procesando'}
                      </span>
                    </td>
                    
                    {/* --- COLUMNA DE ACCIONES --- */}
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            {/* Botón VER */}
                            {item.status === 'completed' && item.downloadUrl && (
                                <a 
                                    href={`${SERVER_URL}${item.downloadUrl}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                        textDecoration: 'none', 
                                        color: '#4f46e5', 
                                        backgroundColor: '#eef2ff', 
                                        padding: '6px 12px', 
                                        borderRadius: '6px', 
                                        fontSize: '13px', 
                                        fontWeight: '500',
                                        border: '1px solid #c7d2fe'
                                    }}
                                >
                                    👁️ Ver PDF
                                </a>
                            )}

                            {/* Botón ELIMINAR */}
                            <button 
                                onClick={() => handleDelete(item._id)}
                                style={{ 
                                    color: '#dc2626', 
                                    backgroundColor: '#fef2f2', 
                                    padding: '6px 12px', 
                                    borderRadius: '6px', 
                                    fontSize: '13px', 
                                    fontWeight: '500',
                                    border: '1px solid #fecaca',
                                    cursor: 'pointer'
                                }}
                            >
                                🗑️ Eliminar
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', maxWidth: '500px', width: '100%', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>➕ Nuevo Reporte</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleNewReportSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Título *</label>
                <input
                  type="text"
                  required
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                  placeholder="Ej: Ventas enero 2026"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Tipo</label>
                  <select value={newReport.type} onChange={(e) => setNewReport({...newReport, type: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
                    <option value="sales">Ventas</option>
                    <option value="inventory">Inventario</option>
                    <option value="cash">Caja</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Formato</label>
                  <select value={newReport.format} onChange={(e) => setNewReport({...newReport, format: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px' }}>
                    <option value="pdf">PDF</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Desde</label>
                  <input type="date" value={newReport.from} onChange={(e) => setNewReport({...newReport, from: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Hasta</label>
                  <input type="date" value={newReport.to} onChange={(e) => setNewReport({...newReport, to: e.target.value})} style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 24px', border: '2px solid #d1d5db', backgroundColor: 'white', borderRadius: '8px', cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={loading} style={{ padding: '12px 24px', backgroundColor: loading ? '#9ca3af' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? '⏳ Generando...' : '✅ Generar'}
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
