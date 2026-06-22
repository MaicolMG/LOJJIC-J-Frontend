import React, { useState } from 'react';

/**
 * COMPONENTE DE RESPALDO PARA CHECKOUT
 * En caso de que el archivo externo no esté disponible
 */
export const CheckoutFallback = ({ carrito, total, onFinalizar }) => (
  <div className="glass-card" style={{ padding: '50px', textAlign: 'center' }}>
    <h2 style={{ fontFamily: 'Syncopate' }}>RESUMEN DE <span style={{color: '#b8860b'}}>DESPACHO</span></h2>
    <p>Total de activos: {carrito.length}</p>
    <h3 style={{ fontSize: '2rem' }}>Total: ${total.toLocaleString()}</h3>
    <button className="btn-oro" onClick={onFinalizar} style={{ padding: '20px 40px' }}>CONFIRMAR SALIDA DE BODEGA</button>
  </div>
);

/**
 * COMPONENTE CHECKOUT
 * Maneja la lógica de finalización de compra/despacho
 */
const Checkout = ({ carrito, total, onFinalizar }) => {
  const [datos, setDatos] = useState({ nombre: '', direccion: '', ciudad: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinalizar(datos);
  };

  return (
    <div className="glass-card" style={{ padding: '50px' }}>
      <h2 style={{ fontFamily: 'Syncopate', textAlign: 'center' }}>DATOS DE <span style={{color: '#b8860b'}}>ENVÍO</span></h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
        <input type="text" placeholder="Nombre Completo" required style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }} 
          onChange={e => setDatos(prev => ({...prev, nombre: e.target.value}))} />
        <input type="text" placeholder="Dirección de Entrega" required style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }} 
          onChange={e => setDatos(prev => ({...prev, direccion: e.target.value}))} />
        <input type="text" placeholder="Ciudad" required style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }} 
          onChange={e => setDatos(prev => ({...prev, ciudad: e.target.value}))} />
        <h3 style={{ textAlign: 'center' }}>Total a Pagar: ${total.toLocaleString()}</h3>
        <button type="submit" className="btn-oro" style={{ padding: '20px' }}>PROCESAR DESPACHO FINAL</button>
      </form>
    </div>
  );
};

export default Checkout;