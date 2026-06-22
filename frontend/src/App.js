    import React, { useState, useEffect, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { authService, productService, ordenService } from './services/api';

// ─── COMPONENTE CHECKOUT — Diseño premium con colores del tema ───────────────
const Checkout = ({ carrito, total, onFinalizar }) => {
  const [datos, setDatos] = useState({ nombre: '', email: '', direccion: '', ciudad: '', telefono: '' });
  const [paso, setPaso] = useState(1); // 1=datos, 2=resumen
  const handleSubmit = (e) => { e.preventDefault(); setPaso(2); };
  const confirmar = () => onFinalizar(datos);

  const inputStyle = {
    padding:'14px 18px', borderRadius:'12px',
    border:'2px solid var(--input-border)',
    background:'var(--input-bg)', color:'var(--input-color)',
    fontSize:'1rem', fontFamily:'Space Grotesk, Outfit, sans-serif',
    width:'100%', transition:'all 0.3s ease'
  };

  return (
    <div className="glass-card fade-in" style={{ padding:'50px', maxWidth:'520px', margin:'0 auto' }}>
      {/* Indicador de pasos */}
      <div style={{ display:'flex', justifyContent:'center', gap:'10px', marginBottom:'35px' }}>
        {[1,2].map(n => (
          <div key={n} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{
              width:'32px', height:'32px', borderRadius:'50%',
              background: n <= paso ? 'linear-gradient(135deg,#00e676,#00bfa5)' : 'var(--bg-card)',
              border: n <= paso ? 'none' : '2px solid var(--input-border)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color: n <= paso ? '#002a14' : 'var(--text-muted)',
              fontWeight:'900', fontSize:'0.85rem',
              transition:'all 0.4s ease',
              boxShadow: n <= paso ? '0 0 15px rgba(0,230,118,0.4)' : 'none'
            }}>{n <= paso ? (n < paso ? '✓' : n) : n}</div>
            <span style={{ fontSize:'0.7rem', fontWeight:'700', color:'var(--text-muted)', fontFamily:'Syncopate', letterSpacing:'1px' }}>
              {n === 1 ? 'DATOS' : 'CONFIRMAR'}
            </span>
            {n < 2 && <div style={{ width:'40px', height:'2px', background: paso >= 2 ? 'linear-gradient(90deg,#00e676,#00bfa5)' : 'var(--input-border)', borderRadius:'2px', transition:'all 0.4s ease' }} />}
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily:'Syncopate', textAlign:'center', color:'var(--text-h)', marginBottom:'30px' }}>
        {paso === 1 ? <>DATOS DE <span style={{color:'#00c070'}}>ENVÍO</span></> : <>CONFIRMAR <span style={{color:'#00c070'}}>DESPACHO</span></>}
      </h2>

      {paso === 1 ? (
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
          <div>
            <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'var(--text-muted)', letterSpacing:'1px', fontFamily:'Syncopate', display:'block', marginBottom:'6px' }}>NOMBRE COMPLETO</label>
            <input type="text" placeholder="Juan Pérez" required style={inputStyle}
              onChange={e => setDatos(prev => ({...prev, nombre: e.target.value}))} />
          </div>
          <div>
            <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'var(--text-muted)', letterSpacing:'1px', fontFamily:'Syncopate', display:'block', marginBottom:'6px' }}>CORREO ELECTRÓNICO</label>
            <input type="email" placeholder="correo@ejemplo.com" required style={inputStyle}
              onChange={e => setDatos(prev => ({...prev, email: e.target.value}))} />
          </div>
          <div>
            <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'var(--text-muted)', letterSpacing:'1px', fontFamily:'Syncopate', display:'block', marginBottom:'6px' }}>TELÉFONO</label>
            <input type="tel" placeholder="300 123 4567" required style={inputStyle}
              onChange={e => setDatos(prev => ({...prev, telefono: e.target.value}))} />
          </div>
          <div>
            <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'var(--text-muted)', letterSpacing:'1px', fontFamily:'Syncopate', display:'block', marginBottom:'6px' }}>DIRECCIÓN DE ENTREGA</label>
            <input type="text" placeholder="Calle 123 # 45-67, Apto 8" required style={inputStyle}
              onChange={e => setDatos(prev => ({...prev, direccion: e.target.value}))} />
          </div>
          <div>
            <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'var(--text-muted)', letterSpacing:'1px', fontFamily:'Syncopate', display:'block', marginBottom:'6px' }}>CIUDAD</label>
            <input type="text" placeholder="Bogotá, Chía, Zipaquirá..." required style={inputStyle}
              onChange={e => setDatos(prev => ({...prev, ciudad: e.target.value}))} />
          </div>
          <div style={{ marginTop:'10px', padding:'16px', background:'rgba(0,230,118,0.06)', borderRadius:'12px', border:'1px solid rgba(0,200,120,0.2)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.85rem', color:'var(--text-muted)', marginBottom:'8px' }}>
              <span>Activos en bolsa:</span><span style={{ fontWeight:'800' }}>{carrito.length}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'1.2rem', color:'var(--text-h)', fontWeight:'900' }}>
              <span>TOTAL:</span><span style={{ color:'#00c070' }}>${total.toLocaleString()}</span>
            </div>
          </div>
          <button type="submit" className="btn-oro" style={{ padding:'18px', marginTop:'8px', fontSize:'0.9rem' }}>
            CONTINUAR → CONFIRMAR
          </button>
        </form>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {/* Resumen de datos */}
          <div style={{ padding:'20px', background:'rgba(0,230,118,0.06)', borderRadius:'14px', border:'1px solid rgba(0,200,120,0.2)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', fontSize:'0.85rem' }}>
              {[['NOMBRE', datos.nombre],['EMAIL', datos.email],['TELÉFONO', datos.telefono],['CIUDAD', datos.ciudad]].map(([k,v]) => (
                <div key={k}>
                  <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', fontWeight:'800', fontFamily:'Syncopate', letterSpacing:'1px', marginBottom:'3px' }}>{k}</div>
                  <div style={{ color:'var(--text-h)', fontWeight:'700' }}>{v || '—'}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:'12px', paddingTop:'12px', borderTop:'1px solid rgba(0,200,120,0.2)', fontSize:'0.85rem', color:'var(--text-muted)' }}>
              <strong>Dirección:</strong> {datos.direccion}
            </div>
          </div>
          {/* Lista de productos */}
          <div style={{ maxHeight:'160px', overflowY:'auto', padding:'4px' }}>
            {carrito.map((item, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid rgba(0,200,120,0.1)', fontSize:'0.85rem' }}>
                <span style={{ color:'var(--text-body)' }}>{item.nombre}</span>
                <span style={{ color:'#00c070', fontWeight:'800' }}>${item.precio.toLocaleString()}</span>
              </div>
            ))}
          </div>
          {/* Total */}
          <div style={{ display:'flex', justifyContent:'space-between', padding:'16px', background:'linear-gradient(135deg,rgba(0,230,118,0.12),rgba(0,191,165,0.08))', borderRadius:'12px', fontSize:'1.3rem', fontWeight:'900' }}>
            <span style={{ color:'var(--text-h)' }}>VALOR TOTAL:</span>
            <span style={{ color:'#00c070', textShadow:'0 0 20px rgba(0,230,118,0.4)' }}>${total.toLocaleString()}</span>
          </div>
          <div style={{ display:'flex', gap:'12px' }}>
            <button onClick={() => setPaso(1)} style={{ flex:1, padding:'14px', borderRadius:'10px', border:'2px solid rgba(0,200,120,0.3)', background:'none', color:'var(--text-h)', cursor:'pointer', fontFamily:'Syncopate', fontSize:'0.7rem', fontWeight:'700' }}>
              ← VOLVER
            </button>
            <button onClick={confirmar} className="btn-oro" style={{ flex:2, padding:'14px', fontSize:'0.85rem' }}>
              ✅ CONFIRMAR DESPACHO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── DATOS ESTÁTICOS DE REFERENCIA ───────────────────────────────────────────
const DATABASE_LOGYTECH = {
  sedes: [
    { id:'S1', nombre:'Logytech Fontanar - Chía', capacidad:'80%', responsable:'J. Martínez' },
    { id:'S2', nombre:'SENA Centro Agropecuario - Chiquinquirá', capacidad:'45%', responsable:'Admin_ADSO' },
    { id:'S3', nombre:'Bodega Alterna Zipaquirá', capacidad:'20%', responsable:'Auxiliar_Log' }
  ],
  versionamiento: { version:'2.4.0-STABLE', build:'2026.05.25', entorno:'Development - ADSO', tecnologias:['React.js','Node.js','Express','MongoDB'] }
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
function App() {
  // ── Navegación y UI ──
  const [vista, setVista] = useState('inicio');
  const [loadingWidth, setLoadingWidth] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [mensajeActivo, setMensajeActivo] = useState('');

  // ── Autenticación ──
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [esperandoMFA, setEsperandoMFA] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombreRegistro, setNombreRegistro] = useState('');
  const [intentosLogin, setIntentosLogin] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [tiempoSesion, setTiempoSesion] = useState(1800);

  // ── Catálogo y carrito ──
  const [listaProductos, setListaProductos] = useState([]);
  const [catalogoProductos, setCatalogoProductos] = useState(null);
  const [stockProductos, setStockProductos] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCat, setFiltroCat] = useState('Todos');
  const [filtroPrecioMax, setFiltroPrecioMax] = useState('');
  const [ordenPrecio, setOrdenPrecio] = useState('');
  const [vistaGrid, setVistaGrid] = useState(true);
  const [favoritos, setFavoritos] = useState([]);
  const [calificaciones, setCalificaciones] = useState({});
  const [visitas, setVisitas] = useState({});
  const [cantidades, setCantidades] = useState({});
  const [comparar, setComparar] = useState([]);
  const [productoZoom, setProductoZoom] = useState(null);
  const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [usuariosSistema, setUsuariosSistema] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);

  // ── Órdenes y logística ──
  const [ordenesAdmin, setOrdenesAdmin] = useState([]);
  const [nuevasOrdenes, setNuevasOrdenes] = useState(0);
  const [mostrarConfirmDespacho, setMostrarConfirmDespacho] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(null);
  const [ordenFiltro, setOrdenFiltro] = useState('todos');
  const [busquedaOrden, setBusquedaOrden] = useState('');
  const [estadoOrdenes, setEstadoOrdenes] = useState({});
  // ── Notificaciones (NUEVO) ──
  const [notificaciones, setNotificaciones] = useState([]);
  const [contadorNoLeidas, setContadorNoLeidas] = useState(0);


  // Estados para firma digital y traslados (funciones de Gemini — mantener para el JSX)
  const [trasladosInterSedes, setTrasladosInterSedes] = useState([]);
  const [ordenParaFirmar, setOrdenParaFirmar] = useState(null);
  const [firmaDibujada, setFirmaDibujada] = useState(false);
  // ── Panel empleado ──
  const [incidencias, setIncidencias] = useState([]);
  const [usuariosActivos, setUsuariosActivos] = useState(8);
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  const [solicitudesReabastecimiento, setSolicitudesReabastecimiento] = useState([]);
  const [tiempoTurno, setTiempoTurno] = useState(0);
  const [notasTurno, setNotasTurno] = useState('');
  const [checklistItems, setChecklistItems] = useState([
    { id:1, label:'¿Producto empacado correctamente?', checked:false },
    { id:2, label:'¿Etiqueta de despacho impresa?', checked:false },
    { id:3, label:'¿Revisión de daños físicos?', checked:false },
    { id:4, label:'¿Cantidad verificada con orden?', checked:false },
    { id:5, label:'¿Sellado y asegurado?', checked:false },
  ]);

  // ── Loading states ──
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [loadingOrdenes, setLoadingOrdenes] = useState(false);
  const [apiError, setApiError] = useState('');

  // ── Temporizador hero ──
  const [tiempo, setTiempo] = useState({ h:24, m:0, s:0 });

  // ─── HELPERS ─────────────────────────────────────────────────────────────
  const mostrarMensaje = useCallback((texto) => {
    setMensajeActivo(texto);
    setTimeout(() => setMensajeActivo(''), 4000);
  }, []);

  const cambiarVista = useCallback((nuevaVista) => {
    setLoadingWidth(30);
    setTimeout(() => setLoadingWidth(70), 150);
    setTimeout(() => setLoadingWidth(100), 300);
    setTimeout(() => { setVista(nuevaVista); setLoadingWidth(0); }, 450);
  }, []);

  const saludo = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días'; if (h < 18) return 'Buenas tardes'; return 'Buenas noches';
  };
  const avatarRol = (rol) => ({ MASTER:'🗝️', ADMIN:'👔', EMPLEADO:'👷', admin:'👔', master:'🗝️', empleado:'👷' }[rol] || '👤');
  const formatTurno = (seg) => `${String(Math.floor(seg/3600)).padStart(2,'0')}:${String(Math.floor((seg%3600)/60)).padStart(2,'0')}:${String(seg%60).padStart(2,'0')}`;

  // ─── CARGA DE DATOS DESDE EL BACKEND ─────────────────────────────────────

  const fetchProductos = useCallback(async () => {
    setLoadingProductos(true);
    setApiError('');
    try {
      const res = await productService.getAll();
      const prods = res.data.productos || [];
      setListaProductos(prods);
      setCatalogoProductos(prods);
      // Inicializar stock editable desde la BD
      const stockMap = {};
      prods.forEach(p => { stockMap[p._id] = p.stock; });
      setStockProductos(stockMap);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'No se pudo conectar al servidor. Verifique que el backend esté corriendo.';
      setApiError(msg);
      mostrarMensaje(`⚠️ ${msg}`);
      console.error('[FETCH_PRODUCTOS_ERROR]', err);
    } finally {
      setLoadingProductos(false);
    }
  }, [mostrarMensaje]);

  const fetchUsuarios = useCallback(async () => {
    if (!usuarioActual || (usuarioActual.rol !== 'ADMIN' && usuarioActual.rol !== 'MASTER')) return;
    setLoadingUsuarios(true);
    try {
      const res = await authService.getUsuarios();
      setUsuariosSistema(res.data.usuarios || []);
    } catch (err) {
      console.error('[FETCH_USUARIOS]', err.message);
    } finally {
      setLoadingUsuarios(false);
    }
  }, [usuarioActual]);

  const fetchOrdenes = useCallback(async () => {
    if (!usuarioActual) return;
    setLoadingOrdenes(true);
    try {
      const res = await ordenService.getAll();
      const ordenes = res.data.ordenes || [];
      setOrdenesAdmin(ordenes);
    } catch (err) {
      console.error('[FETCH_ORDENES]', err.message);
    } finally {
      setLoadingOrdenes(false);
    }
  }, [usuarioActual]);

  // Cargar productos al iniciar
  useEffect(() => { fetchProductos(); }, [fetchProductos]);

  // Cargar usuarios y órdenes cuando el admin entra
  useEffect(() => {
    if (vista === 'panel-admin' || vista === 'master') {
      fetchUsuarios();
      fetchOrdenes();
    }
  }, [vista, fetchUsuarios, fetchOrdenes]);

  // Cargar órdenes cuando hay usuario autenticado
  useEffect(() => { if (usuarioActual) fetchOrdenes(); }, [usuarioActual, fetchOrdenes]);

  // Restaurar sesión desde localStorage
  useEffect(() => {
    const token = localStorage.getItem('sigid_token');
    const user = localStorage.getItem('sigid_user');
    if (token && user) {
      try { setUsuarioActual(JSON.parse(user)); } catch { localStorage.clear(); }
    }
    const carritoGuardado = localStorage.getItem('sigid_cart');
    if (carritoGuardado) { try { setCarrito(JSON.parse(carritoGuardado)); } catch {} }
  }, []);

  // Persistir carrito
  useEffect(() => { localStorage.setItem('sigid_cart', JSON.stringify(carrito)); }, [carrito]);

  // Temporizador sesión
  useEffect(() => {
    if (!usuarioActual) return;
    if (tiempoSesion <= 0) {
      cerrarSesion(); mostrarMensaje('SESIÓN EXPIRADA: Por seguridad, su sesión fue cerrada.'); return;
    }
    const t = setTimeout(() => setTiempoSesion(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [tiempoSesion, usuarioActual]); // eslint-disable-line

  // Reset inactividad
  const resetSesion = useCallback(() => { if (usuarioActual) setTiempoSesion(1800); }, [usuarioActual]);
  useEffect(() => {
    window.addEventListener('click', resetSesion);
    window.addEventListener('keydown', resetSesion);
    return () => { window.removeEventListener('click', resetSesion); window.removeEventListener('keydown', resetSesion); };
  }, [resetSesion]);

  // Temporizador turno empleado
  useEffect(() => {
    if (usuarioActual?.rol !== 'empleado' && usuarioActual?.rol !== 'EMPLEADO') return;
    const t = setInterval(() => setTiempoTurno(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, [usuarioActual]);

  // Temporizador hero
  useEffect(() => {
    const t = setInterval(() => setTiempo(prev => {
      if (prev.s > 0) return {...prev, s: prev.s - 1};
      if (prev.m > 0) return {...prev, m: prev.m - 1, s: 59};
      if (prev.h > 0) return {h: prev.h - 1, m: 59, s: 59};
      return prev;
    }), 1000);
    return () => clearInterval(t);
  }, []);

  // Tema dark/light mode — aplica clase al body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  // Alerta stock crítico al entrar al panel empleado
  useEffect(() => {
    if (vista === 'panel-empleado' && listaProductos.length > 0) {
      const criticos = listaProductos.filter(p => (stockProductos[p._id] ?? p.stock) < 5);
      if (criticos.length > 0) mostrarMensaje(`⚠️ ALERTA: ${criticos.length} producto(s) en stock crítico`);
    }
  }, [vista]); // eslint-disable-line

  // ─── AUTENTICACIÓN ───────────────────────────────────────────────────────

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem('sigid_token');
    localStorage.removeItem('sigid_user');
    setUsuarioActual(null);
    setOrdenesAdmin([]);
    cambiarVista('inicio');
  }, [cambiarVista]);

  const manejarLogin = async (e) => {
    e.preventDefault();
    if (bloqueado) { mostrarMensaje('SISTEMA BLOQUEADO: Demasiados intentos fallidos.'); return; }

    if (isRegistering) {
      try {
        const rolAuto = email.includes('admin') ? 'admin' : 'empleado';
        await authService.register(nombreRegistro, email, pass, rolAuto);
        mostrarMensaje(`✅ REGISTRO EXITOSO: Bienvenido ${nombreRegistro}. Su cuenta está pendiente de aprobación por el administrador.`);
        setIsRegistering(false);
        setEmail(''); setPass(''); setNombreRegistro('');
      } catch (err) {
        mostrarMensaje(`❌ Error en registro: ${err.response?.data?.message || 'Datos inválidos'}`);
      }
      return;
    }

    // MFA simulado (el token real viene del backend en producción)
    if (esperandoMFA) {
      if (mfaToken === '123456') {
        mostrarMensaje('MFA VERIFICADO: Identidad confirmada.');
        const userPendiente = JSON.parse(localStorage.getItem('sigid_user_pending') || '{}');
        localStorage.setItem('sigid_user', JSON.stringify(userPendiente));
        localStorage.removeItem('sigid_user_pending');
        
        setUsuarioActual(userPendiente);
        setTiempoSesion(1800);
        setEsperandoMFA(false);
        cambiarVista(userPendiente.rol === 'MASTER' ? 'master' : 'panel-admin');
      } else {
        mostrarMensaje('ERROR: Token MFA inválido.');
      }
      return;
    }

    try {
      const res = await authService.login(email, pass);
      const { token, user } = res.data;

      // Lógica de autorización: Si no está activo, detenemos el login aquí
      if (user.activo === false) {
        mostrarMensaje('⏳ ACCESO DENEGADO: Su cuenta aún no ha sido autorizada por el administrador.');
        return;
      }

      localStorage.setItem('sigid_token', token);

      const rolNormalizado = user.rol.toUpperCase();

      // Validar que el usuario use el portal correcto
      if (rolNormalizado === 'EMPLEADO' && vista === 'admin') {
        mostrarMensaje('❌ Esta cuenta es de Empleado. Use el portal de LOGÍSTICA en el menú.');
        return;
      }
      if ((rolNormalizado === 'ADMIN' || rolNormalizado === 'MASTER') && vista === 'empleado') {
        mostrarMensaje('❌ Esta cuenta es de Administrador. Use el portal de ADMINISTRACIÓN en el menú.');
        return;
      }

      // Empleado → directo al panel sin MFA
      if (rolNormalizado === 'EMPLEADO') {
        localStorage.setItem('sigid_token', token);
        localStorage.setItem('sigid_user', JSON.stringify(user));
        setUsuarioActual({ ...user, rol: rolNormalizado });
        setTiempoSesion(1800);
        setIntentosLogin(0);
        mostrarMensaje(`✅ Bienvenido, ${user.nombre}`);
        cambiarVista('panel-empleado');
        return;
      }

      // Admin y master → requieren MFA
      if (rolNormalizado === 'ADMIN' || rolNormalizado === 'MASTER') {
        mostrarMensaje('CREDENCIALES CORRECTAS: Ingrese el código MFA (123456).');
        localStorage.setItem('sigid_user_pending', JSON.stringify({ ...user, rol: rolNormalizado }));
        setEsperandoMFA(true);
        setIntentosLogin(0);
        return;
      }

      // Cualquier otro rol
      setUsuarioActual({ ...user, rol: rolNormalizado });
      setTiempoSesion(1800);
      setIntentosLogin(0);
      mostrarMensaje(`✅ Bienvenido, ${user.nombre}`);
      cambiarVista('panel-empleado');

    } catch (err) {
      const msg = err.response?.data?.message || '';

      // Si el backend no responde, usar credenciales locales de respaldo
      if (!err.response) {
        const credencialesLocales = [
          { email: 'admin@lojjic.com',    password: 'ADSO2026',     rol: 'ADMIN',    nombre: 'Administrador' },
          { email: 'master@lojjic.com',   password: 'MASTER2026#',  rol: 'MASTER',   nombre: 'Master SIGID' },
          { email: 'empleado@lojjic.com', password: 'Empleado2026', rol: 'EMPLEADO', nombre: 'Empleado Logística' },
        ];
        const credencial = credencialesLocales.find(c => c.email === email && c.password === pass);
        if (credencial) {
          // Validar portal correcto también en modo offline
          if (credencial.rol === 'EMPLEADO' && vista === 'admin') {
            mostrarMensaje('❌ Esta cuenta es de Empleado. Use el portal de LOGÍSTICA.');
            return;
          }
          if (credencial.rol !== 'EMPLEADO' && vista === 'empleado') {
            mostrarMensaje('❌ Esta cuenta es de Administrador. Use el portal de ADMINISTRACIÓN.');
            return;
          }
          const userLocal = { id: 'local', nombre: credencial.nombre, email: credencial.email, rol: credencial.rol };
          if (credencial.rol === 'EMPLEADO') {
            localStorage.setItem('sigid_user', JSON.stringify(userLocal));
            setUsuarioActual(userLocal);
            setTiempoSesion(1800);
            mostrarMensaje(`✅ Bienvenido, ${credencial.nombre} (modo offline)`);
            cambiarVista('panel-empleado');
            return;
          }
          localStorage.setItem('sigid_user_pending', JSON.stringify(userLocal));
          setEsperandoMFA(true);
          mostrarMensaje('CREDENCIALES CORRECTAS: Ingrese el código MFA (123456).');
          return;
        }
        mostrarMensaje('ERROR: Credenciales inválidas o servidor no disponible.');
        return;
      }

      const nuevosIntentos = intentosLogin + 1;
      setIntentosLogin(nuevosIntentos);
      if (nuevosIntentos >= 3) {
        setBloqueado(true);
        mostrarMensaje('ALERTA DE SEGURIDAD: Acceso denegado. Demasiados intentos fallidos.');
      } else {
        mostrarMensaje(`ERROR: ${msg || 'Credenciales inválidas.'} Intento ${nuevosIntentos} de 3.`);
      }
    }
  };

  const manejarRecuperacion = () => {
    mostrarMensaje('SISTEMA: Se ha enviado un enlace de recuperación a su correo corporativo.');
  };

  // ─── CARRITO ─────────────────────────────────────────────────────────────

  const setCantidad = (id, val) => setCantidades(prev => ({...prev, [id]: Math.max(1, val)}));

  const añadirAlCarritoConCantidad = (p) => {
    const cant = cantidades[p._id] || 1;
    const items = Array.from({ length: cant }, () => ({...p, tempId: Date.now() + Math.random()}));
    setCarrito(prev => [...prev, ...items]);
    mostrarMensaje(`✅ ${cant}x ${p.nombre} agregado(s) a la bolsa.`);
  };

  const eliminarDelCarrito = (tempId) => {
    setCarrito(prev => prev.filter(item => item.tempId !== tempId));
    mostrarMensaje('SISTEMA: Producto removido de la orden actual.');
  };

  const totalCalculado = carrito.reduce((acc, item) => acc + item.precio, 0);

  // ─── DESPACHO ────────────────────────────────────────────────────────────

  const procesarSalidaActivos = async (datosEnvio = {}) => {
    if (carrito.length === 0) { mostrarMensaje('ERROR: No hay activos en la bolsa.'); return; }

    try {
      const items = carrito.map(p => ({
        productoId: p._id,
        nombre: p.nombre,
        precio: p.precio,
        categoria: p.categoria || p.cat
      }));

      const res = await ordenService.crear({
        items,
        sede: sedeSeleccionada,
        metodoPago,
        destinatario: datosEnvio
      });

      const nuevaOrden = res.data.orden;
      
      // Nueva funcionalidad: Ofrecer descargar guía
      setTimeout(() => {
        const descargar = window.confirm(
          `Orden ${nuevaOrden.id_guia} creada.\n\n` +
          `¿Descargar guía de despacho?\n` +
          `(El admin será notificado)`
        );
        if (descargar) descargarGuiaDespacho(nuevaOrden._id, nuevaOrden.id_guia);
      }, 500);

      generarPDFDespacho(nuevaOrden, carrito);
      setOrdenesAdmin(prev => [nuevaOrden, ...prev]);
      setNuevasOrdenes(prev => prev + 1);
      setMostrarExito(nuevaOrden);
      setCarrito([]); setMostrarCarrito(false); setMostrarConfirmDespacho(false);
      mostrarMensaje(`✅ Guía ${nuevaOrden.id_guia} generada. Notificación al admin.`);
      // Refrescar stock
      fetchProductos();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al procesar el despacho.';
      mostrarMensaje(`❌ ${msg}`);
    }
  };

  // ─── STOCK ───────────────────────────────────────────────────────────────

  const ajustarStockLocal = async (producto, delta) => {
    try {
      await productService.ajustarStock(producto._id, delta);
      const nuevo = Math.max(0, (stockProductos[producto._id] || 0) + delta);
      setStockProductos(prev => ({...prev, [producto._id]: nuevo}));
      setHistorialMovimientos(h => [{
        id: Date.now(), producto: producto.nombre,
        cambio: delta > 0 ? `+${delta}` : `${delta}`,
        stockResultante: nuevo, fecha: new Date().toLocaleString()
      }, ...h]);
    } catch (err) {
      mostrarMensaje(`❌ ${err.response?.data?.message || 'Error al ajustar stock.'}`);
    }
  };

  // ─── PRODUCTOS CRUD ───────────────────────────────────────────────────────

  const guardarProducto = async (prod) => {
    try {
      if (prod.esNuevo) {
        const { esNuevo, tempId, ...data } = prod;
        const res = await productService.crear(data);
        const nuevo = res.data.producto;
        setCatalogoProductos(prev => [...(prev || []), nuevo]);
        setListaProductos(prev => [...prev, nuevo]);
        mostrarMensaje(`✅ Producto "${nuevo.nombre}" creado correctamente.`);
      } else {
        const res = await productService.actualizar(prod._id, prod);
        const actualizado = res.data.producto;
        setCatalogoProductos(prev => prev.map(p => p._id === actualizado._id ? actualizado : p));
        setListaProductos(prev => prev.map(p => p._id === actualizado._id ? actualizado : p));
        mostrarMensaje(`✅ Producto "${actualizado.nombre}" actualizado.`);
      }
      setMostrarModalProducto(false); setProductoEditando(null);
    } catch (err) {
      mostrarMensaje(`❌ ${err.response?.data?.message || 'Error al guardar el producto.'}`);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await productService.eliminar(id);
      setCatalogoProductos(prev => prev.filter(p => p._id !== id));
      setListaProductos(prev => prev.filter(p => p._id !== id));
      mostrarMensaje('🗑️ Producto eliminado del catálogo.');
    } catch (err) {
      mostrarMensaje(`❌ ${err.response?.data?.message || 'Error al eliminar.'}`);
    }
  };

  const agregarProducto = () => {
    setProductoEditando({ nombre:'', precio:0, cat:'Portátiles', categoria:'Portátiles', imagen:'', detalles:'', stock:0, sku:'', ubicacion:'', esNuevo:true });
    setMostrarModalProducto(true);
  };

  // ─── GESTIÓN DE USUARIOS (ADMIN) ───────────────────────────────────────────

  const toggleAutorizacionUsuario = async (uId, estadoActual) => {
    try {
      await authService.actualizarEstadoUsuario(uId, !estadoActual);
      setUsuariosSistema(prev => prev.map(u => u._id === uId ? { ...u, activo: !estadoActual } : u));
      mostrarMensaje(`👤 Usuario ${!estadoActual ? 'AUTORIZADO' : 'DESACTIVADO'} correctamente.`);
    } catch (err) {
      mostrarMensaje('❌ Error al cambiar estado del usuario.');
    }
  };

  // ─── ÓRDENES ─────────────────────────────────────────────────────────────

  const asignarDespacho = async (ordenId, empleadoAsignado) => {
    if (!empleadoAsignado) { mostrarMensaje('Seleccione un empleado primero.'); return; }
    try {
      const res = await ordenService.asignar(ordenId, empleadoAsignado);
      const ordenActualizada = res.data.orden;
      setOrdenesAdmin(prev => prev.map(o => (o._id === ordenId || o.id_guia === ordenActualizada.id_guia) ? ordenActualizada : o));
      mostrarMensaje(`✅ ASIGNADO: Guía ${ordenActualizada.id_guia} → ${empleadoAsignado}`);
    } catch (err) {
      mostrarMensaje(`❌ ${err.response?.data?.message || 'Error al asignar.'}`);
    }
  };

    const procesarTrasladoSede = (producto, origen, destino, cant) => {
    if (!destino || origen === destino) { mostrarMensaje('⚠️ Seleccione una sede de destino válida.'); return; }
    if (cant <= 0) { mostrarMensaje('⚠️ Cantidad inválida.'); return; }
    
    const nuevoTraslado = {
      id: Date.now(),
      producto: producto.nombre,
      origen,
      destino,
      cantidad: cant,
      fecha: new Date().toLocaleString(),
      responsable: usuarioActual?.nombre || 'Empleado'
    };

    setTrasladosInterSedes(prev => [nuevoTraslado, ...prev]);
    mostrarMensaje(`📦 TRASLADO: ${cant} unidad(es) de ${producto.nombre} en camino a ${destino}.`);
  };

  const abrirModalFirma = (orden) => {
    setOrdenParaFirmar(orden);
    () => {};
  };

  const confirmarEntregaConFirma = async () => {
    if (!firmaDibujada) {
      mostrarMensaje('⚠️ El cliente debe firmar antes de finalizar.');
      return;
    }

    try {
      const res = await ordenService.marcarEntregada(ordenParaFirmar._id);
      const ordenActualizada = res.data.orden;
      setOrdenesAdmin(prev => prev.map(o => o._id === ordenParaFirmar._id ? ordenActualizada : o));
      setEstadoOrdenes(prev => ({...prev, [ordenParaFirmar._id]: 'ENTREGADO'}));
      setOrdenParaFirmar(null);
      mostrarMensaje(`✅ ENTREGA EXITOSA: Guía ${ordenActualizada.id_guia} cerrada con firma.`);
    } catch (err) {
      mostrarMensaje(`❌ ${err.response?.data?.message || 'Error al confirmar entrega.'}`);
    }
  };

  const performInventorySync = async () => {
    try {
      await productService.sync();
      await fetchProductos();
      mostrarMensaje('✅ Sincronización con MongoDB completada.');
    } catch (err) {
      mostrarMensaje(`❌ ${err.response?.data?.message || 'Error en sincronización.'}`);
    }
  };

  // ─── INCIDENCIAS ─────────────────────────────────────────────────────────

  const reportarIncidencia = () => {
    const motivo = prompt('Describa la novedad o incidencia en bodega:');
    if (motivo) {
      setIncidencias(prev => [{ id: Date.now(), motivo, fecha: new Date().toLocaleString(), estado:'Pendiente' }, ...prev]);
      mostrarMensaje('SISTEMA: Incidencia registrada y enviada a supervisión.');
    }
  };

  const solicitarReabastecimiento = (producto) => {
    setSolicitudesReabastecimiento(prev => [{ id:Date.now(), producto:producto.nombre, fecha:new Date().toLocaleString(), estado:'Enviada' }, ...prev]);
    mostrarMensaje(`📦 Solicitud de reabastecimiento enviada para ${producto.nombre}`);
  };

  const toggleChecklist = (id) => setChecklistItems(prev => prev.map(i => i.id === id ? {...i, checked: !i.checked} : i));

  // ─── PDF ─────────────────────────────────────────────────────────────────

  const generarPDFDespacho = (guia, items) => {
    const doc = new jsPDF();
    doc.setFontSize(20); doc.setTextColor(184,134,11);
    doc.text('LOJJIC-J SISTEMAS S.A.S', 105, 20, { align:'center' });
    doc.setFontSize(10); doc.setTextColor(100);
    doc.text(`Guía: ${guia.id_guia}`, 15, 35);
    doc.text(`Fecha: ${guia.fecha_emision || new Date().toLocaleString()}`, 15, 40);
    doc.text(`Sede: ${sedeSeleccionada}`, 15, 45);
    autoTable(doc, {
      startY: 55,
      head: [['Activo', 'Categoría', 'Valor']],
      body: items.map(p => [p.nombre, p.categoria || p.cat, `$${p.precio.toLocaleString()}`]),
      theme: 'striped', headStyles: { fillColor: [184,134,11] }
    });
    doc.text(`TOTAL: $${(guia.valor_declarado || totalCalculado).toLocaleString()}`, 15, doc.lastAutoTable.finalY + 15);
    doc.save(`${guia.id_guia}_SIGID.pdf`);
  };

  // Nueva función: descargar guía desde backend (genera notificación)
  const descargarGuiaDespacho = async (ordenId, numeroGuia) => {
    try {
      const token = localStorage.getItem('sigid_token');
      if (!token) {
        mostrarMensaje('❌ Sesión expirada. Por favor, inicia sesión de nuevo.');
        return;
      }

      const response = await ordenService.descargarGuia(ordenId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `guia-${numeroGuia}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      mostrarMensaje('📥 Guía descargada. Admin notificado del evento.');
    } catch (error) {
      console.error('Error descargando guía:', error);
      if (error.response?.status === 401) {
        mostrarMensaje('❌ Sesión expirada. Inicia sesión nuevamente.');
        localStorage.removeItem('sigid_token');
        localStorage.removeItem('sigid_user');
      } else {
        mostrarMensaje('❌ Error al descargar guía: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const generarPDFAuditoria = () => {
    const doc = new jsPDF();
    doc.setFontSize(14); doc.setTextColor(184,134,11);
    doc.text('REPORTE DE AUDITORÍA SIGID', 105, 15, { align:'center' });
    doc.setFontSize(9); doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 15, 25);
    autoTable(doc, {
      startY: 30,
      head: [['GUÍA','FECHA','SEDE','VALOR','EMPLEADO','ESTADO']],
      body: ordenesAdmin.map(o => [o.id_guia, o.createdAt ? new Date(o.createdAt).toLocaleString() : '', o.sede, `$${o.valor_declarado?.toLocaleString()}`, o.empleadoAsignado || 'Sin asignar', o.estado]),
      theme: 'striped', headStyles: { fillColor: [184,134,11] }
    });
    doc.save('auditoria_SIGID.pdf');
  };

  const exportarInventarioPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16); doc.setTextColor(184,134,11);
    doc.text('REPORTE DE INVENTARIO - SIGID', 105, 15, { align:'center' });
    doc.setFontSize(9); doc.setTextColor(100);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 15, 25);
    autoTable(doc, {
      startY: 30,
      head: [['SKU','Producto','Categoría','Stock','Estado']],
      body: listaProductos.map(p => {
        const s = stockProductos[p._id] ?? p.stock;
        return [p.sku || p._id?.substring(0,8), p.nombre, p.categoria || p.cat, s, s < 5 ? 'CRÍTICO' : s < 10 ? 'REABASTECER' : 'OK'];
      }),
      theme: 'striped', headStyles: { fillColor: [184,134,11] }
    });
    doc.save('inventario_SIGID.pdf');
  };

  const imprimirEtiqueta = (orden) => {
    const doc = new jsPDF({ format:[100,60], unit:'mm' });
    doc.setFontSize(8); doc.setTextColor(184,134,11);
    doc.text('LOJJIC-J SISTEMAS', 50, 8, { align:'center' });
    doc.setFontSize(14); doc.setTextColor(0);
    doc.text(orden.id_guia, 50, 18, { align:'center' });
    doc.setFontSize(7); doc.setTextColor(80);
    doc.text(`Sede: ${orden.sede}`, 5, 28);
    doc.text(`Empleado: ${orden.empleadoAsignado || 'Sin asignar'}`, 5, 34);
    doc.text(`Total: $${orden.valor_declarado?.toLocaleString()}`, 5, 40);
    doc.save(`etiqueta_${orden.id_guia}.pdf`);
  };

  // ─── FILTROS Y DATOS DERIVADOS ────────────────────────────────────────────

  const toggleFavorito = (id) => setFavoritos(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  const toggleComparar = (p) => setComparar(prev => prev.find(x => x._id === p._id) ? prev.filter(x => x._id !== p._id) : prev.length < 3 ? [...prev, p] : prev);
  const calificar = (id, stars) => setCalificaciones(prev => ({...prev, [id]: stars}));
  const registrarVisita = (id) => setVisitas(prev => ({...prev, [id]: (prev[id] || 0) + 1}));

  const productosFiltrados = (() => {
    const lista = catalogoProductos || listaProductos;
    let result = lista.filter(p => {
      const cat = p.categoria || p.cat || '';
      const nombre = p.nombre || '';
      return (filtroCat === 'Todos' || cat === filtroCat) &&
             nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
             (!filtroPrecioMax || p.precio <= Number(filtroPrecioMax));
    });
    if (ordenPrecio === 'asc') result = [...result].sort((a,b) => a.precio - b.precio);
    if (ordenPrecio === 'desc') result = [...result].sort((a,b) => b.precio - a.precio);
    return result;
  })();

  const ordenesFiltradas = ordenesAdmin.filter(o => {
    const matchFiltro = ordenFiltro === 'todos' ||
      (ordenFiltro === 'pendientes' && !o.empleadoAsignado) ||
      (ordenFiltro === 'asignadas' && !!o.empleadoAsignado);
    const matchBusqueda = !busquedaOrden ||
      o.id_guia?.toLowerCase().includes(busquedaOrden.toLowerCase()) ||
      (o.empleadoAsignado || '').toLowerCase().includes(busquedaOrden.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  const misOrdenesAsignadas = ordenesAdmin.filter(o => o.empleadoAsignado === usuarioActual?.nombre);
  const ordenesEntregadas = misOrdenesAsignadas.filter(o => o.estado === 'ENTREGADO').length;

  const datosGrafica = ordenesAdmin.length > 0
    ? ordenesAdmin.slice(0,7).reverse().map((o,i) => ({ name:`Orden ${i+1}`, valor: o.valor_declarado }))
    : [{ name:'Sin datos', valor:0 }];

  const LABELS = {
    identificador: 'IDENTIFICADOR', tokenSeguridad: 'CONTRASEÑA',
    codigoMFA: 'CÓDIGO DE VERIFICACIÓN (MFA)', sedeDespacho: 'SEDE DE DESPACHO',
    metodoPago: 'MÉTODO DE PAGO', nombreCompleto: 'NOMBRE COMPLETO', contrasena: 'CONTRASEÑA'
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>

      {/* ── FONDO ANIMADO CSS (sin video externo — carga instantánea) ── */}
      <div className="bg-animated"></div>

      {/* ── LÍNEAS Y PARTÍCULAS ── */}
      <div className="bg-lines">
        <div className="line" style={{ left:'15%', animationDelay:'0s', animationDuration:'12s' }}></div>
        <div className="line" style={{ left:'35%', animationDelay:'3s', animationDuration:'9s' }}></div>
        <div className="line" style={{ left:'55%', animationDelay:'6s', animationDuration:'14s' }}></div>
        <div className="line" style={{ left:'75%', animationDelay:'1.5s', animationDuration:'11s' }}></div>
        <div className="line" style={{ left:'90%', animationDelay:'4.5s', animationDuration:'8s' }}></div>
        {[...Array(8)].map((_,i) => (
          <div key={i} className="particle" style={{
            width: `${[3,2,4,2,3,2,4,3][i]}px`,
            height: `${[3,2,4,2,3,2,4,3][i]}px`,
            background: darkMode
              ? (i%2===0 ? 'rgba(212,175,55,0.7)' : 'rgba(0,212,255,0.5)')
              : (['rgba(0,102,255,0.95)','rgba(0,195,255,0.95)','rgba(56,189,248,0.90)','rgba(96,165,250,0.95)','rgba(0,212,255,0.90)','rgba(0,102,255,0.85)','rgba(56,189,248,0.95)','rgba(0,195,255,0.90)'][i]),
            left: `${10+i*11}%`,
            animationDuration: `${8+i*2}s`,
            animationDelay: `${i*1.2}s`,
            boxShadow: darkMode
              ? (i%2===0 ? '0 0 6px rgba(212,175,55,0.9)' : '0 0 6px rgba(0,212,255,0.7)')
              : (['0 0 10px rgba(0,102,255,1)','0 0 10px rgba(0,195,255,0.95)','0 0 10px rgba(56,189,248,1)','0 0 10px rgba(96,165,250,1)','0 0 10px rgba(0,212,255,1)','0 0 10px rgba(0,102,255,0.9)','0 0 10px rgba(56,189,248,0.95)','0 0 10px rgba(0,195,255,1)'][i])
          }} />
        ))}
      </div>

      <div className="top-loader" style={{ width:`${loadingWidth}%` }}></div>
      {mensajeActivo && <div className="toast">{mensajeActivo}</div>}

      {/* MODAL CONFIRMACIÓN DESPACHO */}
      {mostrarConfirmDespacho && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div className="glass-card" style={{ padding:'50px', maxWidth:'450px', textAlign:'center', background:'#fff' }}>
            <div style={{ fontSize:'3rem', marginBottom:'20px' }}>📦</div>
            <h3 style={{ fontFamily:'Syncopate', color:'#111', marginBottom:'10px' }}>CONFIRMAR DESPACHO</h3>
            <p style={{ color:'#6b7280', marginBottom:'10px' }}>{carrito.length} activo(s) por <strong style={{ color:'#b8860b' }}>${totalCalculado.toLocaleString()}</strong></p>
            <p style={{ color:'#6b7280', fontSize:'0.85rem', marginBottom:'30px' }}>Sede: <strong>{sedeSeleccionada}</strong> | Pago: <strong>{metodoPago}</strong></p>
            <div style={{ display:'flex', gap:'15px', justifyContent:'center' }}>
              <button className="btn-oro" style={{ padding:'15px 30px' }} onClick={() => procesarSalidaActivos()}>CONFIRMAR</button>
              <button style={{ padding:'15px 30px', borderRadius:'8px', border:'1px solid #e5e7eb', background:'none', cursor:'pointer', fontFamily:'Syncopate', fontSize:'0.7rem' }} onClick={() => setMostrarConfirmDespacho(false)}>CANCELAR</button>
            </div>
          </div>
        </div>
      )}

      {/* PANTALLA ÉXITO */}
      {mostrarExito && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div className="glass-card" style={{ padding:'60px', maxWidth:'500px', textAlign:'center', background:'#fff' }}>
            <div style={{ fontSize:'4rem', marginBottom:'20px' }}>✅</div>
            <h2 style={{ fontFamily:'Syncopate', color:'#10b981', marginBottom:'10px' }}>¡DESPACHO CONFIRMADO!</h2>
            <div style={{ background:'#f0fdf4', border:'2px solid #10b981', borderRadius:'12px', padding:'20px', margin:'20px 0' }}>
              <div style={{ fontSize:'0.7rem', color:'#6b7280', fontWeight:'800' }}>NÚMERO DE GUÍA</div>
              <div style={{ fontSize:'2rem', fontWeight:'900', color:'#b8860b', letterSpacing:'2px' }}>{mostrarExito.id_guia}</div>
            </div>
            <p style={{ color:'#6b7280', marginBottom:'25px' }}>Su orden ha sido registrada y está pendiente de asignación.</p>
            <button className="btn-oro" style={{ padding:'15px 40px' }} onClick={() => { setMostrarExito(null); cambiarVista('tienda'); }}>VOLVER AL CATÁLOGO</button>
          </div>
        </div>
      )}

      {/* BARRA DE NAVEGACIÓN */}
      <nav style={{ padding:'20px 60px', display:'flex', justifyContent:'space-between', alignItems:'center', background: 'rgba(2,4,8,0.85)', backdropFilter:'blur(30px)', WebkitBackdropFilter:'blur(30px)', position:'sticky', top:0, zIndex:1000, borderBottom:'1px solid rgba(212,175,55,0.12)', boxShadow:'0 4px 30px rgba(0,0,0,0.4)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'25px', cursor:'pointer' }} onClick={() => cambiarVista('inicio')}>
          <div className="logo-box">LOJJ-J</div>
          <div style={{ display:'flex', flexDirection:'column' }}>
            <span style={{ fontFamily:'Syncopate', letterSpacing:'4px', fontSize:'1rem', color:'#f0f4ff', fontWeight:'bold' }}>LOJJIC-J <span style={{color:'#d4af37'}}>SISTEMAS</span></span>
            <span style={{ fontSize:'0.55rem', letterSpacing:'3px', color:'rgba(212,175,55,0.6)', fontWeight:'800' }}>TECNOLOGÍA E INGENIERÍA</span>
          </div>
        </div>
        <div style={{ display:'flex', gap:'35px', alignItems:'center' }}>
          <span className="nav-item" onClick={() => cambiarVista('tienda')}>CATÁLOGO</span>
          <span className="nav-item" onClick={() => cambiarVista('empleado')}>LOGÍSTICA</span>
          <span className="nav-item" style={{ position:'relative' }} onClick={() => cambiarVista('admin')}>
            ADMINISTRACIÓN
            {nuevasOrdenes > 0 && <span style={{ position:'absolute', top:-8, right:-12, background:'#ef4444', color:'#fff', borderRadius:'50%', padding:'2px 6px', fontSize:'0.6rem', fontWeight:'900' }}>{nuevasOrdenes}</span>}
          </span>
          <button onClick={() => setDarkMode(!darkMode)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'1.2rem' }}>{darkMode ? '☀️' : '🌙'}</button>
          {usuarioActual && (
            <div style={{ display:'flex', alignItems:'center', gap:'10px', background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(184,134,11,0.08)', padding:'8px 15px', borderRadius:'20px', border:'1px solid rgba(184,134,11,0.3)' }}>
              <span style={{ fontSize:'0.65rem', fontWeight:'900', color:'#b8860b', fontFamily:'Syncopate' }}>{avatarRol(usuarioActual.rol)} {usuarioActual.rol}</span>
              <span style={{ fontSize:'0.8rem', color: 'var(--text-h)', fontWeight:'600' }}>{usuarioActual.nombre}</span>
              <span style={{ fontSize:'0.6rem', color:'#9ca3af' }}>{Math.floor(tiempoSesion/60)}:{String(tiempoSesion%60).padStart(2,'0')}</span>
              <span onClick={cerrarSesion} style={{ cursor:'pointer', color:'#ef4444', fontSize:'0.7rem', fontWeight:'800', marginLeft:'5px' }}>✕</span>
            </div>
          )}
          <div onClick={() => setMostrarCarrito(true)} style={{ cursor:'pointer', position:'relative', fontSize:'1.4rem', marginLeft:'15px', transition:'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform='scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}>
            🛒 <span style={{ position:'absolute', top:-10, right:-14, background:'#b8860b', color:'#ffffff', borderRadius:'50%', padding:'3px 8px', fontSize:'0.7rem', fontWeight:'900' }}>{carrito.length}</span>
          </div>
        </div>
      </nav>

      {/* ÁREA DE CONTENIDO */}
      <main style={{ flex:1 }} className="fade-in" key={vista}>
        {/* ── INICIO ── */}
        {vista === 'inicio' && (
          <div>
            <div style={{ background:'linear-gradient(90deg, #b8860b, #ffd700, #b8860b)', padding:'12px', textAlign:'center', animation:'pulse 2s infinite' }}>
              <span style={{ fontFamily:'Syncopate', fontSize:'0.75rem', fontWeight:'900', color:'#000', letterSpacing:'2px' }}>
                🔥 OFERTA DEL DÍA: 20% DE DESCUENTO EN PORTÁTILES • CÓDIGO: <span style={{ background:'#000', color:'#ffd700', padding:'2px 8px', borderRadius:'4px' }}>ADSO2026</span>
              </span>
            </div>
            <div className="hero-container" style={{ textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div className="hero-badge fade-in"><span style={{ marginRight:'10px' }}>💎</span>ACCESO EXCLUSIVO: {tiempo.h}H {tiempo.m}M {tiempo.s}S</div>
              <h1 style={{ fontFamily:'Syncopate', fontSize:'6.5rem', color:'var(--text-h)', marginTop:'0', lineHeight:'0.9', letterSpacing:'-2px' }}>
                <span className="hero-title-elite">ELITE</span>
                <br/>
                <span className={`hero-title-accent ${darkMode ? 'hero-title-accent-dark' : 'hero-title-accent-light'}`}
                  style={{ fontSize:'6.5rem', backgroundSize:'300% 100%' }}>
                  HARDWARE
                </span>
              </h1>
              <p className="hero-subtitle" style={{ color:'var(--text-body)', maxWidth:'850px', margin:'40px auto', fontSize:'1.3rem', lineHeight:'1.8' }}>
                No vendemos equipos, entregamos el poder para dominar el ecosistema digital.
              </p>
              <div style={{ maxWidth:'600px', margin:'0 auto 40px', display:'flex', gap:'10px' }}>
                <input type="text" placeholder="Buscar producto..." style={{ flex:1, margin:0, padding:'18px 25px', borderRadius:'50px', border:'2px solid rgba(184,134,11,0.3)', background: 'var(--bg-card)', color: 'var(--text-h)', fontSize:'1rem' }}
                  onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') cambiarVista('tienda'); }} />
                <button className="btn-oro" style={{ padding:'18px 30px', borderRadius:'50px' }} onClick={() => cambiarVista('tienda')}>🔍</button>
              </div>
              <button className="btn-oro" style={{ padding:'25px 60px', fontSize:'1.2rem' }} onClick={() => cambiarVista('tienda')}>EXPLORAR EQUIPOS</button>
              {apiError && <div style={{ marginTop:'20px', color:'#ef4444', fontSize:'0.85rem', background:'#fff5f5', padding:'10px 20px', borderRadius:'8px', display:'inline-block' }}>⚠️ Backend: {apiError}</div>}
            </div>

            {/* CATEGORÍAS */}
            <div style={{ padding:'60px 10%', background: 'var(--bg-section-1)' }}>
              <h2 style={{ fontFamily:'Syncopate', textAlign:'center', color: 'var(--text-h)', marginBottom:'40px' }}>EXPLORAR POR <span style={{ color:'#b8860b' }}>CATEGORÍA</span></h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'25px', maxWidth:'800px', margin:'0 auto' }}>
                {[{ icon:'💻', label:'Portátiles', cat:'Portátiles', color:'#3b82f6' }, { icon:'📱', label:'Móviles', cat:'Móviles', color:'#10b981' }, { icon:'🎮', label:'Consolas', cat:'Consolas', color:'#b8860b' }].map(c => (
                  <div key={c.cat} onClick={() => { setFiltroCat(c.cat); cambiarVista('tienda'); }} className="glass-card" style={{ padding:'40px 20px', textAlign:'center', cursor:'pointer', background: 'var(--bg-card)' }}>
                    <div style={{ fontSize:'3rem', marginBottom:'15px' }}>{c.icon}</div>
                    <div style={{ fontFamily:'Syncopate', fontSize:'0.9rem', fontWeight:'900', color:c.color, marginBottom:'8px' }}>{c.label}</div>
                    <div style={{ fontSize:'0.75rem', color:'#9ca3af' }}>{listaProductos.filter(p => (p.categoria || p.cat) === c.cat).length} productos</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCTOS DESTACADOS */}
            <div style={{ padding:'60px 10%', background: 'var(--bg-section-2)' }}>
              <h2 style={{ fontFamily:'Syncopate', color: 'var(--text-h)', marginBottom:'40px' }}>PRODUCTOS <span style={{ color:'#b8860b' }}>DESTACADOS</span></h2>
              {loadingProductos ? <p style={{ color:'#9ca3af', textAlign:'center' }}>Cargando inventario...</p> : (
                <div style={{ display:'flex', gap:'25px', overflowX:'auto', paddingBottom:'15px' }}>
                  {listaProductos.slice(0,5).map(p => (
                    <div key={p._id} className="glass-card" style={{ minWidth:'220px', padding:'25px', textAlign:'center', background: 'var(--bg-card)', flexShrink:0, cursor:'pointer' }} onClick={() => cambiarVista('tienda')}>
                      <img src={p.imagen || p.img} alt={p.nombre} style={{ width:'100%', height:'130px', objectFit:'contain', marginBottom:'12px', borderRadius:'8px' }} />
                      <div style={{ fontSize:'0.85rem', fontWeight:'800', color: 'var(--text-h)', marginBottom:'5px' }}>{p.nombre.split(' ').slice(0,3).join(' ')}</div>
                      <div style={{ fontSize:'1rem', fontWeight:'900', color:'#b8860b' }}>${p.precio.toLocaleString()}</div>
                      <div style={{ fontSize:'0.65rem', color:'#9ca3af', marginTop:'5px' }}>📦 {stockProductos[p._id] ?? p.stock} disponibles</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ESTADÍSTICAS */}
            <div style={{ padding:'60px 10%', background:'linear-gradient(135deg, #1e293b, #0f172a)', textAlign:'center' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'40px', maxWidth:'900px', margin:'0 auto' }}>
                {[{ num:`${listaProductos.length}+`, label:'Activos en Inventario', icon:'💻' }, { num:'98%', label:'Satisfacción del Cliente', icon:'⭐' }, { num:'3', label:'Sedes Operativas', icon:'🏗️' }, { num:'24/7', label:'Soporte Técnico', icon:'🛡️' }].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize:'2rem', marginBottom:'8px' }}>{s.icon}</div>
                    <div style={{ fontFamily:'Syncopate', fontSize:'2.5rem', fontWeight:'900', color:'#b8860b' }}>{s.num}</div>
                    <div style={{ fontSize:'0.8rem', color:'#94a3b8', marginTop:'5px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* POR QUÉ ELEGIRNOS */}
            <div style={{ padding:'60px 10%', background: 'var(--bg-section-1)' }}>
              <h2 style={{ fontFamily:'Syncopate', textAlign:'center', color: 'var(--text-h)', marginBottom:'40px', fontSize:'1.5rem' }}>
                ¿POR QUÉ <span style={{ color:'#b8860b' }}>ELEGIRNOS?</span>
              </h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'25px' }}>
                {[
                  { icon:'🚚', title:'Envío Rápido', desc:'Despacho en 24-48 horas a todo el país con trazabilidad en tiempo real.' },
                  { icon:'🛡️', title:'Garantía Total', desc:'Todos nuestros productos cuentan con garantía extendida y soporte técnico.' },
                  { icon:'📞', title:'Soporte 24/7', desc:'Equipo especializado disponible las 24 horas para resolver cualquier inconveniente.' },
                  { icon:'🔒', title:'Pago Seguro', desc:'Transacciones cifradas con SSL/TLS 1.3. Aceptamos PSE, tarjetas y Bancolombia.' },
                ].map(item => (
                  <div key={item.title} className="glass-card" style={{ padding:'35px 25px', textAlign:'center', background: 'var(--bg-card)' }}>
                    <div style={{ fontSize:'2.5rem', marginBottom:'15px' }}>{item.icon}</div>
                    <h4 style={{ fontFamily:'Syncopate', fontSize:'0.85rem', color:'#b8860b', marginBottom:'10px' }}>{item.title}</h4>
                    <p style={{ fontSize:'0.85rem', color: 'var(--text-muted)', lineHeight:'1.6', margin:0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TESTIMONIOS */}
            <div style={{ padding:'60px 10%', background: 'var(--bg-section-2)' }}>
              <h2 style={{ fontFamily:'Syncopate', textAlign:'center', color: 'var(--text-h)', marginBottom:'40px', fontSize:'1.5rem' }}>
                LO QUE DICEN <span style={{ color:'#b8860b' }}>NUESTROS CLIENTES</span>
              </h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'25px' }}>
                {[
                  { nombre:'Carlos M.', cargo:'Ingeniero de Sistemas', texto:'Excelente servicio, el MacBook llegó en perfectas condiciones y en tiempo récord. Totalmente recomendado.', stars:5, avatar:'👨‍💻' },
                  { nombre:'Laura P.', cargo:'Diseñadora UX', texto:'La atención al cliente es increíble. Me ayudaron a elegir el equipo perfecto para mi trabajo.', stars:5, avatar:'👩‍🎨' },
                  { nombre:'Andrés R.', cargo:'Estudiante ADSO', texto:'Compré mi Nintendo Switch y el proceso fue muy fácil. El sistema de seguimiento es muy útil.', stars:4, avatar:'👨‍🎓' },
                ].map(t => (
                  <div key={t.nombre} className="glass-card" style={{ padding:'35px', background: 'var(--bg-card)' }}>
                    <div style={{ display:'flex', gap:'15px', alignItems:'center', marginBottom:'20px' }}>
                      <div style={{ fontSize:'2.5rem' }}>{t.avatar}</div>
                      <div>
                        <div style={{ fontWeight:'800', color: 'var(--text-h)' }}>{t.nombre}</div>
                        <div style={{ fontSize:'0.75rem', color:'#9ca3af' }}>{t.cargo}</div>
                      </div>
                    </div>
                    <div style={{ marginBottom:'15px' }}>
                      {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= t.stars ? '#f59e0b' : '#e5e7eb', fontSize:'1rem' }}>★</span>)}
                    </div>
                    <p style={{ fontSize:'0.9rem', color: 'var(--text-muted)', lineHeight:'1.7', margin:0, fontStyle:'italic' }}>"{t.texto}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MARCAS */}
            <div style={{ padding:'50px 10%', background: 'var(--bg-section-1)', textAlign:'center' }}>
              <p style={{ fontSize:'0.7rem', color:'#9ca3af', fontWeight:'800', letterSpacing:'3px', marginBottom:'30px' }}>MARCAS QUE MANEJAMOS</p>
              <div style={{ display:'flex', justifyContent:'center', gap:'40px', flexWrap:'wrap', alignItems:'center', opacity:0.6 }}>
                {['Apple','Samsung','Sony','ASUS','Dell','Nintendo','Microsoft'].map(marca => (
                  <span key={marca} style={{ fontFamily:'Syncopate', fontSize:'0.9rem', fontWeight:'900', color: 'var(--text-h)', letterSpacing:'2px' }}>{marca}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CATÁLOGO ── */}
        {vista === 'tienda' && (
          <div style={{ padding:'80px 10%' }}>
            <div style={{ marginBottom:'40px', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <div>
                <h2 style={{ fontFamily:'Syncopate', fontSize:'2.5rem', color: 'var(--text-h)', margin:0 }}>CATÁLOGO DE <span style={{color:'#b8860b'}}>ACTIVOS</span></h2>
                <div style={{ width:'80px', height:'4px', background:'#b8860b', marginTop:'15px' }}></div>
              </div>
              <div style={{ display:'flex', gap:'10px' }}>
                <button onClick={() => setVistaGrid(true)} style={{ padding:'8px 14px', borderRadius:'8px', border:`2px solid ${vistaGrid ? '#b8860b' : '#e5e7eb'}`, background: vistaGrid ? '#b8860b' : 'none', color: vistaGrid ? '#fff' : '#6b7280', cursor:'pointer' }}>⋲</button>
                <button onClick={() => setVistaGrid(false)} style={{ padding:'8px 14px', borderRadius:'8px', border:`2px solid ${!vistaGrid ? '#b8860b' : '#e5e7eb'}`, background: !vistaGrid ? '#b8860b' : 'none', color: !vistaGrid ? '#fff' : '#6b7280', cursor:'pointer' }}>☰</button>
              </div>
            </div>
            <div style={{ marginBottom:'30px', display:'flex', gap:'15px', flexWrap:'wrap' }}>
              <input type="text" placeholder="¿Qué potencia necesitas hoy?..." style={{ flex:2, minWidth:'200px', margin:0, background: 'var(--bg-section-1)', color: darkMode ? '#fff' : '#000', padding:'15px', borderRadius:'14px', border:'2px solid #e5e7eb' }} onChange={e => setSearchTerm(e.target.value)} />
              <select style={{ flex:1, minWidth:'140px', padding:'15px', borderRadius:'14px', border:'2px solid #e5e7eb', fontFamily:'Outfit' }} onChange={e => setFiltroCat(e.target.value)}>
                <option value="Todos">Todas las Categorías</option>
                <option value="Portátiles">Portátiles</option>
                <option value="Móviles">Móviles</option>
                <option value="Consolas">Consolas</option>
              </select>
              <input type="number" placeholder="Precio máx..." style={{ flex:1, minWidth:'120px', margin:0, padding:'15px', borderRadius:'14px', border:'2px solid #e5e7eb', fontFamily:'Outfit' }} onChange={e => setFiltroPrecioMax(e.target.value)} />
              <select style={{ flex:1, minWidth:'140px', padding:'15px', borderRadius:'14px', border:'2px solid #e5e7eb', fontFamily:'Outfit' }} onChange={e => setOrdenPrecio(e.target.value)}>
                <option value="">Ordenar por precio</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
              </select>
              {(usuarioActual?.rol === 'MASTER' || usuarioActual?.rol === 'ADMIN' || usuarioActual?.rol === 'master' || usuarioActual?.rol === 'admin') && (
                <button className="btn-oro" style={{ padding:'15px 20px', fontSize:'0.75rem', whiteSpace:'nowrap' }} onClick={agregarProducto}>+ PRODUCTO</button>
              )}
              <button onClick={fetchProductos} style={{ padding:'15px', borderRadius:'14px', border:'1px solid #e5e7eb', background:'none', cursor:'pointer', fontSize:'1rem' }} title="Recargar inventario">🔄</button>
            </div>

            {loadingProductos && <p style={{ textAlign:'center', color:'#9ca3af', padding:'40px' }}>⏳ Cargando inventario desde el servidor...</p>}
            {apiError && <div style={{ padding:'15px 20px', background:'#fff5f5', border:'1px solid #feb2b2', borderRadius:'10px', color:'#c53030', marginBottom:'20px' }}>⚠️ {apiError} — <button onClick={fetchProductos} style={{ background:'none', border:'none', color:'#b8860b', cursor:'pointer', fontWeight:'700' }}>Reintentar</button></div>}

            {/* MODAL ZOOM */}
            {productoZoom && (
              <div onClick={() => setProductoZoom(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', cursor:'zoom-out' }}>
                <img src={productoZoom.imagen || productoZoom.img} alt={productoZoom.nombre} style={{ maxWidth:'80vw', maxHeight:'80vh', objectFit:'contain', borderRadius:'12px' }} />
              </div>
            )}

            {/* COMPARAR */}
            {comparar.length > 0 && (
              <div style={{ marginBottom:'30px', padding:'20px 30px', background: darkMode ? '#1e293b' : '#fef3c7', borderRadius:'12px', border:'1px solid #b8860b', display:'flex', gap:'20px', alignItems:'center', flexWrap:'wrap' }}>
                <span style={{ fontFamily:'Syncopate', fontSize:'0.7rem', color:'#b8860b', fontWeight:'900' }}>COMPARANDO:</span>
                {comparar.map(p => (
                  <span key={p._id} style={{ background:'#b8860b', color:'#fff', padding:'4px 12px', borderRadius:'20px', fontSize:'0.75rem', fontWeight:'700' }}>
                    {p.nombre.split(' ').slice(0,2).join(' ')}
                    <span onClick={() => toggleComparar(p)} style={{ marginLeft:'8px', cursor:'pointer', fontWeight:'900' }}>×</span>
                  </span>
                ))}
                <button onClick={() => setComparar([])} style={{ padding:'8px 12px', fontSize:'0.7rem', borderRadius:'8px', border:'1px solid #ef4444', background:'none', color:'#ef4444', cursor:'pointer', marginLeft:'auto' }}>LIMPIAR</button>
              </div>
            )}

            {/* GRID DE PRODUCTOS */}
            {!loadingProductos && (vistaGrid ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'40px' }}>
                {productosFiltrados.length > 0 ? productosFiltrados.map(p => {
                  const stockActual = stockProductos[p._id] ?? p.stock;
                  const esFavorito = favoritos.includes(p._id);
                  const enComparar = comparar.find(x => x._id === p._id);
                  const stars = calificaciones[p._id] || 0;
                  const cant = cantidades[p._id] || 1;
                  const esAdmin = ['MASTER','ADMIN','master','admin'].includes(usuarioActual?.rol);
                  return (
                    <div key={p._id} className="glass-card" style={{ padding:'35px', textAlign:'center', background: 'var(--bg-card)', position:'relative', border: enComparar ? '2px solid #b8860b' : '1px solid transparent' }}>
                      <div style={{ position:'absolute', top:'15px', left:'15px', display:'flex', gap:'5px', flexDirection:'column' }}>
                        {stockActual <= 3 && <span style={{ background:'#ef4444', color:'#fff', padding:'3px 8px', borderRadius:'20px', fontSize:'0.6rem', fontWeight:'900' }}>¡Últimas {stockActual}!</span>}
                        {stockActual > 10 && <span style={{ background:'#10b981', color:'#fff', padding:'3px 8px', borderRadius:'20px', fontSize:'0.6rem', fontWeight:'900' }}>DISPONIBLE</span>}
                      </div>
                      <button onClick={() => toggleFavorito(p._id)} style={{ position:'absolute', top:'15px', right:'15px', background:'none', border:'none', cursor:'pointer', fontSize:'1.3rem' }}>{esFavorito ? '❤️' : '🧡'}</button>
                      <img src={p.imagen || p.img} alt={p.nombre} onClick={() => { setProductoZoom(p); registrarVisita(p._id); }} style={{ width:'100%', height:'200px', objectFit:'contain', marginBottom:'15px', borderRadius:'12px', cursor:'zoom-in' }} />
                      <div style={{ fontSize:'0.65rem', color:'#9ca3af', marginBottom:'5px' }}>👁️ {visitas[p._id] || 0} personas vieron esto</div>
                      <h3 style={{ fontSize:'1.3rem', color: 'var(--text-h)', fontWeight:'800', marginBottom:'10px' }}>{p.nombre}</h3>
                      <div style={{ marginBottom:'10px' }}>
                        {[1,2,3,4,5].map(s => <span key={s} onClick={() => calificar(p._id, s)} style={{ cursor:'pointer', fontSize:'1rem', color: s <= stars ? '#f59e0b' : '#e5e7eb' }}>★</span>)}
                      </div>
                      <p style={{ color:'#6b7280', fontSize:'0.85rem', margin:'10px 0', lineHeight:'1.5' }}>{p.detalles || p.descripcion || ''}</p>
                      <div style={{ fontSize:'0.7rem', color: stockActual < 5 ? '#ef4444' : '#9ca3af', marginBottom:'10px', fontWeight:'700' }}>📦 {stockActual} unidades disponibles</div>
                      {esAdmin && (
                        <div style={{ display:'flex', gap:'6px', marginBottom:'12px', justifyContent:'center' }}>
                          <button onClick={() => { setProductoEditando({...p}); setMostrarModalProducto(true); }} style={{ padding:'5px 10px', fontSize:'0.6rem', borderRadius:'6px', border:'1px solid #b8860b', background:'none', color:'#b8860b', cursor:'pointer' }}>✏️ EDITAR</button>
                          <button onClick={() => eliminarProducto(p._id)} style={{ padding:'5px 10px', fontSize:'0.6rem', borderRadius:'6px', border:'1px solid #ef4444', background:'none', color:'#ef4444', cursor:'pointer' }}>🗑️ ELIMINAR</button>
                          <button onClick={() => toggleComparar(p)} style={{ padding:'5px 10px', fontSize:'0.6rem', borderRadius:'6px', border:`1px solid ${enComparar ? '#b8860b' : '#6b7280'}`, background: enComparar ? '#b8860b' : 'none', color: enComparar ? '#fff' : '#6b7280', cursor:'pointer' }}>{enComparar ? '✓ COMP.' : 'COMPARAR'}</button>
                        </div>
                      )}
                      <div style={{ borderTop:`1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#f3f4f6'}`, paddingTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div style={{ textAlign:'left' }}>
                          <span style={{ display:'block', fontSize:'0.65rem', color:'#9ca3af', fontWeight:'800' }}>PRECIO NETO</span>
                          <span style={{ fontSize:'1.5rem', fontWeight:'900', color: 'var(--text-h)' }}>${p.precio.toLocaleString()}</span>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:'6px', alignItems:'flex-end' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                            <button onClick={() => setCantidad(p._id, cant - 1)} style={{ width:'24px', height:'24px', borderRadius:'50%', border:'1px solid #e5e7eb', background:'none', cursor:'pointer', fontWeight:'900' }}>-</button>
                            <span style={{ minWidth:'20px', textAlign:'center', fontWeight:'800' }}>{cant}</span>
                            <button onClick={() => setCantidad(p._id, cant + 1)} style={{ width:'24px', height:'24px', borderRadius:'50%', border:'1px solid #e5e7eb', background:'none', cursor:'pointer', fontWeight:'900' }}>+</button>
                          </div>
                          <button className="btn-oro" style={{ padding:'10px 20px', fontSize:'0.75rem' }} onClick={() => añadirAlCarritoConCantidad(p)} disabled={stockActual === 0}>
                            {stockActual === 0 ? 'AGOTADO' : 'ADQUIRIR'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }) : <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'50px' }}><p style={{ color:'#9ca3af' }}>No se encontraron activos que coincidan con su búsqueda.</p></div>}
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'15px' }}>
                {productosFiltrados.map(p => {
                  const stockActual = stockProductos[p._id] ?? p.stock;
                  const cant = cantidades[p._id] || 1;
                  return (
                    <div key={p._id} className="glass-card" style={{ padding:'25px 35px', display:'flex', gap:'25px', alignItems:'center', background: darkMode ? 'rgba(255,255,255,0.02)' : '#fff' }}>
                      <img src={p.imagen || p.img} alt={p.nombre} onClick={() => setProductoZoom(p)} style={{ width:'80px', height:'80px', objectFit:'contain', borderRadius:'8px', cursor:'zoom-in', flexShrink:0 }} />
                      <div style={{ flex:1 }}>
                        <h3 style={{ margin:0, fontSize:'1.1rem', color: 'var(--text-h)', fontWeight:'800' }}>{p.nombre}</h3>
                        <span style={{ fontSize:'0.65rem', background:'#f3f4f6', color:'#6b7280', padding:'2px 8px', borderRadius:'20px' }}>{p.categoria || p.cat}</span>
                        <p style={{ margin:'5px 0 0', fontSize:'0.8rem', color:'#6b7280' }}>{p.detalles || ''}</p>
                      </div>
                      <div style={{ textAlign:'right', flexShrink:0 }}>
                        <div style={{ fontSize:'1.4rem', fontWeight:'900', color: 'var(--text-h)', marginBottom:'5px' }}>${p.precio.toLocaleString()}</div>
                        <div style={{ fontSize:'0.7rem', color:'#9ca3af', marginBottom:'8px' }}>📦 {stockActual} uds.</div>
                        <div style={{ display:'flex', gap:'8px', justifyContent:'flex-end', alignItems:'center' }}>
                          <button onClick={() => toggleFavorito(p._id)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'1.1rem' }}>{favoritos.includes(p._id) ? '❤️' : '🧡'}</button>
                          <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
                            <button onClick={() => setCantidad(p._id, cant - 1)} style={{ width:'22px', height:'22px', borderRadius:'50%', border:'1px solid #e5e7eb', background:'none', cursor:'pointer', fontWeight:'900', fontSize:'0.8rem' }}>-</button>
                            <span style={{ minWidth:'18px', textAlign:'center', fontWeight:'800', fontSize:'0.85rem' }}>{cant}</span>
                            <button onClick={() => setCantidad(p._id, cant + 1)} style={{ width:'22px', height:'22px', borderRadius:'50%', border:'1px solid #e5e7eb', background:'none', cursor:'pointer', fontWeight:'900', fontSize:'0.8rem' }}>+</button>
                          </div>
                          <button className="btn-oro" style={{ padding:'8px 16px', fontSize:'0.7rem' }} onClick={() => añadirAlCarritoConCantidad(p)}>ADQUIRIR</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* ── FORMULARIO DE ACCESO ── */}
        {(vista === 'empleado' || vista === 'admin') && (
          <div style={{ maxWidth:'500px', margin:'100px auto', padding:'70px', background:'var(--bg-card)' }} className="glass-card">
            {/* Ícono y rol */}
            <div style={{ textAlign:'center', marginBottom:'20px' }}>
              <div style={{ fontSize:'3.5rem', marginBottom:'10px' }}>
                {vista === 'empleado' ? '👷' : '👔'}
              </div>
              <div style={{ display:'inline-block', padding:'5px 18px', borderRadius:'20px', fontSize:'0.7rem', fontWeight:'900', fontFamily:'Syncopate', letterSpacing:'2px',
                background: vista === 'empleado' ? 'rgba(0,102,255,0.1)' : 'rgba(212,175,55,0.12)',
                color: vista === 'empleado' ? '#0055dd' : '#b8860b',
                border: `1px solid ${vista === 'empleado' ? 'rgba(0,102,255,0.25)' : 'rgba(212,175,55,0.3)'}`,
              }}>
                {vista === 'empleado' ? '🔵 EMPLEADO LOGÍSTICA' : '🔑 ADMINISTRADOR'}
              </div>
            </div>

            <h2 style={{ fontFamily:'Syncopate', textAlign:'center', color: vista === 'empleado' ? '#0055dd' : '#b8860b', fontSize:'1.4rem', marginBottom:'5px' }}>
              {vista === 'empleado' ? 'ACCESO LOGÍSTICA' : 'ACCESO ADMIN'}
            </h2>
            <p style={{ textAlign:'center', color:'#10b981', fontSize:'0.8rem', marginBottom:'5px', fontWeight:'700' }}>{saludo()}, bienvenido de vuelta</p>
            <p style={{ textAlign:'center', color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:'35px' }}>
              {vista === 'empleado'
                ? 'Portal de Operaciones Logísticas — Bodega LOJJIC-J'
                : 'Portal de Seguridad Corporativa — Panel Administrativo'}
            </p>
            <form onSubmit={manejarLogin}>
              {!esperandoMFA ? (
                <>
                  {isRegistering && (
                    <div style={{ marginBottom:'5px' }}>
                      <label style={{ fontSize:'0.75rem', fontWeight:'800', color:'#4b5563', marginLeft:'5px' }}>{LABELS.nombreCompleto}</label>
                      <input type="text" placeholder="Juan Pérez" style={{ width:'100%', padding:'15px', borderRadius:'10px', border:'2px solid #e5e7eb', marginTop:'5px' }} required onChange={e => setNombreRegistro(e.target.value)} />
                    </div>
                  )}
                  <div style={{ marginBottom:'5px' }}>
                    <label style={{ fontSize:'0.75rem', fontWeight:'800', color:'#4b5563', marginLeft:'5px' }}>{LABELS.identificador}</label>
                    <input type="email" placeholder="correo@ejemplo.com" style={{ width:'100%', padding:'15px', borderRadius:'10px', border:'2px solid #e5e7eb', marginTop:'5px' }} required onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:'10px' }}>
                    <label style={{ fontSize:'0.75rem', fontWeight:'800', color:'#4b5563', marginLeft:'5px' }}>{LABELS.tokenSeguridad}</label>
                    <input type="password" placeholder="••••••••••••" style={{ width:'100%', padding:'15px', borderRadius:'10px', border:'2px solid #e5e7eb', marginTop:'5px' }} required onChange={e => setPass(e.target.value)} />
                  </div>
                </>
              ) : (
                <div style={{ marginBottom:'10px' }}>
                  <label style={{ fontSize:'0.75rem', fontWeight:'800', color:'#b8860b', marginLeft:'5px' }}>{LABELS.codigoMFA}</label>
                  <input type="text" placeholder="Ingrese el código de 6 dígitos" style={{ width:'100%', padding:'15px', borderRadius:'10px', border:'2px solid #b8860b', marginTop:'5px' }} maxLength="6" required onChange={e => setMfaToken(e.target.value)} />
                </div>
              )}
              <button type="submit" className="btn-oro" style={{ width:'100%', padding:'22px', marginTop:'15px', fontSize:'1rem',
                background: vista === 'empleado' ? 'linear-gradient(135deg,#38bdf8,#0066ff,#004dd9)' : undefined
              }} disabled={bloqueado}>
                {bloqueado ? 'ACCESO RESTRINGIDO' : esperandoMFA ? 'VERIFICAR IDENTIDAD' : isRegistering ? 'CREAR CUENTA' : vista === 'empleado' ? 'ENTRAR A LOGÍSTICA' : 'ACCEDER AL NÚCLEO'}
              </button>
              <p style={{ textAlign:'center', marginTop:'20px', fontSize:'0.8rem' }}>
                <span onClick={() => setIsRegistering(!isRegistering)} style={{ cursor:'pointer', color:'#b8860b', fontWeight:'bold', marginRight:'15px' }}>
                  {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </span>
                {!isRegistering && <span onClick={manejarRecuperacion} style={{ cursor:'pointer', color:'#6b7280', textDecoration:'underline' }}>¿Olvidaste tu contraseña?</span>}
              </p>
            </form>
          </div>
        )}


        {/* ── CHECKOUT ── */}
        {vista === 'checkout' && (
          <div style={{ padding:'80px 10%' }}>
            <Checkout carrito={carrito} total={totalCalculado} onFinalizar={(datosEnvio) => procesarSalidaActivos(datosEnvio)} />
            <button className="nav-item" style={{ marginTop:'20px', border:'none', background:'none' }} onClick={() => cambiarVista('tienda')}>← Volver al catálogo</button>
          </div>
        )}

        {/* ── VISTA MASTER ── */}
        {vista === 'master' && (
          <div style={{ padding:'80px 10%' }}>
            <div style={{ marginBottom:'40px', display:'flex', alignItems:'center', gap:'20px' }}>
              <div style={{ background:'linear-gradient(135deg, #b8860b, #ffd700)', padding:'10px 20px', borderRadius:'8px' }}>
                <span style={{ fontFamily:'Syncopate', color:'#000', fontWeight:'900', fontSize:'0.8rem' }}>🗝️ LLAVE MAESTRA</span>
              </div>
              <h2 style={{ fontFamily:'Syncopate', color: 'var(--text-h)', margin:0 }}>ACCESO <span style={{ color:'#b8860b' }}>TOTAL</span></h2>
            </div>
            <div style={{ display:'flex', gap:'15px', marginBottom:'40px', flexWrap:'wrap' }}>
              <button className="btn-oro" style={{ padding:'12px 25px', fontSize:'0.8rem' }} onClick={() => { setNuevasOrdenes(0); cambiarVista('panel-admin'); }}>IR A PANEL ADMIN</button>
              <button className="btn-oro" style={{ padding:'12px 25px', fontSize:'0.8rem', background:'#1e293b' }} onClick={() => cambiarVista('panel-empleado')}>IR A PANEL EMPLEADO</button>
              <button className="btn-oro" style={{ padding:'12px 25px', fontSize:'0.8rem', background:'#065f46' }} onClick={() => cambiarVista('tienda')}>IR AL CATÁLOGO</button>
              <button style={{ padding:'12px 25px', fontSize:'0.8rem', borderRadius:'8px', border:'1px solid #ef4444', background:'none', color:'#ef4444', cursor:'pointer', fontFamily:'Syncopate' }} onClick={cerrarSesion}>CERRAR SESIÓN</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'25px', marginBottom:'40px' }}>
              {[
                { label:'Órdenes Pendientes', valor: ordenesAdmin.filter(o => !o.empleadoAsignado).length, color:'#ef4444', icon:'📦' },
                { label:'Órdenes Asignadas', valor: ordenesAdmin.filter(o => o.empleadoAsignado).length, color:'#10b981', icon:'✅' },
                { label:'Personal en Turno', valor: usuariosActivos, color:'#b8860b', icon:'👥' },
                { label:'Incidencias Activas', valor: incidencias.length, color:'#f59e0b', icon:'⚠️' },
              ].map(stat => (
                <div key={stat.label} className="glass-card" style={{ padding:'30px', background: 'var(--bg-card)' }}>
                  <div style={{ fontSize:'2rem', marginBottom:'10px' }}>{stat.icon}</div>
                  <div style={{ fontSize:'0.7rem', color:'#9ca3af', fontWeight:'800', letterSpacing:'1px' }}>{stat.label}</div>
                  <div style={{ fontSize:'2.5rem', fontWeight:'900', color:stat.color, marginTop:'8px' }}>{stat.valor}</div>
                </div>
              ))}
            </div>
            <div className="glass-card" style={{ padding:'40px', background: 'var(--bg-card)' }}>
              <span className="stat-badge">GRÁFICA DE VENTAS</span>
              <div style={{ marginTop:'20px', height:'200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datosGrafica}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#f3f4f6'} />
                    <XAxis dataKey="name" tick={{ fontSize:10, fill:'#9ca3af' }} />
                    <YAxis tick={{ fontSize:10, fill:'#9ca3af' }} tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} />
                    <Tooltip formatter={v => [`$${v.toLocaleString()}`, 'Valor']} />
                    <Bar dataKey="valor" fill="#b8860b" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GESTIÓN DE USUARIOS (NUEVO) */}
            <div className="glass-card" style={{ padding:'40px', marginTop:'30px', background: 'var(--bg-card)' }}>
              <span className="stat-badge">CONTROL DE ACCESO Y USUARIOS</span>
              <div style={{ marginTop:'20px', overflowX:'auto' }}>
                {loadingUsuarios ? <p>Cargando usuarios...</p> : (
                  <table style={{ width:'100%', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ color:'#b8860b', fontSize:'0.7rem', fontFamily:'Syncopate', borderBottom:'2px solid #f3f4f6' }}>
                        <th style={{ padding:'10px', textAlign:'left' }}>NOMBRE</th>
                        <th style={{ textAlign:'left' }}>EMAIL</th>
                        <th style={{ textAlign:'left' }}>ROL</th>
                        <th style={{ textAlign:'left' }}>ESTADO</th>
                        <th style={{ textAlign:'left' }}>ACCIÓN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosSistema.map(u => (
                        <tr key={u._id} style={{ borderBottom:'1px solid #f3f4f6', fontSize:'0.85rem' }}>
                          <td style={{ padding:'12px', fontWeight:'700' }}>{u.nombre}</td>
                          <td style={{ color:'#6b7280' }}>{u.email}</td>
                          <td><span style={{ fontSize:'0.7rem', fontWeight:'900' }}>{u.rol}</span></td>
                          <td>
                            <span style={{ 
                              padding:'3px 10px', borderRadius:'20px', fontSize:'0.65rem', fontWeight:'900',
                              background: u.activo ? '#d1fae5' : '#fee2e2',
                              color: u.activo ? '#065f46' : '#991b1b'
                            }}>
                              {u.activo ? 'ACTIVO' : 'PENDIENTE'}
                            </span>
                          </td>
                          <td>
                            <button 
                              onClick={() => toggleAutorizacionUsuario(u._id, u.activo)}
                              style={{ padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'0.7rem', fontWeight:'bold', border:'none', background: u.activo ? '#ef4444' : '#10b981', color:'#fff' }}
                            >
                              {u.activo ? 'DESACTIVAR' : 'AUTORIZAR'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── PANEL ADMIN ── */}
        {vista === 'panel-admin' && (
          <div style={{ padding:'80px 10%' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'50px' }}>
              <h2 style={{ fontFamily:'Syncopate', color: 'var(--text-h)', margin:0 }}>CONSOLA <span style={{color:'#b8860b'}}>ADMIN</span></h2>
              <div style={{ color:'#6b7280', fontWeight:'600' }}>
                <span style={{ background:'#10b981', color:'#fff', padding:'4px 10px', borderRadius:'4px', fontSize:'0.7rem', marginRight:'10px' }}>🔒 SSL/TLS 1.3</span>
                Sesión: <span style={{color:'#b8860b'}}>{usuarioActual?.nombre}</span> | {contadorNoLeidas > 0 && <span style={{color:'#ff4d4d', fontWeight:'bold'}}>📢 {contadorNoLeidas} notif.</span>}
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'30px' }}>
              <div className="glass-card" style={{ padding:'40px', background: 'var(--bg-card)' }}>
                <span className="stat-badge">MÉTRICAS DE VENTA</span>
                <h4 style={{margin:'25px 0 10px 0', color:'#6b7280', fontWeight:'500'}}>Ventas Consolidadas</h4>
                <h2 style={{margin:0, fontSize:'2.8rem', fontWeight:'900', color: 'var(--text-h)'}}>${ordenesAdmin.reduce((a,o) => a + (o.valor_declarado||0), 0).toLocaleString()}</h2>
                <div style={{ marginTop:'20px', color:'#10b981', fontWeight:'700' }}>↑ {ordenesAdmin.length} órdenes totales</div>
              </div>
              <div className="glass-card" style={{ padding:'40px', background: 'var(--bg-card)' }}>
                <span className="stat-badge">RECURSOS HUMANOS</span>
                <h4 style={{margin:'25px 0 10px 0', color:'#6b7280', fontWeight:'500'}}>Personal en Turno</h4>
                <h2 style={{margin:0, fontSize:'2.8rem', fontWeight:'900', color: 'var(--text-h)'}}>{usuariosActivos < 10 ? `0${usuariosActivos}` : usuariosActivos}</h2>
                <div style={{ marginTop:'20px', display:'flex', gap:'10px' }}>
                  <button onClick={() => setUsuariosActivos(prev => prev + 1)} style={{padding:'5px 10px', cursor:'pointer', borderRadius:'5px', border:'1px solid #b8860b', background:'none', color:'#b8860b'}}>+ Alta</button>
                  <button onClick={() => setUsuariosActivos(prev => Math.max(0, prev - 1))} style={{padding:'5px 10px', cursor:'pointer', borderRadius:'5px', border:'1px solid #ff4d4d', background:'none', color:'#ff4d4d'}}>- Baja</button>
                </div>
              </div>
              <div className="glass-card" style={{ padding:'40px', background: 'var(--bg-card)' }}>
                <span className="stat-badge">INFRAESTRUCTURA</span>
                <h4 style={{margin:'25px 0 10px 0', color:'#6b7280', fontWeight:'500'}}>Integridad del Sistema</h4>
                <h2 style={{margin:0, color:'#10b981', fontSize:'2.8rem', fontWeight:'900'}}>ÓPTIMO</h2>
                <div style={{ marginTop:'20px', color:'#6b7280' }}>Latencia: 14ms | Uptime: 99.9%</div>
              </div>
              <div className="glass-card" style={{ padding:'40px', background: 'var(--bg-card)' }}>
                <span className="stat-badge">CONTROL DE ACCESO</span>
                <h4 style={{margin:'25px 0 10px 0', color:'#6b7280', fontWeight:'500'}}>Estado del Firewall</h4>
                <h2 style={{margin:0, color:'#10b981', fontSize:'2.2rem', fontWeight:'900'}}>ACTIVO</h2>
                <button className="btn-oro" style={{ marginTop:'20px', padding:'10px', fontSize:'0.7rem', width:'100%' }} onClick={() => mostrarMensaje('SISTEMA: Reiniciando protocolos de seguridad...')}>REINICIAR FIREWALL</button>
              </div>
              <div className="glass-card" style={{ padding:'40px', gridColumn:'span 2', background: 'var(--bg-card)' }}>
                <span className="stat-badge">ÓRDENES PENDIENTES DE ASIGNACIÓN</span>
                <div style={{ marginTop:'20px', overflowX:'auto' }}>
                  {loadingOrdenes ? <p style={{ color:'#9ca3af', textAlign:'center' }}>Cargando órdenes...</p> :
                  ordenesAdmin.filter(o => !o.empleadoAsignado).length === 0 ? <p style={{ color:'#9ca3af', textAlign:'center', padding:'20px 0' }}>No hay órdenes pendientes.</p> : (
                    <table style={{ width:'100%', borderCollapse:'collapse' }}>
                      <thead>
                        <tr style={{ color:'#b8860b', fontSize:'0.7rem', fontFamily:'Syncopate', borderBottom:'2px solid #f3f4f6' }}>
                          <th style={{ padding:'10px 15px', textAlign:'left' }}>GUÍA</th>
                          <th style={{ textAlign:'left' }}>SEDE</th>
                          <th style={{ textAlign:'left' }}>VALOR</th>
                          <th style={{ textAlign:'left' }}>ASIGNAR EMPLEADO</th>
                          <th style={{ textAlign:'left' }}>ACCIÓN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordenesAdmin.filter(o => !o.empleadoAsignado).map(orden => (
                          <tr key={orden._id || orden.id_guia} style={{ borderBottom:'1px solid #f3f4f6', fontSize:'0.85rem' }}>
                            <td style={{ padding:'15px', fontWeight:'800', color:'#b8860b' }}>{orden.id_guia}</td>
                            <td style={{ color:'#6b7280' }}>{orden.sede}</td>
                            <td style={{ fontWeight:'700' }}>${orden.valor_declarado?.toLocaleString()}</td>
                            <td>
                              <select id={`emp-${orden._id || orden.id_guia}`} style={{ padding:'6px 10px', borderRadius:'6px', border:'1px solid #e5e7eb', fontFamily:'Outfit' }}>
                                <option value="">Seleccionar...</option>
                                <option value="J. Martínez">J. Martínez</option>
                                <option value="Admin_ADSO">Admin_ADSO</option>
                                <option value="Auxiliar_Log">Auxiliar_Log</option>
                              </select>
                            </td>
                            <td>
                              <button className="btn-oro" style={{ padding:'6px 14px', fontSize:'0.65rem', marginRight:'5px' }}
                                onClick={() => { const sel = document.getElementById(`emp-${orden._id || orden.id_guia}`); asignarDespacho(orden._id, sel?.value); }}>ASIGNAR</button>
                              <button onClick={() => imprimirEtiqueta(orden)} style={{ padding:'6px 10px', fontSize:'0.6rem', borderRadius:'6px', border:'1px solid #6b7280', background:'none', color:'#6b7280', cursor:'pointer', marginRight:'5px' }}>🏷️</button>
                              <button onClick={() => confirmarEntrega(orden._id)} style={{ padding:'6px 10px', fontSize:'0.6rem', borderRadius:'6px', border:'1px solid #10b981', background:'none', color:'#10b981', cursor:'pointer' }}>✓ ENTREGADO</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="glass-card" style={{ padding:'40px', gridColumn:'span 2', background: 'var(--bg-card)' }}>
                <span className="stat-badge">LOGS DE ACTIVIDAD</span>
                <div style={{ display:'flex', gap:'15px', marginTop:'20px', flexWrap:'wrap', alignItems:'center' }}>
                  <input type="text" placeholder="Buscar guía o empleado..." style={{ padding:'8px 12px', borderRadius:'8px', border:'1px solid #e5e7eb', fontFamily:'Outfit', fontSize:'0.8rem', flex:1 }} onChange={e => setBusquedaOrden(e.target.value)} />
                  <select onChange={e => setOrdenFiltro(e.target.value)} style={{ padding:'8px 12px', borderRadius:'8px', border:'1px solid #e5e7eb', fontFamily:'Outfit', fontSize:'0.8rem' }}>
                    <option value="todos">Todas las órdenes</option>
                    <option value="pendientes">Solo pendientes</option>
                    <option value="asignadas">Solo asignadas</option>
                  </select>
                  <button className="btn-oro" style={{ padding:'10px 20px', fontSize:'0.7rem' }} onClick={generarPDFAuditoria}>EXPORTAR AUDITORÍA</button>
                  <button className="btn-oro" style={{ padding:'10px 20px', fontSize:'0.7rem', background:'#065f46' }} onClick={performInventorySync}>HANDSHAKE COMPASS</button>
                </div>
                <div style={{ marginTop:'15px', maxHeight:'200px', overflowY:'auto' }}>
                  {ordenesFiltradas.length === 0 ? <p style={{ color:'#9ca3af', textAlign:'center' }}>Sin órdenes.</p> : ordenesFiltradas.map((o,i) => (
                    <div key={i} style={{ padding:'10px 0', borderBottom:'1px solid #f3f4f6', display:'flex', gap:'15px', fontSize:'0.85rem', alignItems:'center' }}>
                      <span style={{ color:'#b8860b', fontWeight:'800', minWidth:'110px' }}>{o.id_guia}</span>
                      <span style={{ color: 'var(--text-body)', flex:1 }}>{o.createdAt ? new Date(o.createdAt).toLocaleString() : ''}</span>
                      <span style={{ background: o.empleadoAsignado ? '#d1fae5' : '#fef3c7', color: o.empleadoAsignado ? '#065f46' : '#92400e', padding:'2px 8px', borderRadius:'20px', fontSize:'0.65rem', fontWeight:'800' }}>{o.empleadoAsignado ? `✓ ${o.empleadoAsignado}` : 'PENDIENTE'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GESTIÓN DE USUARIOS (NUEVO - Agregado al panel ADMIN) */}
              <div className="glass-card" style={{ padding:'40px', gridColumn:'span 2', background: 'var(--bg-card)', marginTop:'20px' }}>
                <span className="stat-badge">CONTROL DE ACCESO Y USUARIOS</span>
                <div style={{ marginTop:'20px', overflowX:'auto' }}>
                  {loadingUsuarios ? <p style={{ color:'#9ca3af' }}>Cargando usuarios...</p> : (
                    <table style={{ width:'100%', borderCollapse:'collapse' }}>
                      <thead>
                        <tr style={{ color:'#b8860b', fontSize:'0.7rem', fontFamily:'Syncopate', borderBottom:'2px solid #f3f4f6' }}>
                          <th style={{ padding:'10px', textAlign:'left' }}>NOMBRE</th>
                          <th style={{ textAlign:'left' }}>EMAIL</th>
                          <th style={{ textAlign:'left' }}>ROL</th>
                          <th style={{ textAlign:'left' }}>ESTADO</th>
                          <th style={{ textAlign:'left' }}>ACCIÓN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuariosSistema.map(u => (
                          <tr key={u._id} style={{ borderBottom:'1px solid #f3f4f6', fontSize:'0.85rem' }}>
                            <td style={{ padding:'12px', fontWeight:'700', color: 'var(--text-h)' }}>{u.nombre}</td>
                            <td style={{ color:'#6b7280' }}>{u.email}</td>
                            <td><span style={{ fontSize:'0.7rem', fontWeight:'900', color: 'var(--text-h)' }}>{u.rol}</span></td>
                            <td>
                              <span style={{ 
                                padding:'3px 10px', borderRadius:'20px', fontSize:'0.65rem', fontWeight:'900',
                                background: u.activo ? '#d1fae5' : '#fee2e2',
                                color: u.activo ? '#065f46' : '#991b1b'
                              }}>
                                {u.activo ? 'ACTIVO' : 'PENDIENTE'}
                              </span>
                            </td>
                            <td>
                              <button 
                                onClick={() => toggleAutorizacionUsuario(u._id, u.activo)}
                                style={{ padding:'6px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'0.7rem', fontWeight:'bold', border:'none', background: u.activo ? '#ef4444' : '#10b981', color:'#fff' }}
                              >
                                {u.activo ? 'DESACTIVAR' : 'AUTORIZAR'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PANEL EMPLEADO ── */}
        {vista === 'panel-empleado' && (
          <div style={{ padding:'80px 10%' }}>
            {/* MODAL DE FIRMA DIGITAL */}
            {ordenParaFirmar && (
              <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:10000, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div className="glass-card" style={{ padding:'40px', width:'400px', textAlign:'center', background:'#fff' }}>
                  <h3 style={{ fontFamily:'Syncopate', fontSize:'0.9rem', color:'#b8860b' }}>PRUEBA DE ENTREGA</h3>
                  <p style={{ fontSize:'0.8rem', color:'#6b7280' }}>Guía: <strong>{ordenParaFirmar.id_guia}</strong></p>
                  <div 
                    style={{ height:'150px', border:'2px dashed #b8860b', margin:'20px 0', borderRadius:'10px', background:'#f9fafb', display:'flex', alignItems:'center', justifyContent:'center', cursor:'crosshair', position:'relative' }}
                    onClick={() => () => {}}
                  >
                    {!firmaDibujada ? <span style={{ color:'#9ca3af', fontSize:'0.7rem' }}>CLIC AQUÍ PARA FIRMAR</span> : <span style={{ fontFamily:'Dancing Script, cursive', fontSize:'2rem', color:'#111' }}>{ordenParaFirmar.destinatario?.nombre}</span>}
                  </div>
                  <div style={{ display:'flex', gap:'10px' }}>
                    <button className="btn-oro" style={{ flex:1, padding:'12px' }} onClick={confirmarEntregaConFirma}>FINALIZAR</button>
                    <button style={{ flex:1, border:'1px solid #ddd', background:'none', borderRadius:'8px', cursor:'pointer' }} onClick={() => setOrdenParaFirmar(null)}>CANCELAR</button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'50px' }}>
              <h2 style={{ fontFamily:'Syncopate', color: 'var(--text-h)', margin:0 }}>OPERACIONES <span style={{color:'#b8860b'}}>LOGÍSTICAS</span></h2>
              <div style={{ display:'flex', gap:'15px', alignItems:'center' }}>
                <div style={{ background: darkMode ? '#1e293b' : '#fef3c7', border:'1px solid #b8860b', borderRadius:'10px', padding:'10px 20px', textAlign:'center' }}>
                  <div style={{ fontSize:'0.6rem', color:'#9ca3af', fontWeight:'800' }}>ENTREGAS HOY</div>
                  <div style={{ fontSize:'1.2rem', fontWeight:'900', color:'#b8860b' }}>{ordenesEntregadas}</div>
                </div>
              </div>
            </div>

            {/* DASHBOARD DE PRODUCTIVIDAD */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px', marginBottom:'30px' }}>
              <div className="glass-card" style={{ padding:'20px', textAlign:'center', borderLeft:'5px solid #b8860b' }}>
                <div style={{ fontSize:'0.65rem', fontWeight:'900', color:'#9ca3af' }}>EFICIENCIA</div>
                <div style={{ fontSize:'1.5rem', fontWeight:'900', color:'var(--text-h)' }}>{misOrdenesAsignadas.length > 0 ? Math.round((ordenesEntregadas/misOrdenesAsignadas.length)*100) : 0}%</div>
              </div>
              <div className="glass-card" style={{ padding:'20px', textAlign:'center', borderLeft:'5px solid #10b981' }}>
                <div style={{ fontSize:'0.65rem', fontWeight:'900', color:'#9ca3af' }}>CALIDAD (PUNTOS)</div>
                <div style={{ fontSize:'1.5rem', fontWeight:'900', color:'#10b981' }}>95/100</div>
              </div>
              <div className="glass-card" style={{ padding:'20px', textAlign:'center', borderLeft:'5px solid #3b82f6' }}>
                <div style={{ fontSize:'0.65rem', fontWeight:'900', color:'#9ca3af' }}>TIEMPO TURNO</div>
                <div style={{ fontSize:'1.5rem', fontWeight:'900', color:'#3b82f6' }}>{formatTurno(tiempoTurno)}</div>
              </div>
            </div>

            {/* ACCIONES RÁPIDAS */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'20px', marginBottom:'40px' }}>
              <div className="glass-card" style={{ padding:'25px', textAlign:'center', cursor:'pointer' }} onClick={() => mostrarMensaje('SISTEMA: Escáner de radiofrecuencia activado...')}>
                <div style={{ fontSize:'2rem' }}>📡</div><h4 style={{ margin:'10px 0', fontSize:'0.85rem' }}>Sincronizar Handheld</h4>
              </div>
              <div className="glass-card" style={{ padding:'25px', textAlign:'center', cursor:'pointer' }} onClick={reportarIncidencia}>
                <div style={{ fontSize:'2rem' }}>⚠️</div><h4 style={{ margin:'10px 0', fontSize:'0.85rem' }}>Reportar Novedad</h4>
              </div>
              <div className="glass-card" style={{ padding:'25px', textAlign:'center', cursor:'pointer' }} onClick={() => mostrarMensaje(DATABASE_LOGYTECH.sedes.map(s => `${s.nombre}: ${s.capacidad}`).join(' | '))}>
                <div style={{ fontSize:'2rem' }}>🏗️</div><h4 style={{ margin:'10px 0', fontSize:'0.85rem' }}>Estado de Bodega</h4>
              </div>
              <div className="glass-card" style={{ padding:'25px', textAlign:'center', cursor:'pointer' }} onClick={exportarInventarioPDF}>
                <div style={{ fontSize:'2rem' }}>📄</div><h4 style={{ margin:'10px 0', fontSize:'0.85rem' }}>Descargar Reporte</h4>
              </div>
            </div>

            {/* MIS ÓRDENES ASIGNADAS */}
            {misOrdenesAsignadas.length > 0 && (
              <div className="glass-card" style={{ padding:'40px', marginBottom:'30px', background: 'var(--bg-card)' }}>
                <h3 style={{ margin:'0 0 20px 0', color: 'var(--text-h)', fontSize:'1.2rem' }}>Mis Órdenes Asignadas</h3>
                {misOrdenesAsignadas.map(o => (
                  <div key={o._id || o.id_guia} style={{ padding:'15px', borderRadius:'10px', border:`1px solid ${o.estado === 'ENTREGADO' ? '#10b981' : '#e5e7eb'}`, marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', background: o.estado === 'ENTREGADO' ? '#f0fdf4' : 'transparent' }}>
                    <div>
                      <div style={{ fontWeight:'800', color:'#b8860b' }}>{o.id_guia}</div>
                      <div style={{ fontSize:'0.8rem', color:'#6b7280' }}>{o.createdAt ? new Date(o.createdAt).toLocaleString() : ''} • {o.sede}</div>
                      <div style={{ fontSize:'0.8rem', fontWeight:'700', color: 'var(--text-h)' }}>${o.valor_declarado?.toLocaleString()}</div>
                    </div>
                    <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                      {o.estado === 'ENTREGADO' ? (
                        <span style={{ background:'#d1fae5', color:'#065f46', padding:'4px 12px', borderRadius:'20px', fontSize:'0.7rem', fontWeight:'800' }}>✓ ENTREGADO</span>
                      ) : (
                        <>
                          <button onClick={() => imprimirEtiqueta(o)} style={{ padding:'6px 10px', fontSize:'0.65rem', borderRadius:'6px', border:'1px solid #6b7280', background:'none', color:'#6b7280', cursor:'pointer' }}>🏷️ Etiqueta</button>
                        <button onClick={() => abrirModalFirma(o)} style={{ padding:'6px 12px', fontSize:'0.65rem', borderRadius:'6px', border:'1px solid #10b981', background:'none', color:'#10b981', cursor:'pointer', fontWeight:'800' }}>✓ ENTREGAR</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* BODEGAS */}            <div className="glass-card" style={{ padding:'30px', marginBottom:'30px', background: 'var(--bg-card)' }}>
              <h3 style={{ margin:'0 0 20px 0', color: 'var(--text-h)', fontSize:'1rem', fontFamily:'Syncopate' }}>ESTADO DE BODEGAS</h3>
              {DATABASE_LOGYTECH.sedes.map(s => {
                const pct = parseInt(s.capacidad);
                return (
                  <div key={s.id} style={{ marginBottom:'15px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                      <span style={{ fontSize:'0.8rem', fontWeight:'700', color: 'var(--text-h)' }}>{s.nombre}</span>
                      <span style={{ fontSize:'0.8rem', color: pct > 70 ? '#ef4444' : '#10b981', fontWeight:'800' }}>{s.capacidad}</span>
                    </div>
                    <div style={{ background: darkMode ? '#334155' : '#f3f4f6', borderRadius:'20px', height:'8px' }}>
                      <div style={{ width:`${pct}%`, background: pct > 70 ? '#ef4444' : '#10b981', borderRadius:'20px', height:'8px', transition:'width 0.5s' }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CHECKLIST */}
            <div className="glass-card" style={{ padding:'40px', marginBottom:'30px', background: 'var(--bg-card)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                <h3 style={{ margin:0, color: 'var(--text-h)', fontSize:'1.2rem' }}>Checklist de Alistamiento</h3>
                <span style={{ fontSize:'0.8rem', color:'#b8860b', fontWeight:'800' }}>{checklistItems.filter(i => i.checked).length}/{checklistItems.length} completados</span>
              </div>
              <div style={{ background: darkMode ? '#334155' : '#f3f4f6', borderRadius:'20px', height:'6px', marginBottom:'20px' }}>
                <div style={{ width:`${(checklistItems.filter(i => i.checked).length / checklistItems.length) * 100}%`, background:'#10b981', borderRadius:'20px', height:'6px', transition:'width 0.3s' }} />
              </div>
              {checklistItems.map(item => (
                <div key={item.id} onClick={() => toggleChecklist(item.id)} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'12px', borderRadius:'8px', cursor:'pointer', marginBottom:'5px', background: item.checked ? (darkMode ? 'rgba(16,185,129,0.1)' : '#f0fdf4') : 'transparent' }}>
                  <div style={{ width:'22px', height:'22px', borderRadius:'6px', border:`2px solid ${item.checked ? '#10b981' : '#e5e7eb'}`, background: item.checked ? '#10b981' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {item.checked && <span style={{ color:'#fff', fontSize:'0.8rem', fontWeight:'900' }}>✓</span>}
                  </div>
                  <span style={{ fontSize:'0.9rem', color: item.checked ? '#10b981' : ('var(--text-body)'), textDecoration: item.checked ? 'line-through' : 'none' }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* NOTAS DE TURNO */}
            <div className="glass-card" style={{ padding:'40px', marginBottom:'30px', background: 'var(--bg-card)' }}>
              <h3 style={{ margin:'0 0 15px 0', color: 'var(--text-h)', fontSize:'1.2rem' }}>Notas de Turno</h3>
              <textarea value={notasTurno} onChange={e => setNotasTurno(e.target.value)} placeholder="Escribe observaciones del turno..." style={{ width:'100%', minHeight:'100px', padding:'15px', borderRadius:'10px', border:'1px solid #e5e7eb', fontFamily:'Outfit', fontSize:'0.9rem', resize:'vertical', background: darkMode ? '#1e293b' : '#f9fafb', color: 'var(--text-h)' }} />
              <button className="btn-oro" style={{ marginTop:'10px', padding:'10px 20px', fontSize:'0.75rem' }} onClick={() => mostrarMensaje('📝 Notas de turno guardadas correctamente.')}>GUARDAR NOTAS</button>
            </div>

            {/* GESTIÓN DE STOCKS */}
            <div className="glass-card" style={{ padding:'50px', background: 'var(--bg-card)' }}>
              <h3 style={{ margin:'0 0 30px 0', color: 'var(--text-h)', fontSize:'1.5rem' }}>Gestión de Stocks</h3>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ textAlign:'left', borderBottom:'3px solid #f4f7f9', color:'#b8860b', fontSize:'0.8rem', fontFamily:'Syncopate', letterSpacing:'1px' }}>
                    <th style={{ padding:'15px' }}>SKU</th><th>PRODUCTO</th><th>STOCK</th><th>ESTADO</th><th>ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {listaProductos.map(p => {
                    const stockActual = stockProductos[p._id] ?? p.stock;
                    const yaSolicitado = solicitudesReabastecimiento.some(s => s.producto === p.nombre);
                    return (
                      <tr key={p._id} style={{ borderBottom:'1px solid #f3f4f6', background: stockActual < 5 ? 'rgba(239,68,68,0.05)' : 'transparent' }}>
                        <td style={{ padding:'15px', color:'#9ca3af', fontWeight:'800' }}>{p.sku || p._id?.substring(0,8)}</td>
                        <td style={{ fontWeight:'700', color: 'var(--text-h)' }}>{p.nombre}</td>
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                            <button onClick={() => ajustarStockLocal(p, -1)} style={{ width:'26px', height:'26px', borderRadius:'50%', border:'1px solid #ef4444', background:'none', color:'#ef4444', cursor:'pointer', fontWeight:'900' }}>-</button>
                            <span style={{ fontWeight:'800', minWidth:'25px', textAlign:'center', color: stockActual < 5 ? '#ef4444' : 'var(--text-h)' }}>{stockActual}</span>
                            <button onClick={() => ajustarStockLocal(p, 1)} style={{ width:'26px', height:'26px', borderRadius:'50%', border:'1px solid #10b981', background:'none', color:'#10b981', cursor:'pointer', fontWeight:'900' }}>+</button>
                          </div>
                        </td>
                        <td><span style={{ color: stockActual < 5 ? '#ef4444' : stockActual < 10 ? '#f59e0b' : '#10b981', fontWeight:'900', fontSize:'0.8rem' }}>{stockActual < 5 ? '● CRÍTICO' : stockActual < 10 ? '● REABASTECER' : '● OK'}</span></td>
                        <td>
                          {stockActual < 10 && <button onClick={() => solicitarReabastecimiento(p)} disabled={yaSolicitado} style={{ padding:'5px 10px', fontSize:'0.65rem', borderRadius:'6px', border:`1px solid ${yaSolicitado ? '#9ca3af' : '#b8860b'}`, background:'none', color: yaSolicitado ? '#9ca3af' : '#b8860b', cursor: yaSolicitado ? 'default' : 'pointer', fontFamily:'Syncopate' }}>{yaSolicitado ? '✓ SOLICITADO' : '📦 PEDIR'}</button>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* TRASLADOS ENTRE SEDES */}
            <div className="glass-card" style={{ padding:'40px', marginTop:'30px', background: 'var(--bg-card)' }}>
              <h3 style={{ margin:'0 0 20px 0', color: 'var(--text-h)', fontSize:'1.2rem', fontFamily:'Syncopate' }}>TRASLADO INTER-SEDES</h3>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 100px', gap:'10px', marginBottom:'20px' }}>
                <select id="traslado-prod" style={{ padding:'10px', borderRadius:'8px', border:'1px solid #e5e7eb' }}>
                  <option value="">Seleccionar Producto...</option>
                  {listaProductos.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                </select>
                <select id="traslado-destino" style={{ padding:'10px', borderRadius:'8px', border:'1px solid #e5e7eb' }}>
                  <option value="">Sede Destino...</option>
                  {DATABASE_LOGYTECH.sedes.map(s => <option key={s.id} value={s.nombre}>{s.nombre}</option>)}
                </select>
                <input id="traslado-cant" type="number" placeholder="Cant." style={{ padding:'10px', borderRadius:'8px', border:'1px solid #e5e7eb' }} />
                <button className="btn-oro" style={{ padding:'10px', fontSize:'0.7rem' }} onClick={() => {
                  const pId = document.getElementById('traslado-prod').value;
                  const dest = document.getElementById('traslado-destino').value;
                  const c = document.getElementById('traslado-cant').value;
                  const prod = listaProductos.find(x => x._id === pId);
                  if(prod) procesarTrasladoSede(prod, 'Bodega Central', dest, parseInt(c));
                }}>MOVER</button>
              </div>
              
              {trasladosInterSedes.length > 0 && (
                <div style={{ maxHeight:'150px', overflowY:'auto' }}>
                  <table style={{ width:'100%', fontSize:'0.8rem', borderCollapse:'collapse' }}>
                    <thead>
                      <tr style={{ color:'#b8860b', textAlign:'left', borderBottom:'1px solid #f3f4f6' }}>
                        <th style={{ padding:'5px' }}>PRODUCTO</th>
                        <th>DESTINO</th>
                        <th>CANT.</th>
                        <th>ESTADO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trasladosInterSedes.map(t => (
                        <tr key={t.id} style={{ borderBottom:'1px solid #f9fafb' }}>
                          <td style={{ padding:'8px 5px', color:'var(--text-h)' }}>{t.producto}</td>
                          <td style={{ color:'var(--text-body)' }}>{t.destino}</td>
                          <td style={{ fontWeight:'bold' }}>{t.cantidad}</td>
                          <td style={{ color:'#10b981', fontWeight:'800' }}>EN TRÁNSITO</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* HISTORIAL */}
            {historialMovimientos.length > 0 && (
              <div className="glass-card" style={{ padding:'40px', marginTop:'30px', background: 'var(--bg-card)' }}>
                <h3 style={{ margin:'0 0 20px 0', color: 'var(--text-h)', fontSize:'1.2rem' }}>Historial de Movimientos</h3>
                <div style={{ maxHeight:'200px', overflowY:'auto' }}>
                  {historialMovimientos.map(m => (
                    <div key={m.id} style={{ padding:'10px 0', borderBottom:'1px solid #f3f4f6', display:'flex', gap:'15px', fontSize:'0.85rem', alignItems:'center' }}>
                      <span style={{ color: m.cambio.startsWith('+') ? '#10b981' : '#ef4444', fontWeight:'900', minWidth:'35px' }}>{m.cambio}</span>
                      <span style={{ flex:1, color: 'var(--text-body)' }}>{m.producto}</span>
                      <span style={{ color:'#9ca3af' }}>Stock: {m.stockResultante}</span>
                      <span style={{ color:'#9ca3af', fontSize:'0.75rem' }}>{m.fecha}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL EDITAR/AGREGAR PRODUCTO */}
      {mostrarModalProducto && productoEditando && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div className="glass-card" style={{ padding:'50px', maxWidth:'500px', width:'90%', background:'#fff' }}>
            <h3 style={{ fontFamily:'Syncopate', color:'#b8860b', marginBottom:'25px' }}>{productoEditando.esNuevo ? 'NUEVO PRODUCTO' : 'EDITAR PRODUCTO'}</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {[['nombre','Nombre'], ['detalles','Descripción'], ['imagen','URL Imagen'], ['sku','SKU'], ['ubicacion','Ubicación (Ej: Pasillo A-1)']].map(([key, label]) => (
                <div key={key}>
                  <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'#4b5563' }}>{label}</label>
                  <input type="text" defaultValue={productoEditando[key] || ''} style={{ width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #e5e7eb', marginTop:'4px', fontFamily:'Outfit' }}
                    onChange={e => setProductoEditando(prev => ({...prev, [key]: e.target.value}))} />
                </div>
              ))}
              <div style={{ display:'flex', gap:'10px' }}>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'#4b5563' }}>PRECIO</label>
                  <input type="number" defaultValue={productoEditando.precio} style={{ width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #e5e7eb', marginTop:'4px', fontFamily:'Outfit' }}
                    onChange={e => setProductoEditando(prev => ({...prev, precio: Number(e.target.value)}))} />
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'#4b5563' }}>STOCK</label>
                  <input type="number" defaultValue={productoEditando.stock} style={{ width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #e5e7eb', marginTop:'4px', fontFamily:'Outfit' }}
                    onChange={e => setProductoEditando(prev => ({...prev, stock: Number(e.target.value)}))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize:'0.7rem', fontWeight:'800', color:'#4b5563' }}>CATEGORÍA</label>
                <select defaultValue={productoEditando.categoria || productoEditando.cat || 'Portátiles'} style={{ width:'100%', padding:'10px', borderRadius:'8px', border:'1px solid #e5e7eb', marginTop:'4px', fontFamily:'Outfit' }}
                  onChange={e => setProductoEditando(prev => ({...prev, categoria: e.target.value, cat: e.target.value}))}>
                  <option>Portátiles</option><option>Móviles</option><option>Consolas</option>
                </select>
              </div>
            </div>
            <div style={{ display:'flex', gap:'15px', marginTop:'25px', justifyContent:'flex-end' }}>
              <button style={{ padding:'12px 25px', borderRadius:'8px', border:'1px solid #e5e7eb', background:'none', cursor:'pointer', fontFamily:'Syncopate', fontSize:'0.7rem' }} onClick={() => { setMostrarModalProducto(false); setProductoEditando(null); }}>CANCELAR</button>
              <button className="btn-oro" style={{ padding:'12px 25px' }} onClick={() => guardarProducto(productoEditando)}>GUARDAR</button>
            </div>
          </div>
        </div>
      )}

      {/* PIE DE PÁGINA */}
      <footer style={{ padding:'80px 80px 40px', background:'rgba(2,4,8,0.95)', borderTop:'1px solid rgba(212,175,55,0.1)', backdropFilter:'blur(20px)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'60px' }}>
          <div>
            <h4 style={{ color:'#b8860b', fontFamily:'Syncopate', fontSize:'0.9rem', marginBottom:'35px', letterSpacing:'2px' }}>NUESTRA FILOSOFÍA</h4>
            <p style={{ fontSize:'1rem', color: 'var(--text-body)', lineHeight:'1.9', fontWeight:'300' }}>
              En LOJJIC-J SISTEMAS S.A.S nos enfocamos en la integración de soluciones de hardware para el mercado colombiano, garantizando la trazabilidad y eficiencia en cada entrega tecnológica.
            </p>
          </div>
          <div>
            <h4 style={{ color:'#b8860b', fontFamily:'Syncopate', fontSize:'0.9rem', marginBottom:'35px', letterSpacing:'2px' }}>CUMPLIMIENTO LEGAL</h4>
            {['Términos de Servicio y Contratos','Ley de Protección de Datos (Habeas Data)','Políticas de Privacidad Corporativa','Derecho al Retracto y Devoluciones'].map(t => <span key={t} className="legal-link">{t}</span>)}
          </div>
          <div>
            <h4 style={{ color:'#b8860b', fontFamily:'Syncopate', fontSize:'0.9rem', marginBottom:'35px', letterSpacing:'2px' }}>RECURSOS DE APOYO</h4>
            {['Base de Conocimientos y FAQ','Gestión de Garantías Técnicas','Estatuto de Protección al Consumidor','PQRS - Atención al Cliente'].map(t => <span key={t} className="legal-link">{t}</span>)}
          </div>
          <div style={{ textAlign:'right' }}>
            <h4 style={{ color:'#b8860b', fontFamily:'Syncopate', fontSize:'0.9rem', marginBottom:'35px', letterSpacing:'2px' }}>BOGOTÁ - CHIQUINQUIRÁ</h4>
            <p style={{ fontSize:'0.9rem', color: 'var(--text-body)', lineHeight:'1.8' }}>
              <strong>LOJJIC-J SISTEMAS S.A.S</strong><br/>NIT: 901.442.XXX-X<br/>Sede Administrativa: Centro, Chiquinquirá<br/>
              <span style={{color:'#b8860b', fontWeight:'bold'}}>PROYECTO ACADÉMICO ADSO 2026</span>
            </p>
          </div>
        </div>
        <div style={{ marginTop:'80px', paddingTop:'30px', borderTop:'1px solid #f3f4f6', textAlign:'center' }}>
          <p style={{ fontSize:'0.8rem', color:'#9ca3af', letterSpacing:'1px' }}>© 2026 LOJJIC-J SISTEMAS COLOMBIA. PROHIBIDA LA REPRODUCCIÓN TOTAL O PARCIAL SIN AUTORIZACIÓN DEL DESARROLLADOR.</p>
        </div>
      </footer>

      {/* PANEL CARRITO */}
      <div className={`cart-panel ${mostrarCarrito ? 'cart-open' : ''}`}>
        <div style={{ padding:'45px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'2px solid #f3f4f6' }}>
          <h2 style={{ fontFamily:'Syncopate', fontSize:'1.2rem', color:'#b8860b', margin:0 }}>ORDEN DE ADQUISICIÓN</h2>
          <span onClick={() => setMostrarCarrito(false)} style={{ cursor:'pointer', fontSize:'2.5rem', color:'#9ca3af', fontWeight:'300' }}>✕</span>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'30px 45px' }}>
          {carrito.length === 0 ? (
            <div style={{textAlign:'center', color:'#9ca3af', marginTop:'60px'}}>
              <div style={{fontSize:'4rem', marginBottom:'20px'}}>📦</div>
              <p style={{fontSize:'1.1rem'}}>Su bolsa de adquisición está vacía.</p>
            </div>
          ) : carrito.map(item => (
            <div key={item.tempId} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'25px 0', borderBottom:'1px solid #f9fafb' }}>
              <div>
                <div style={{ fontWeight:'800', color:'#111', fontSize:'1.1rem' }}>{item.nombre}</div>
                <div style={{ color:'#b8860b', fontWeight:'bold', marginTop:'5px' }}>${item.precio.toLocaleString()}</div>
              </div>
              <button className="btn-eliminar" onClick={() => eliminarDelCarrito(item.tempId)}>REMOVER</button>
            </div>
          ))}
        </div>
        <div style={{ padding:'45px', background:'#f9fafb', borderTop:'3px solid #b8860b' }}>
          <div style={{ marginBottom:'20px' }}>
            <label style={{ fontSize:'0.75rem', fontWeight:'800', color:'#4b5563' }}>{LABELS.sedeDespacho}</label>
            <select style={{ width:'100%', padding:'15px', borderRadius:'10px', border:'2px solid #e5e7eb', marginTop:'10px', fontFamily:'Outfit' }} onChange={e => setSedeSeleccionada(e.target.value)} value={sedeSeleccionada}>
              <option value="">Seleccione origen...</option>
              {DATABASE_LOGYTECH.sedes.map(s => <option key={s.id} value={s.nombre}>{s.nombre} ({s.capacidad} stock)</option>)}
            </select>
          </div>
          <div style={{ marginBottom:'25px' }}>
            <label style={{ fontSize:'0.75rem', fontWeight:'800', color:'#4b5563' }}>{LABELS.metodoPago}</label>
            <select style={{ width:'100%', padding:'15px', borderRadius:'10px', border:'2px solid #e5e7eb', marginTop:'10px', fontFamily:'Outfit' }} onChange={e => setMetodoPago(e.target.value)} value={metodoPago}>
              <option value="">Seleccione una opción...</option>
              <option value="PSE">PSE - Transferencia Bancaria</option>
              <option value="TC">Tarjeta de Crédito (Visa/Mastercard)</option>
              <option value="Bancolombia">Botón Bancolombia</option>
              <option value="Efecty">Efecty / Su Red</option>
            </select>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'35px', fontSize:'1.8rem' }}>
            <span style={{fontWeight:'300'}}>VALOR TOTAL:</span>
            <span style={{ color:'#b8860b', fontWeight:'900' }}>${totalCalculado.toLocaleString()}</span>
          </div>
          <button className="btn-oro" style={{ width:'100%', padding:'28px', fontSize:'1.1rem', opacity:(carrito.length === 0 || !metodoPago || !sedeSeleccionada) ? 0.5 : 1, cursor:(carrito.length === 0 || !metodoPago || !sedeSeleccionada) ? 'not-allowed' : 'pointer' }}
            disabled={carrito.length === 0 || !metodoPago || !sedeSeleccionada}
            onClick={() => { setMostrarCarrito(false); cambiarVista('checkout'); }}>
            {(!metodoPago || !sedeSeleccionada) ? 'COMPLETAR DATOS' : `PAGAR CON ${metodoPago}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
