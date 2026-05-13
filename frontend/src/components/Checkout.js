import React, { useState } from 'react';

const Checkout = ({ carrito, total, onFinalizar }) => {
    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        direccion: '',
        ciudad: ''
    });
    const [cargando, setCargando] = useState(false);

    const manejarCambio = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const enviarCompra = async (e) => {
        e.preventDefault();
        if (carrito.length === 0 || cargando) return;
        
        setCargando(true);
        // Llamamos a la lógica del padre para procesar el despacho
        await onFinalizar(datos);
        setCargando(false);
    };

    return (
        <div className="glass-card" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Syncopate', color: '#b8860b', marginBottom: '30px' }}>DETALLES DE DESPACHO</h2>
            <form onSubmit={enviarCompra}>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563' }}>RECEPTOR FINAL</label>
                <input type="text" name="nombre" placeholder="Nombre completo" onChange={manejarCambio} required />
                
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563' }}>CONTACTO CORPORATIVO</label>
                <input type="email" name="email" placeholder="Correo electrónico" onChange={manejarCambio} required />
                
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563' }}>UBICACIÓN DE ENTREGA</label>
                <input type="text" name="direccion" placeholder="Dirección de residencia" onChange={manejarCambio} required />
                <input type="text" name="ciudad" placeholder="Ciudad" onChange={manejarCambio} required />
                
                <button 
                    type="submit" 
                    className="btn-oro" 
                    disabled={carrito.length === 0 || cargando}
                    style={{ width: '100%', padding: '20px', marginTop: '20px', opacity: (carrito.length === 0 || cargando) ? 0.5 : 1 }}
                >
                    {cargando ? 'PROCESANDO...' : `CONFIRMAR PEDIDO ($${total.toLocaleString()})`}
                </button>
            </form>
        </div>
    );
};

export default Checkout;