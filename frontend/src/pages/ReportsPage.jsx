import React, { useState } from 'react';

function ReportsPage() {
  // 1. Estados para controlar el formulario y los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [reportData, setReportData] = useState([
    // Datos de ejemplo para que veas la tabla funcionando
    { id: 1, fecha: '2026-01-20', descripcion: 'Venta de productos electrónicos', monto: 150.00, estado: 'Completado' },
    { id: 2, fecha: '2026-01-21', descripcion: 'Servicio técnico avanzado', monto: 85.50, estado: 'Pendiente' },
  ]);

  const handleGenerateReport = () => {
    alert(`Generando reporte: ${searchTerm} con filtro: ${filterDate}`);
    // Aquí iría tu lógica de fetch al backend en el futuro
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h1 style={{ color: '#2563eb', fontSize: '28px', marginBottom: '30px', fontWeight: '600' }}>
        Módulo de Reportes
      </h1>
      
      {/* Controles Principales */}
      <div style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'end',
        flexWrap: 'wrap',
        marginBottom: '30px',
        padding: '25px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ flex: 2, minWidth: '250px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Buscar Reporte
          </label>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej: Ventas de enero..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: '180px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
            Período
          </label>
          <select 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Todas las fechas</option>
            <option value="hoy">Hoy</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
          </select>
        </div>

        <button 
          onClick={handleGenerateReport}
          style={{
            padding: '14px 28px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Generar Reporte
        </button>
      </div>

      {/* Tabla de Resultados Real */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
          <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px' }}>Resultados del reporte</h3>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                <th style={tableHeaderStyle}>Fecha</th>
                <th style={tableHeaderStyle}>Descripción</th>
                <th style={tableHeaderStyle}>Monto</th>
                <th style={tableHeaderStyle}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tableCellStyle}>{item.fecha}</td>
                  <td style={tableCellStyle}>{item.descripcion}</td>
                  <td style={tableCellStyle}>${item.monto.toFixed(2)}</td>
                  <td style={tableCellStyle}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: item.estado === 'Completado' ? '#dcfce7' : '#fef9c3',
                      color: item.estado === 'Completado' ? '#166534' : '#854d0e'
                    }}>
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {reportData.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            No se encontraron resultados para los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
}

// Estilos auxiliares para la tabla
const tableHeaderStyle = {
  padding: '16px',
  fontWeight: '600',
  color: '#475569',
  fontSize: '14px',
  borderBottom: '2px solid #e2e8f0'
};

const tableCellStyle = {
  padding: '16px',
  fontSize: '14px',
  color: '#334155'
};

export default ReportsPage;