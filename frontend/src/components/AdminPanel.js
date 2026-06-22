import React from 'react';

const AdminPanel = ({ 
  darkMode, 
  apiErrorBackend, 
  ordenesParaAsignar, 
  empleadosDisponibles, 
  asignarDespacho, 
  usuariosActivos, 
  setUsuariosActivos, 
  mostrarMensaje, 
  API_BASE_URL, 
  email, 
  handleApiNetworkError, 
  incidencias, 
  generarPDFAuditoria, 
  performInventorySync, 
  DATABASE_LOGYTECH, // Assuming this is passed from App.js
  setBloqueado, // Assuming this is passed from App.js
  setIntentosLogin // Assuming this is passed from App.js
}) => {
  return (
    <div style={{ padding: '80px 10%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <h2 style={{ fontFamily: 'Syncopate', color: darkMode ? '#fff' : '#111', margin: 0 }}>
          CONSOLA <span style={{color:'#b8860b'}}>ADMIN</span>
        </h2>
        <div style={{ color: '#6b7280', fontWeight: '600' }}>
          <span style={{ background: '#10b981', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', marginRight: '10px' }}>
            🔒 CONEXIÓN SEGURA SSL/TLS 1.3
          </span>
          Sesión: <span style={{color: '#b8860b'}}>J. Martínez</span> | <span style={{fontSize: '0.8rem'}}>{DATABASE_LOGYTECH.versionamiento.version}</span>
        </div>
      </div>

      {apiErrorBackend && <div className="error-banner">{apiErrorBackend}</div>}

      <div className="glass-card" style={{ padding: '40px', marginBottom: '30px', background: darkMode ? '#1e293b' : '#fff' }}>
        <span className="stat-badge">CENTRO DE ASIGNACIÓN DE DESPACHOS</span>
        <div style={{ marginTop: '20px', overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: '#b8860b', fontSize: '0.7rem', fontFamily: 'Syncopate' }}>
                <th style={{ padding: '10px' }}>ID ORDEN</th>
                <th>DESTINATARIO</th>
                <th>SEDE</th>
                <th>ASIGNAR A EMPLEADO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {ordenesParaAsignar.map(orden => (
                <tr key={orden._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px 10px' }}>{orden.id_guia || orden._id.substring(0,8)}</td>
                  <td>{orden.destinatario?.nombre || 'N/A'}</td>
                  <td>{orden.sede}</td>
                  <td>
                    <select id={`emp-${orden._id}`} style={{ padding: '5px', borderRadius: '5px' }}>
                      <option value="">Seleccionar...</option>
                      {empleadosDisponibles.map(emp => <option key={emp._id} value={emp._id}>{emp.nombre}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="btn-oro" style={{ padding: '5px 10px', fontSize: '0.6rem' }} onClick={() => asignarDespacho(orden._id, document.getElementById(`emp-${orden._id}`).value)}>CONFIRMAR</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '40px', background: darkMode ? '#1e293b' : '#fff' }}>
          <span className="stat-badge">MÉTRICAS DE VENTA</span>
          <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Ventas Consolidadas</h4>
          <h2 style={{margin:0, fontSize:'2.8rem', fontWeight: '900', color: darkMode ? '#fff' : '#111'}}>$145.200.000</h2>
          <div style={{ marginTop: '20px', color: '#10b981', fontWeight: '700' }}>↑ 14.5% vs mes anterior</div>
        </div>
        
        <div className="glass-card" style={{ padding: '40px', background: darkMode ? '#1e293b' : '#fff' }}>
          <span className="stat-badge">RECURSOS HUMANOS</span>
          <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Personal en Turno</h4>
          <h2 style={{margin:0, fontSize:'2.8rem', fontWeight: '900', color: darkMode ? '#fff' : '#111'}}>{usuariosActivos}</h2>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={() => setUsuariosActivos(prev => prev + 1)} style={{padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #b8860b', background: 'none', color: '#b8860b'}}>+ Alta</button>
            <button onClick={() => setUsuariosActivos(prev => Math.max(0, prev - 1))} style={{padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ff4d4d', background: 'none', color: '#ff4d4d'}}>- Baja</button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '40px', gridColumn: 'span 2', background: darkMode ? '#1e293b' : '#fff' }}>
          <span className="stat-badge">LOGS DE ACTIVIDAD RECIENTE</span>
          <div style={{ marginTop: '20px', maxHeight: '200px', overflowY: 'auto' }}>
            {incidencias.length > 0 ? incidencias.map((log, i) => (
              <div key={log.id || i} style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
                <span style={{ color: '#b8860b', fontWeight: 'bold', minWidth: '100px' }}>{log?.fecha?.split(',')[1] || '--:--'}</span>
                <span style={{ color: darkMode ? '#cbd5e1' : '#4b5563' }}>{log?.motivo || 'Evento del sistema'}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#9ca3af' }}>{log?.usuario}</span>
              </div>
            )) : (
              <div style={{ padding: '12px 0', color: '#9ca3af' }}>Esperando conexión con MongoDB Atlas...</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            <button className="btn-oro" style={{ padding: '10px 20px', fontSize: '0.7rem' }} onClick={generarPDFAuditoria}>EXPORTAR AUDITORÍA</button>
            <button className="btn-oro" style={{ padding: '10px 20px', fontSize: '0.7rem', background: '#065f46' }} onClick={() => performInventorySync('connect')}>HANDSHAKE COMPASS</button>
          </div>
        </div> {/* End of LOGS DE ACTIVIDAD RECIENTE */}
      </div>
    </div>
  );
};

export default AdminPanel;