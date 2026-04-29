import React, { useState, useEffect } from 'react';

/**
 * HOJA DE ESTILOS CSS INYECTADA
 * Define la identidad visual corporativa de LOJJIC-J SISTEMAS
 * Incluye tipografías Syncopate y Outfit
 */
const injectCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Outfit:wght@300;400;600;800&display=swap');

  body { 
    margin: 0; 
    padding: 0; 
    font-family: 'Outfit', sans-serif; 
    background-color: #f4f7f9; 
    color: #1a1a1a; 
    overflow-x: hidden; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* BARRA DE CARGA SUPERIOR */
  .top-loader { 
    position: fixed; 
    top: 0; 
    left: 0; 
    height: 4px; 
    background: linear-gradient(90deg, #d4af37, #b8860b, #d4af37); 
    background-size: 200% 100%;
    z-index: 9999; 
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
  }
  
  /* ANIMACIONES GLOBALES */
  .fade-in { 
    animation: fadeInEffect 0.6s ease-out; 
  }

  @keyframes fadeInEffect { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
  }

  /* LOGOTIPO CORPORATIVO DINÁMICO */
  .logo-box {
    width: 100px; 
    height: 55px; 
    border: 2px solid #b8860b; 
    border-radius: 14px;
    display: flex; 
    align-items: center; 
    justify-content: center;
    font-family: 'Syncopate', sans-serif; 
    color: #b8860b; 
    font-size: 0.85rem; 
    cursor: pointer;
    background: #ffffff; 
    position: relative; 
    box-shadow: 0 6px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
  }

  .logo-box:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(184, 134, 11, 0.15);
  }

  .logo-box::after {
    content: ""; 
    position: absolute; 
    width: 120%; 
    height: 130%; 
    border: 1px dashed rgba(184, 134, 11, 0.4); 
    border-radius: 18px; 
    animation: rotateLogoFrame 12s linear infinite; 
    pointer-events: none;
  }

  @keyframes rotateLogoFrame { 
    from { transform: rotate(0deg); } 
    to { transform: rotate(360deg); } 
  }

  /* TARJETAS DE PRODUCTO (GLASSMORPHISM) */
  .glass-card { 
    background: #ffffff; 
    border: 1px solid #e1e8ed; 
    border-radius: 24px; 
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    height: 100%; 
    display: flex; 
    flex-direction: column; 
    box-shadow: 0 12px 24px rgba(0,0,0,0.04); 
    overflow: hidden;
  }

  .glass-card:hover { 
    border-color: #b8860b; 
    transform: translateY(-12px); 
    box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
  }

  /* PANEL LATERAL DEL CARRITO */
  .cart-panel { 
    position: fixed; 
    right: 0; 
    top: 0; 
    width: 450px; 
    height: 100vh; 
    background: #ffffff; 
    border-left: 3px solid #b8860b; 
    z-index: 2000; 
    display: flex; 
    flex-direction: column; 
    transform: translateX(100%); 
    transition: 0.7s cubic-bezier(0.19, 1, 0.22, 1); 
    box-shadow: -15px 0 35px rgba(0,0,0,0.15); 
  }

  .cart-open { 
    transform: translateX(0); 
  }

  /* BOTONES Y ACCIONES */
  .btn-oro { 
    background: linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #8a6d1a 100%); 
    color: #ffffff; 
    border: none; 
    border-radius: 12px; 
    font-weight: 800; 
    cursor: pointer; 
    text-transform: uppercase; 
    transition: all 0.3s ease; 
    letter-spacing: 1.5px; 
    box-shadow: 0 4px 15px rgba(184, 134, 11, 0.3);
  }

  .btn-oro:hover { 
    filter: brightness(1.15); 
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(184, 134, 11, 0.4);
  }

  .btn-oro:active {
    transform: translateY(0);
  }

  .btn-eliminar { 
    background: #fff5f5; 
    color: #ff4d4d; 
    border: 1px solid #ff4d4d; 
    border-radius: 8px; 
    cursor: pointer; 
    padding: 6px 12px; 
    font-size: 0.75rem; 
    transition: 0.3s all ease; 
    font-weight: 600;
  }

  .btn-eliminar:hover { 
    background: #ff4d4d; 
    color: #ffffff; 
    box-shadow: 0 4px 10px rgba(255, 77, 77, 0.2);
  }

  /* NAVEGACIÓN Y TEXTOS */
  .nav-item { 
    cursor: pointer; 
    font-size: 0.8rem; 
    letter-spacing: 2px; 
    color: #4b5563; 
    transition: 0.3s color ease; 
    font-weight: 700; 
    position: relative;
    padding: 5px 0;
  }

  .nav-item::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #b8860b;
    transition: width 0.3s ease;
  }

  .nav-item:hover::after {
    width: 100%;
  }

  .nav-item:hover { 
    color: #b8860b; 
  }

  /* CAMPOS DE ENTRADA */
  input { 
    background: #f9fafb; 
    border: 2px solid #e5e7eb; 
    padding: 20px; 
    border-radius: 14px; 
    color: #111827; 
    margin-bottom: 20px; 
    width: 100%; 
    box-sizing: border-box; 
    outline: none; 
    transition: 0.4s all ease; 
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
  }

  input:focus { 
    border-color: #b8860b; 
    box-shadow: 0 0 0 5px rgba(184, 134, 11, 0.12); 
    background: #ffffff; 
  }

  /* NOTIFICACIONES TOAST */
  .toast { 
    position: fixed; 
    bottom: 40px; 
    left: 50%; 
    transform: translateX(-50%); 
    background: #111827; 
    color: #ffffff; 
    padding: 18px 35px; 
    border-radius: 60px; 
    z-index: 5000; 
    border: 2px solid #b8860b; 
    animation: toastSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
    font-weight: 600;
  }

  @keyframes toastSlideIn { 
    from { bottom: -100px; opacity: 0; } 
    to { bottom: 40px; opacity: 1; } 
  }

  /* ENLACES LEGALES EN FOOTER */
  .legal-link { 
    color: #6b7280; 
    text-decoration: none; 
    font-size: 0.85rem; 
    transition: 0.3s all ease; 
    display: block; 
    margin-bottom: 12px; 
    cursor: pointer; 
    font-weight: 400;
  }

  .legal-link:hover { 
    color: #b8860b; 
    padding-left: 8px;
  }

  /* INDICADORES DE ESTADO */
  .stat-badge { 
    background: #fffbeb; 
    color: #b8860b; 
    padding: 6px 16px; 
    border-radius: 25px; 
    font-size: 0.8rem; 
    font-weight: 800; 
    border: 1px solid #fef3c7; 
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

function App() {
  /**
   * ESTADOS GLOBALES DE LA APLICACIÓN
   * Manejan la reactividad de la interfaz y persistencia temporal
   */
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('inicio'); 
  const [notificacion, setNotificacion] = useState("");
  const [loadingWidth, setLoadingWidth] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [tiempo, setTiempo] = useState({ h: 24, m: 0, s: 0 });
/**
   * ESTADOS DE GESTIÓN LOGÍSTICA - MÓDULO DE ALISTAMIENTO
   * Controlan el flujo de picking y la trazabilidad de activos en bodega.
   */
  const [bodegaPrincipal, setBodegaPrincipal] = useState([
    { ref: 'LOG-001', item: 'Scanner Industrial', pasillo: 'A-1', disponibilidad: 15 },
    { ref: 'LOG-042', item: 'Terminal Portátil', pasillo: 'B-4', disponibilidad: 8 },
    { ref: 'LOG-088', item: 'Impresora Térmica', pasillo: 'C-2', disponibilidad: 22 }
  ]);

  const [ordenesParaDespacho, setOrdenesParaDespacho] = useState([
    { id: 'DES-1001', destino: 'Sede Chía', responsable: 'J. Martínez', estado: 'Alistamiento' },
    { id: 'DES-1002', destino: 'Sede Zipaquirá', responsable: 'A. Felipe', estado: 'Verificación' },
    { id: 'DES-1003', destino: 'Sede Bogotá', responsable: 'C. Ríos', estado: 'Pendiente' }
  ]);

  /**
   * ESTADOS DE SOPORTE Y SOLUCIONES TÉCNICAS (ADMIN)
   * Registro de novedades detectadas durante la jornada de software.
   */
  const [ticketsSoporte, setTicketsSoporte] = useState([
    { id: 'TCK-2026-01', asunto: 'Falla Sync MongoDB', prioridad: 'Alta', reporte: 'J. Martínez' },
    { id: 'TCK-2026-02', asunto: 'Error en Lector QR', prioridad: 'Media', reporte: 'B. Rojas' }
  ]);
  /**
   * EFECTO INICIAL: INYECCIÓN DE ESTILOS Y TEMPORIZADOR
   * Se ejecuta una sola vez al montar el componente
   */
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = injectCSS;
    document.head.appendChild(styleElement);
    
    const intervalTimer = setInterval(() => {
      setTiempo(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, []);

  /**
   * NAVEGACIÓN CON BARRA DE PROGRESO
   * Simula la carga de un sistema empresarial robusto
   */
  const cambiarVista = (nuevaVista) => {
    setLoadingWidth(30);
    setTimeout(() => setLoadingWidth(70), 150);
    setTimeout(() => setLoadingWidth(100), 300);
    setTimeout(() => { 
      setVista(nuevaVista); 
      setLoadingWidth(0); 
    }, 450);
  };
/**
   * MÓDULO DE VALIDACIÓN ESTRUCTURAL DE INVENTARIO
   * Este bloque gestiona la integridad de los datos antes de proceder al despacho.
   * Diseñado para la Guía 8 del programa ADSO - SENA.
   */
  const [registroLogistico, setRegistroLogistico] = useState([]);

  const validarDisponibilidadBodega = (itemsOrden) => {
    console.log("SISTEMA: Iniciando validación de trazabilidad para " + itemsOrden.length + " activos...");
    
    // Simulación de latencia de base de datos MongoDB para realismo en la interfaz
    return new Promise((resolve) => {
      setTimeout(() => {
        const stockDisponible = true; // Lógica de verificación de stock
        if (stockDisponible) {
          mostrarMensaje("VALIDACIÓN: Stock verificado en Bodega Fontanar. Procediendo.");
          resolve(true);
        } else {
          mostrarMensaje("ALERTA: Insuficiencia de activos detectada en la zona de picking.");
          resolve(false);
        }
      }, 800);
    });
  };

  /**
   * PROCESADOR DE DESPACHOS Y GENERACIÓN DE GUÍAS
   * Registra cada movimiento en el historial de trazabilidad del administrador.
   *//**
   * MOTOR DE GENERACIÓN DE DOCUMENTACIÓN LOGÍSTICA (SIGID)
   * Este módulo se encarga de la creación de metadatos para las guías de transporte.
   * Cumple con los requerimientos técnicos de la etapa lectiva ADSO 2026.
   */
  const generarMetadatosGuia = (montoTotal) => {
    const prefijo = "LOG-2026";
    const consecutivo = Math.floor(Math.random() * 1000000);
    const fechaActual = new Date();
    
    return {
      id_guia: `${prefijo}-${consecutivo}`,
      timestamp: fechaActual.getTime(),
      formato_fecha: fechaActual.toLocaleDateString('es-CO'),
      centro_distribución: "Logytech Fontanar - Chía",
      prioridad_entrega: montoTotal > 5000000 ? "CRÍTICA" : "ESTÁNDAR",
      estado_inicial: "EN BODEGA"
    };
  };

  /**
   * SISTEMA DE ALERTAS PERSONALIZADAS
   * Muestra notificaciones temporales en la parte inferior para feedback del usuario.
   */
  const [mensajeActivo, setMensajeActivo] = useState("");
  
  const mostrarMensaje = (texto) => {
    setMensajeActivo(texto);
    console.log(`[LOGÍSTICA] Notificación: ${texto}`);
    
    // El mensaje desaparece automáticamente tras 4 segundos para no obstruir la vista
    setTimeout(() => {
      setMensajeActivo("");
    }, 4000);
  };

  /**
   * VALIDACIÓN DE INTEGRIDAD DE BODEGA
   * Verifica que los activos seleccionados coincidan con el inventario disponible.
   */
  const verificarIntegridadCarrito = (items) => {
    if (!items || items.length === 0) return false;
    
    // Lógica de validación estructural de objetos
    return items.every(item => item.id && item.nombre && item.precio);
  };
    const procesarSalidaActivos = async () => {
    if (carrito.length === 0) {
      mostrarMensaje("ERROR: No hay activos en la bolsa para procesar despacho.");
      return;
    }

    const esValido = await validarDisponibilidadBodega(carrito);
    
    if (esValido) {
      const nuevaGuia = {
        id_guia: `GUIA-${Math.floor(Math.random() * 9000) + 1000}`,
        fecha_emision: new Date().toLocaleString(),
        total_activos: carrito.length,
        valor_declarado: carrito.reduce((acc, p) => acc + p.precio, 0),
        estado: 'DESPACHADO'
      };

      // Actualizamos el historial para que el Admin lo vea en su panel
      setRegistroLogistico(prev => [...prev, nuevaGuia]);
      setCarrito([]);
      setMostrarCarrito(false);
      mostrarMensaje(`EXITO: Guía ${nuevaGuia.id_guia} generada. Activos en ruta.`);
    }
  };

  /**
   * FILTRO DE BUSQUEDA AVANZADA (LOGÍSTICA)
   * Permite localizar activos rápidamente en el catálogo por categoría o precio.
   */
  const [filtroCat, setFiltroCat] = useState("Todos");
  
  const filtrarCatalogo = (productos) => {
    if (filtroCat === "Todos") return productos;
    return productos.filter(p => p.cat === filtroCat);
  };


  /**
   * CONTROL DE ACCESO CORPORATIVO
   * Valida las credenciales de los usuarios ADSO
   */
  const manejarLogin = (e) => {
    e.preventDefault();
    if (email === "admin@lojjic.com" && pass === "ADSO2026") {
      const saludoPersonalizado = vista === 'admin' 
        ? "ACCESO CONCEDIDO: Bienvenido Administrador Martínez. Cargando módulos de seguridad..." 
        : "ACCESO OPERATIVO: Bienvenido Jerónimo. Sincronizando base de datos de inventario...";
      
      mostrarMensaje(saludoPersonalizado);
      cambiarVista(vista === 'admin' ? 'panel-admin' : 'panel-empleado');
    } else {
      mostrarMensaje("ERROR DE AUTENTICACIÓN: Las credenciales no coinciden con nuestros registros.");
    }
  };

  /**
   * BASE DE DATOS DE PRODUCTOS
   * Listado de activos tecnológicos de alta gama
   */
  const productos = [
    { 
      id: 1, 
      nombre: 'MacBook Pro M3 Max', 
      precio: 15499000, 
      cat: 'Portátiles', 
      img: '💻', 
      detalles: 'Arquitectura Chip M3 Max de Apple, 36GB de Memoria RAM Unificada, Almacenamiento SSD de 1TB de alta velocidad.', 
      stock: 12 
    },
    { 
      id: 2, 
      nombre: 'Galaxy S24 Ultra', 
      precio: 6899000, 
      cat: 'Móviles', 
      img: '📱', 
      detalles: 'Procesador Snapdragon 8 Gen 3 for Galaxy, Cámara Principal de 200MP con IA, Pantalla Dynamic AMOLED 2X.', 
      stock: 25 
    },
    { 
      id: 3, 
      nombre: 'PlayStation 5 Slim', 
      precio: 2499000, 
      cat: 'Consolas', 
      img: '🎮', 
      detalles: 'Nueva versión Slim con SSD de 1TB, Soporte para Ray Tracing, Gráficos 4K HDR y Audio 3D Tempest.', 
      stock: 8 
    },
    { 
      id: 4, 
      nombre: 'ROG Zephyrus G14', 
      precio: 9500000, 
      cat: 'Portátiles', 
      img: '🔥', 
      detalles: 'GPU NVIDIA RTX 4070, Procesador AMD Ryzen 9, Pantalla ROG Nebula Display de 14 pulgadas a 165Hz.', 
      stock: 5 
    }
  ];

  /**
   * GESTIÓN DEL CARRITO DE COMPRAS
   * Permite añadir y eliminar productos con IDs únicos temporales
   */
  const añadirAlCarrito = (p) => {
    const itemConId = { ...p, tempId: Date.now() + Math.random() };
    setCarrito([...carrito, itemConId]);
    mostrarMensaje(`SISTEMA: El producto ${p.nombre} ha sido indexado en su bolsa correctamente.`);
  };

  const eliminarDelCarrito = (tempId) => {
    setCarrito(carrito.filter(item => item.tempId !== tempId));
    mostrarMensaje("SISTEMA: Producto removido de la orden actual.");
  };

  const totalCalculado = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* COMPONENTES DE INTERFAZ GLOBAL */}
      <div className="top-loader" style={{ width: `${loadingWidth}%` }}></div>
      {notificacion && <div className="toast fade-in">{notificacion}</div>}
      
      {/* BARRA DE NAVEGACIÓN SUPERIOR */}
      <nav style={{ 
        padding: '25px 80px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: '#ffffff', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
        borderBottom: '1px solid #f3f4f6'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', cursor: 'pointer' }} onClick={() => cambiarVista('inicio')}>
          <div className="logo-box">LOJJ-J</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Syncopate', letterSpacing: '4px', fontSize: '1rem', color: '#111', fontWeight: 'bold' }}>
              LOJJIC-J <span style={{color: '#b8860b'}}>SISTEMAS</span>
            </span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '2px', color: '#9ca3af', fontWeight: '800' }}>TECNOLOGÍA E INGENIERÍA</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
          <span className="nav-item" onClick={() => cambiarVista('tienda')}>SOLUCIONES</span>
          <span className="nav-item" onClick={() => cambiarVista('empleado')}>LOGÍSTICA</span>
          <span className="nav-item" onClick={() => cambiarVista('admin')}>ADMINISTRACIÓN</span>
          
          <div 
            onClick={() => setMostrarCarrito(true)} 
            style={{ 
              cursor: 'pointer', 
              position: 'relative', 
              fontSize: '1.4rem', 
              marginLeft: '15px',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🛒 <span style={{ 
              position: 'absolute', 
              top: -10, 
              right: -14, 
              background: '#b8860b', 
              color: '#ffffff', 
              borderRadius: '50%', 
              padding: '3px 8px', 
              fontSize: '0.7rem', 
              fontWeight: '900',
              boxShadow: '0 4px 8px rgba(184, 134, 11, 0.3)'
            }}>
              {carrito.length}
            </span>
          </div>
        </div>
      </nav>

      {/* ÁREA DE CONTENIDO DINÁMICO */}
      <main style={{ flex: 1 }} className="fade-in" key={vista}>
        
        {/* SECCIÓN 1: VISTA DE INICIO (LANDING) */}
        {vista === 'inicio' && (
          <div style={{ textAlign: 'center', padding: '120px 20px', background: 'radial-gradient(circle at center, #ffffff 0%, #f4f7f9 100%)' }}>
            <div style={{ 
              background: '#111827', 
              color: '#d4af37', 
              display: 'inline-block', 
              padding: '12px 35px', 
              border: '1px solid #d4af37',
              borderRadius: '60px', 
              marginBottom: '40px', 
              fontWeight: 'bold', 
              fontSize: '0.85rem', 
              letterSpacing: '3px' 
            }}>
              EVENTO CORPORATIVO: CIERRE DE OFERTAS EN {tiempo.h}H {tiempo.m}M {tiempo.s}S
            </div>
            
            <h1 style={{ 
              fontFamily: 'Syncopate', 
              fontSize: '5.5rem', 
              color: '#111', 
              marginTop: '0', 
              lineHeight: '1.0',
              letterSpacing: '-2px'
            }}>
              NÚCLEO <br/> 
              <span style={{ color: '#b8860b', fontSize: '5rem' }}>TECNOLÓGICO</span>
            </h1>
            
            <p style={{ 
              color: '#4b5563', 
              maxWidth: '850px', 
              margin: '40px auto', 
              fontSize: '1.3rem', 
              lineHeight: '1.8',
              fontWeight: '300'
            }}>
              Provisión estratégica de activos tecnológicos de alta gama para profesionales del desarrollo, 
              ingeniería de software y operaciones logísticas de alto rendimiento en Colombia.
            </p>
            
            <button 
              className="btn-oro" 
              style={{ padding: '28px 90px', fontSize: '1.3rem', marginTop: '30px' }} 
              onClick={() => cambiarVista('tienda')}
            >
              ACCEDER AL CATÁLOGO
            </button>
          </div>
        )}

        {/* SECCIÓN 2: CATÁLOGO DE PRODUCTOS */}
        {vista === 'tienda' && (
          <div style={{ padding: '80px 10%' }}>
            <div style={{ marginBottom: '60px', textAlign: 'left' }}>
              <h2 style={{ fontFamily: 'Syncopate', fontSize: '2rem', color: '#111' }}>
                CATÁLOGO DE <span style={{color: '#b8860b'}}>ACTIVOS</span>
              </h2>
              <div style={{ width: '80px', height: '4px', background: '#b8860b', marginTop: '15px' }}></div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
              gap: '50px' 
            }}>
              {productos.map(p => (
                <div key={p.id} className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '5rem', 
                    marginBottom: '30px', 
                    background: '#f9fafb', 
                    borderRadius: '20px', 
                    padding: '30px',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
                  }}>
                    {p.img}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', color: '#111', fontWeight: '800' }}>{p.nombre}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '20px 0', minHeight: '60px', lineHeight: '1.6' }}>
                    {p.detalles}
                  </p>
                  <div style={{ 
                    marginTop: 'auto', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderTop: '1px solid #f3f4f6', 
                    paddingTop: '25px' 
                  }}>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#9ca3af', fontWeight: 'bold' }}>PRECIO NETO</span>
                      <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#111' }}>
                        ${p.precio.toLocaleString()}
                      </span>
                    </div>
                    <button 
                      className="btn-oro" 
                      style={{ padding: '16px 35px' }} 
                      onClick={() => añadirAlCarrito(p)}
                    >
                      ADQUIRIR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECCIÓN 3: FORMULARIO DE ACCESO (ADMIN/EMPLEADO) */}
        {(vista === 'empleado' || vista === 'admin') && (
          <div style={{ 
            maxWidth: '500px', 
            margin: '100px auto', 
            padding: '70px', 
            background: '#ffffff'
          }} className="glass-card">
            <h2 style={{ 
              fontFamily: 'Syncopate', 
              textAlign: 'center', 
              color: '#b8860b', 
              fontSize: '1.5rem', 
              marginBottom: '15px' 
            }}>
              AUTENTICACIÓN
            </h2>
            <p style={{ 
              textAlign: 'center', 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              marginBottom: '40px',
              fontWeight: '500'
            }}>
              Portal de Seguridad Corporativa para {vista.toUpperCase()}
            </p>
            
            <form onSubmit={manejarLogin}>
              <div style={{ marginBottom: '5px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563', marginLeft: '5px' }}>IDENTIFICADOR</label>
                <input 
                  type="email" 
                  placeholder="ejemplo@lojjic.com" 
                  required 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563', marginLeft: '5px' }}>TOKEN DE SEGURIDAD</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  required 
                  onChange={(e) => setPass(e.target.value)} 
                />
              </div>
              <button 
                type="submit" 
                className="btn-oro" 
                style={{ width: '100%', padding: '22px', marginTop: '15px', fontSize: '1rem' }}
              >
                ACCEDER AL NÚCLEO
              </button>
            </form>
          </div>
        )}

        {/* SECCIÓN 4: DASHBOARD ADMINISTRADOR */}
        {vista === 'panel-admin' && (
          <div style={{ padding: '80px 10%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontFamily: 'Syncopate', color: '#111', margin: 0 }}>
                CONSOLA <span style={{color:'#b8860b'}}>ADMIN</span>
              </h2>
              <div style={{ color: '#6b7280', fontWeight: '600' }}>
                Sesión: <span style={{color: '#b8860b'}}>J. Martínez</span> | Chiquinquirá, CO
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div className="glass-card" style={{ padding: '40px' }}>
                <span className="stat-badge">MÉTRICAS DE VENTA</span>
                <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Ventas Consolidadas</h4>
                <h2 style={{margin:0, fontSize:'2.8rem', fontWeight: '900'}}>$145.200.000</h2>
                <div style={{ marginTop: '20px', color: '#10b981', fontWeight: '700' }}>↑ 14.5% vs mes anterior</div>
              </div>
              
              <div className="glass-card" style={{ padding: '40px' }}>
                <span className="stat-badge">INFRAESTRUCTURA</span>
                <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Integridad del Sistema</h4>
                <h2 style={{margin:0, color:'#10b981', fontSize:'2.8rem', fontWeight: '900'}}>ÓPTIMO</h2>
                <div style={{ marginTop: '20px', color: '#6b7280' }}>Latencia: 14ms | Uptime: 99.9%</div>
              </div>

              <div className="glass-card" style={{ padding: '40px' }}>
                <span className="stat-badge">RECURSOS HUMANOS</span>
                <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Personal en Turno</h4>
                <h2 style={{margin:0, fontSize:'2.8rem', fontWeight: '900'}}>08</h2>
                <div style={{ marginTop: '20px', color: '#b8860b', fontWeight: '600' }}>Bodega Chiquinquirá Activa</div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 5: PANEL OPERACIONES (LOGÍSTICA) */}
        {vista === 'panel-empleado' && (
          <div style={{ padding: '80px 10%' }}>
            <h2 style={{ fontFamily: 'Syncopate', color: '#111', marginBottom: '50px' }}>
              OPERACIONES <span style={{color:'#b8860b'}}>LOGÍSTICAS</span>
            </h2>
            
            <div className="glass-card" style={{ padding: '50px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h3 style={{ margin: 0, color: '#111', fontSize: '1.5rem' }}>Gestión de Stocks - Sede Principal</h3>
                <button className="btn-oro" style={{ padding: '12px 25px', fontSize: '0.8rem' }}>DESCARGAR REPORTE</button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ 
                    textAlign: 'left', 
                    borderBottom: '3px solid #f4f7f9', 
                    color:'#b8860b', 
                    fontSize:'0.8rem', 
                    fontFamily:'Syncopate',
                    letterSpacing: '1px'
                  }}>
                    <th style={{ padding: '20px 15px' }}>IDENTIFICADOR</th>
                    <th>PRODUCTO / ACTIVO</th>
                    <th>UNIDADES EN RACK</th>
                    <th>ESTADO CRÍTICO</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.3s' }}>
                      <td style={{ padding: '25px 15px', color: '#9ca3af', fontWeight: '800' }}>#SKU-00{p.id}</td>
                      <td style={{ fontWeight:'700', color: '#111' }}>{p.nombre}</td>
                      <td style={{ color: '#4b5563' }}>{p.stock} Unidades Físicas</td>
                      <td>
                        <span style={{ 
                          color: p.stock < 10 ? '#ef4444' : '#10b981', 
                          fontWeight: '900',
                          fontSize: '0.85rem'
                        }}>
                          {p.stock < 10 ? '● REABASTECER URGENTE' : '● DISPONIBILIDAD OK'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* PIE DE PÁGINA CORPORATIVO (RESTAURADO) */}
      <footer style={{ 
        padding: '100px 80px 50px', 
        background: '#ffffff', 
        borderTop: '1px solid #e5e7eb' 
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '60px' 
        }}>
          <div>
            <h4 style={{ color: '#b8860b', fontFamily: 'Syncopate', fontSize: '0.9rem', marginBottom: '35px', letterSpacing: '2px' }}>
              NUESTRA FILOSOFÍA
            </h4>
            <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.9', fontWeight: '300' }}>
              En LOJJIC-J SISTEMAS S.A.S nos enfocamos en la integración de soluciones de hardware 
              para el mercado colombiano, garantizando la trazabilidad y eficiencia en cada entrega tecnológica.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#b8860b', fontFamily: 'Syncopate', fontSize: '0.9rem', marginBottom: '35px', letterSpacing: '2px' }}>
              CUMPLIMIENTO LEGAL
            </h4>
            <span className="legal-link">Términos de Servicio y Contratos</span>
            <span className="legal-link">Ley de Protección de Datos (Habeas Data)</span>
            <span className="legal-link">Políticas de Privacidad Corporativa</span>
            <span className="legal-link">Derecho al Retracto y Devoluciones</span>
          </div>

          <div>
            <h4 style={{ color: '#b8860b', fontFamily: 'Syncopate', fontSize: '0.9rem', marginBottom: '35px', letterSpacing: '2px' }}>
              RECURSOS DE APOYO
            </h4>
            <span className="legal-link">Base de Conocimientos y FAQ</span>
            <span className="legal-link">Gestión de Garantías Técnicas</span>
            <span className="legal-link">Estatuto de Protección al Consumidor</span>
            <span className="legal-link">PQRS - Atención al Cliente</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <h4 style={{ color: '#b8860b', fontFamily: 'Syncopate', fontSize: '0.9rem', marginBottom: '35px', letterSpacing: '2px' }}>
              BOGOTÁ - CHIQUINQUIRÁ
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.8' }}>
              <strong>LOJJIC-J SISTEMAS S.A.S</strong><br/>
              NIT: 901.442.XXX-X<br/>
              Sede Administrativa: Centro, Chiquinquirá<br/>
              <span style={{color: '#b8860b', fontWeight: 'bold'}}>PROYECTO ACADÉMICO ADSO 2026</span>
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: '80px', 
          paddingTop: '30px', 
          borderTop: '1px solid #f3f4f6', 
          textAlign: 'center' 
        }}>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', letterSpacing: '1px' }}>
            © 2026 LOJJIC-J SISTEMAS COLOMBIA. PROHIBIDA LA REPRODUCCIÓN TOTAL O PARCIAL SIN AUTORIZACIÓN DEL DESARROLLADOR.
          </p>
        </div>
      </footer>

      {/* COMPONENTE INTERACTIVO: PANEL DE COMPRA */}
      <div className={`cart-panel ${mostrarCarrito ? 'cart-open' : ''}`}>
        <div style={{ 
          padding: '45px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '2px solid #f3f4f6' 
        }}>
          <h2 style={{ fontFamily: 'Syncopate', fontSize: '1.2rem', color: '#b8860b', margin: 0 }}>ORDEN DE ADQUISICIÓN</h2>
          <span 
            onClick={() => setMostrarCarrito(false)} 
            style={{ cursor: 'pointer', fontSize: '2.5rem', color: '#9ca3af', fontWeight: '300' }}
          >
            ✕
          </span>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '30px 45px' }}>
          {carrito.length === 0 ? (
            <div style={{textAlign:'center', color:'#9ca3af', marginTop:'60px'}}>
              <div style={{fontSize: '4rem', marginBottom: '20px'}}>📦</div>
              <p style={{fontSize: '1.1rem'}}>Su bolsa de adquisición está vacía en este momento.</p>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.tempId} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '25px 0', 
                borderBottom: '1px solid #f9fafb' 
              }}>
                <div>
                  <div style={{ fontWeight: '800', color: '#111', fontSize: '1.1rem' }}>{item.nombre}</div>
                  <div style={{ color: '#b8860b', fontWeight: 'bold', marginTop: '5px' }}>
                    ${item.precio.toLocaleString()}
                  </div>
                </div>
                <button className="btn-eliminar" onClick={() => eliminarDelCarrito(item.tempId)}>REMOVER</button>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '45px', background: '#f9fafb', borderTop: '3px solid #b8860b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '35px', fontSize: '1.8rem' }}>
            <span style={{fontWeight: '300'}}>VALOR TOTAL:</span>
            <span style={{ color: '#b8860b', fontWeight: '900' }}>
              ${totalCalculado.toLocaleString()}
            </span>
          </div>
          
          <button 
            className="btn-oro" 
            style={{ 
              width: '100%', 
              padding: '28px', 
              fontSize: '1.1rem',
              opacity: carrito.length === 0 ? 0.5 : 1,
              cursor: carrito.length === 0 ? 'not-allowed' : 'pointer'
            }} 
            disabled={carrito.length === 0}
            onClick={() => {
              setMostrarCarrito(false);
              cambiarVista('empleado'); 
              mostrarMensaje("SISTEMA: Redirigiendo al formulario de registro y validación de activos...");
            }}
          >
            PROCEDER AL REGISTRO FINAL
          </button>
        </div>
      </div>
    </div>
    );
  }

  /**
   * MÓDULO DE REFERENCIAS TÉCNICAS Y CATALOGACIÓN GLOBAL
   * Este objeto simula la persistencia de datos de una base de datos MongoDB.
   * Contiene el histórico de activos permitidos para las sedes Chía y Chiquinquirá.
   */
  const DATABASE_LOGYTECH = {
    sedes: [
      { id: "S1", nombre: "Logytech Fontanar - Chía", capacidad: "80%", responsable: "J. Martínez" },
      { id: "S2", nombre: "SENA Centro Agropecuario - Chiquinquirá", capacidad: "45%", responsable: "Admin_ADSO" },
      { id: "S3", nombre: "Bodega Alterna Zipaquirá", capacidad: "20%", responsable: "Auxiliar_Log" }
    ],
    categorias_permitidas: [
      "Periféricos de Entrada (Scanners, Teclados)",
      "Terminales Móviles de Captura",
      "Sistemas de Impresión Térmica",
      "Infraestructura de Redes (Routers, Switches)",
      "Suministros (Etiquetas, Cintas)"
    ],
    codigos_error_sistema: {
      E001: "Fallo en conexión con la instancia de MongoDB Atlas",
      E002: "Stock insuficiente para el despacho solicitado",
      E003: "Usuario no cuenta con permisos de Administrador",
      E004: "Error de integridad en el payload de la bolsa"
    },
    versionamiento: {
      version: "2.4.0-STABLE",
      build: "2026.04.29",
      entorno: "Development Phase - Guía 8",
      tecnologias: ["React.js", "Node.js", "Express", "Vite"]
    }
  };

  /**
   * HISTORIAL TÉCNICO DE ACTUALIZACIONES (CHANGELOG)
   * Registro detallado del desarrollo del sistema SIGID.
   * ---------------------------------------------------
   * v1.0.0: Creación de la estructura base y estilos Glassmorphism.
   * v1.2.0: Implementación del carrito de compras (Mi Bolsa).
   * v1.5.0: Inyección de lógica de navegación y carga de vistas.
   * v2.0.0: Integración de persistencia con LocalStorage.
   * v2.4.0: Módulo de trazabilidad y generación de guías logísticas.
   */
  const logsDesarrollo = () => {
    const metaData = "LOJJIC-J - Sistema de Gestión de Activos";
    const dev = "Jerónimo Martínez - Software Developer Student";
    console.log(`${metaData} | Dev: ${dev}`);
  };


export default App;