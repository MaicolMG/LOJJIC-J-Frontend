import React from 'react';

const EmployeePanel = ({ 
  darkMode, 
  mostrarMensaje, 
  reportarIncidencia, 
  fetchProductosBackend, 
  generarPDFDespacho, 
  listaProductos, 
  incidencias 
}) => (
  <div style={{ padding: '80px 10%' }}>
    <h2 style={{ fontFamily: 'Syncopate', color: darkMode ? '#fff' : '#111', marginBottom: '50px' }}>
      OPERACIONES <span style={{color:'#b8860b'}}>LOGÍSTICAS</span>
    </h2>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
      <div className="glass-card" style={{ padding: '25px', textAlign: 'center', cursor: 'pointer' }} onClick={() => mostrarMensaje("SISTEMA: Escáner de radiofrecuencia activado...")}>
        <div style={{ fontSize: '2rem' }}>📡</div>
        <h4 style={{ margin: '10px 0' }}>Sincronizar Handheld</h4>
      </div>
      <div className="glass-card" style={{ padding: '25px', textAlign: 'center', cursor: 'pointer' }} onClick={reportarIncidencia}>
        <div style={{ fontSize: '2rem' }}>⚠️</div>
        <h4 style={{ margin: '10px 0' }}>Reportar Novedad</h4>
      </div>
      <div className="glass-card" style={{ padding: '25px', textAlign: 'center', cursor: 'pointer' }} onClick={() => {
        mostrarMensaje("SISTEMA: Actualizando inventario...");
        fetchProductosBackend();
      }}>
        <div style={{ fontSize: '2rem' }}>🏗️</div>
        <h4 style={{ margin: '10px 0' }}>Estado de Bodega</h4>
      </div>
    </div>

    <div className="glass-card" style={{ padding: '50px', background: darkMode ? 'rgba(255,255,255,0.05)' : '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h3 style={{ margin: 0, color: darkMode ? '#fff' : '#111', fontSize: '1.5rem' }}>Gestión de Stocks - Sede Principal</h3>
        <button 
          className="btn-oro" 
          style={{ padding: '12px 25px', fontSize: '0.8rem' }}
          onClick={() => generarPDFDespacho({id_guia: 'REPORTE-STOCK', fecha_emision: new Date().toLocaleString(), valor_declarado: 0}, listaProductos)}
        >DESCARGAR REPORTE</button>
      </div>
      {/* Table for stock management */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}> {/* Added borderCollapse */}
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '3px solid #f4f7f9', color:'#b8860b', fontSize:'0.8rem', fontFamily:'Syncopate', letterSpacing: '1px' }}>
            <th style={{ padding: '20px 15px' }}>IDENTIFICADOR</th>
            <th>PRODUCTO / ACTIVO</th>
            <th>UNIDADES EN RACK</th>
            <th>ESTADO CRÍTICO</th>
          </tr>
        </thead>
        <tbody>
          {listaProductos.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.3s' }}>
              <td style={{ padding: '25px 15px', color: '#9ca3af', fontWeight: '800' }}>#SKU-00{p.id}</td>
              <td style={{ fontWeight:'700', color: darkMode ? '#fff' : '#111' }}>{p.nombre}</td>
              <td style={{ color: darkMode ? '#cbd5e1' : '#4b5563' }}>{p.stock} Unidades Físicas</td>
              <td>
                <span style={{ color: p.stock < 10 ? '#ef4444' : '#10b981', fontWeight: '900', fontSize: '0.85rem' }}>
                  {p.stock < 10 ? '● REABASTECER URGENTE' : '● DISPONIBILIDAD OK'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table> {/* End of table */}
    </div>
  </div>
);

export default EmployeePanel;