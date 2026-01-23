function ReportsPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px' }}>
      <h1 style={{ 
        color: '#2563eb', 
        fontSize: '28px', 
        marginBottom: '30px',
        fontWeight: '600'
      }}>
        Reportes
      </h1>
      
      {/* Encabezado con controles principales */}
      <div style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'end',
        flexWrap: 'wrap',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>
            Buscar
          </label>
          <input
            type="search"
            placeholder="Buscar en reportes..."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>
            Filtrar por
          </label>
          <select style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white'
          }}>
            <option value="">Todas las fechas</option>
            <option value="hoy">Hoy</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mes</option>
          </select>
        </div>

        <div style={{ minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#374151' }}>
            Ordenar
          </label>
          <select style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white'
          }}>
            <option value="">Por defecto</option>
            <option value="reciente">Más reciente</option>
            <option value="monto">Mayor monto</option>
          </select>
        </div>

        <div>
          <button style={{
            padding: '14px 28px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Nuevo reporte personalizado
          </button>
        </div>
      </div>

      {/* Formulario nuevo reporte */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '24px',
        borderRadius: '12px',
        border: '2px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <h3 style={{ 
          marginBottom: '20px', 
          color: '#1e293b', 
          fontSize: '20px',
          fontWeight: '600'
        }}>
          Nuevo reporte personalizado
        </h3>
        
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Título del reporte
            </label>
            <input type="text" placeholder="Ej: Ventas del mes de enero" style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px'
            }} />
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
              Período
            </label>
            <select style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <option value="">Seleccionar período</option>
              <option value="hoy">Hoy</option>
              <option value="mes">Este mes</option>
            </select>
          </div>

          <div>
            <button style={{
              padding: '14px 32px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Generar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de resultados */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#374151' }}>
          Resultados del reporte
        </h3>
        <p style={{ color: '#6b7280' }}>
          Aquí aparecerán los resultados filtrados y ordenados.
        </p>
      </div>
    </div>
  );
}

export default ReportsPage;
