import React from 'react';

/**
 * Componente de Notificaciones
 * Muestra el sistema de notificaciones con contador y acciones
 */
const NotificacionesBanner = ({ notificaciones, onDescargarGuia, darkMode }) => {
    const noLeidas = notificaciones.filter(n => !n.leido).length;

    return (
        <div style={{ marginBottom: '30px' }}>
            {/* Banner de notificaciones no leídas */}
            {noLeidas > 0 && (
                <div className="glass-card" style={{
                    padding: '15px 20px',
                    background: '#fef3c7',
                    border: '2px solid #f59e0b',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontWeight: 'bold', color: '#d97706' }}>
                        ⚡ {noLeidas} Notificación{noLeidas !== 1 ? 'es' : ''} nueva{noLeidas !== 1 ? 's' : ''}
                    </span>
                </div>
            )}

            {/* Lista de notificaciones */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notificaciones.slice(0, 10).map((notif) => (
                    <div
                        key={notif._id}
                        className="glass-card"
                        style={{
                            padding: '15px',
                            background: notif.leido 
                                ? (darkMode ? '#374151' : '#f3f4f6') 
                                : (darkMode ? '#1f2937' : '#fff'),
                            borderLeft: `4px solid ${
                                notif.tipo === 'NUEVA_ORDEN' ? '#b8860b' :
                                notif.tipo === 'ORDEN_ASIGNADA' ? '#10b981' :
                                notif.tipo === 'PDF_DESCARGADO' ? '#3b82f6' :
                                '#8b5cf6'
                            }`,
                            opacity: notif.leido ? 0.7 : 1
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#b8860b' }}>
                                    {notif.titulo}
                                </h4>
                                <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: darkMode ? '#cbd5e1' : '#4b5563' }}>
                                    {notif.mensaje}
                                </p>
                                <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                                    {new Date(notif.createdAt).toLocaleTimeString('es-CO')}
                                </span>
                            </div>
                            {notif.tipo === 'NUEVA_ORDEN' && (
                                <button
                                    onClick={() => onDescargarGuia(notif.ordenId)}
                                    style={{
                                        padding: '5px 10px',
                                        marginLeft: '10px',
                                        background: '#b8860b',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    📥 Descargar Guía
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificacionesBanner;
