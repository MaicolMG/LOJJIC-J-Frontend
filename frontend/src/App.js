import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * COMPONENTE DE RESPALDO PARA CHECKOUT
 * En caso de que el archivo externo no esté disponible
 */
const CheckoutFallback = ({ carrito, total, onFinalizar }) => (
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
          onChange={e => setDatos({...datos, nombre: e.target.value})} />
        <input type="text" placeholder="Dirección de Entrega" required style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }} 
          onChange={e => setDatos({...datos, direccion: e.target.value})} />
        <input type="text" placeholder="Ciudad" required style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }} 
          onChange={e => setDatos({...datos, ciudad: e.target.value})} />
        <h3 style={{ textAlign: 'center' }}>Total a Pagar: ${total.toLocaleString()}</h3>
        <button type="submit" className="btn-oro" style={{ padding: '20px' }}>PROCESAR DESPACHO FINAL</button>
      </form>
    </div>
  );
};

function App() {
  /**
   * ESTADOS GLOBALES DE LA APLICACIÓN
   * Manejan la reactividad de la interfaz y persistencia temporal
   */
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState('inicio'); 
  const [listaProductos, setListaProductos] = useState([]); // FIX: Definición del estado faltante
  const [sedeSeleccionada, setSedeSeleccionada] = useState("");
  const [loadingWidth, setLoadingWidth] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [tiempo, setTiempo] = useState({ h: 24, m: 0, s: 0 });
  const [metodoPago, setMetodoPago] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombreRegistro, setNombreRegistro] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCat, setFiltroCat] = useState("Todos");
  const [incidencias, setIncidencias] = useState([]);
  const [usuariosActivos, setUsuariosActivos] = useState(8);
  const [intentosLogin, setIntentosLogin] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [mfaToken, setMfaToken] = useState("");
  const [esperandoMFA, setEsperandoMFA] = useState(false);

/**
   * MÓDULO DE REFERENCIAS TÉCNICAS Y CATALOGACIÓN GLOBAL
   * Este objeto simula la persistencia de datos de una base de datos MongoDB.
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
   * BASE DE DATOS DE PRODUCTOS
   * Listado de activos tecnológicos de alta gama
   */
  const productos = [
    { 
      id: 1, 
      nombre: 'Apple MacBook Pro M3 Max', 
      precio: 15499000, 
      cat: 'Portátiles', 
      img: 'https://m.media-amazon.com/images/I/618S69vK6mL._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'Arquitectura Chip M3 Max de Apple, 36GB de Memoria RAM Unificada, Almacenamiento SSD de 1TB de alta velocidad.', 
      stock: 12 
    },
    { 
      id: 2, 
      nombre: 'Samsung Galaxy S24 Ultra', 
      precio: 6899000, 
      cat: 'Móviles', 
      img: 'https://m.media-amazon.com/images/I/71RZA9Lpg8L._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'Procesador Snapdragon 8 Gen 3 for Galaxy, Cámara Principal de 200MP con IA, Pantalla Dynamic AMOLED 2X.', 
      stock: 25 
    },
    { 
      id: 3, 
      nombre: 'Sony PlayStation 5 Slim', 
      precio: 2499000, 
      cat: 'Consolas', 
      img: 'https://m.media-amazon.com/images/I/510uTHyDqGL._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'Nueva versión Slim con SSD de 1TB, Soporte para Ray Tracing, Gráficos 4K HDR y Audio 3D Tempest.', 
      stock: 8 
    },
    { 
      id: 4, 
      nombre: 'ASUS ROG Zephyrus G14', 
      precio: 9500000, 
      cat: 'Portátiles', 
      img: 'https://m.media-amazon.com/images/I/71fVp89666L._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'GPU NVIDIA RTX 4070, Procesador AMD Ryzen 9, Pantalla ROG Nebula Display de 14 pulgadas a 165Hz.', 
      stock: 5 
    },
    { 
      id: 5, 
      nombre: 'Dell XPS 15 9530', 
      precio: 11200000, 
      cat: 'Portátiles', 
      img: 'https://m.media-amazon.com/images/I/71vF9592SGL._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'Pantalla OLED 3.5K Touch, Intel Core i9 de 13ª Gen, 32GB RAM, NVIDIA RTX 4060. Elegancia y potencia.', 
      stock: 7 
    },
    { 
      id: 6, 
      nombre: 'Nintendo Switch OLED', 
      precio: 1850000, 
      cat: 'Consolas', 
      img: 'https://m.media-amazon.com/images/I/61-P3fS79RL._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'Pantalla OLED de 7 pulgadas, colores vibrantes y contraste nítido. Soporte ajustable y audio mejorado.', 
      stock: 15 
    },
    { 
      id: 7, 
      nombre: 'iPhone 15 Pro Max', 
      precio: 5999000, 
      cat: 'Móviles', 
      img: 'https://m.media-amazon.com/images/I/81Os1nePVpL._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'Diseño en Titanio aeroespacial, Chip A17 Pro, Sistema de cámaras Pro con Teleobjetivo de 5x.', 
      stock: 20 
    },
    { 
      id: 8, 
      nombre: 'Microsoft Xbox Series X', 
      precio: 2350000, 
      cat: 'Consolas', 
      img: 'https://m.media-amazon.com/images/I/61JG6lo9KWL._AC_UF1000,1000_QL80_.jpg', 
      detalles: 'La consola más potente del mundo. 12 Teraflops, 4K nativo y lista para 8K. SSD de 1TB NVMe.', 
      stock: 10 
    }
  ];

  const logsDesarrollo = () => {
    const metaData = "LOJJIC-J - Sistema de Gestión de Activos";
    const dev = "Jerónimo Martínez - Software Developer Student";
    console.log(`${metaData} | Dev: ${dev}`);
  };

  /**
   * ESTADOS DE GESTIÓN LOGÍSTICA - MÓDULO DE ALISTAMIENTO
   * Controlan el flujo de picking y la trazabilidad de activos en bodega.
   */

  /**
   * EFECTO INICIAL: CARGA DE DATOS Y TEMPORIZADOR
   */
  useEffect(() => {
    // Cargar carrito desde LocalStorage para persistencia
    const carritoGuardado = localStorage.getItem('sigid_cart');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    // Inicializar el catálogo con los productos (esto permite que Android Studio actualice la lista luego)
    setListaProductos(productos);

    // Aplicar variables de tema
    document.documentElement.style.setProperty('--bg-color', darkMode ? '#050505' : '#f8fafc');
    document.documentElement.style.setProperty('--text-color', darkMode ? '#ffffff' : '#0a0a0a');
    
    logsDesarrollo();
    
    const intervalTimer = setInterval(() => {
      setTiempo(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, [darkMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Guardar en LocalStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('sigid_cart', JSON.stringify(carrito));
  }, [carrito]);

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
   * GENERADOR DE DOCUMENTOS PDF
   * Crea la guía de despacho oficial en formato PDF
   */
  const generarPDFDespacho = (guia, items) => {
    const doc = new jsPDF();
    
    // Encabezado Corporativo
    doc.setFontSize(20);
    doc.setTextColor(184, 134, 11);
    doc.text("LOJJIC-J SISTEMAS S.A.S", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Guía de Despacho: ${guia.id_guia}`, 15, 35);
    doc.text(`Fecha: ${guia.fecha_emision}`, 15, 40);
    doc.text(`Sede de Origen: ${sedeSeleccionada}`, 15, 45);

    // Tabla de Activos
    const tableRows = items.map(p => [p.id, p.nombre, p.cat, `$${p.precio.toLocaleString()}`]);
    doc.autoTable({
      startY: 55,
      head: [['ID', 'Activo Tecnológico', 'Categoría', 'Valor']],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [184, 134, 11] }
    });

    doc.text(`VALOR TOTAL DECLARADO: $${guia.valor_declarado.toLocaleString()}`, 15, doc.lastAutoTable.finalY + 15);
    doc.save(`${guia.id_guia}_SIGID.pdf`);
  };

  const generarPDFAuditoria = () => {
    const doc = new jsPDF();
    doc.text("REPORTE DE AUDITORÍA SIGID", 10, 10);
    doc.save("auditoria_sistema.pdf");
  };

  /**
   * VALIDACIÓN DE INTEGRIDAD DE BODEGA
   * Verifica que los activos seleccionados coincidan con el inventario disponible.
   */
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

      generarPDFDespacho(nuevaGuia, carrito);

      // Actualizamos el historial para que el Admin lo vea en su panel
      setCarrito([]);
      setMostrarCarrito(false);
      mostrarMensaje(`EXITO: Guía ${nuevaGuia.id_guia} generada. Activos en ruta.`);
    }
  };

  /**
   * GESTIÓN DE INCIDENCIAS OPERATIVAS
   */
  const reportarIncidencia = () => {
    const motivo = prompt("Describa la novedad o incidencia en bodega:");
    if (motivo) {
      const nuevaIncidencia = { id: Date.now(), motivo, fecha: new Date().toLocaleString(), estado: 'Pendiente' };
      setIncidencias([nuevaIncidencia, ...incidencias]);
      mostrarMensaje("SISTEMA: Incidencia registrada y enviada a supervisión.");
    }
  };

  // Logic for filtering products
  const productosFiltrados = listaProductos.filter(p => 
    (filtroCat === "Todos" || p.cat === filtroCat) &&
    (p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  /**
   * CONTROL DE ACCESO CORPORATIVO
   * Valida las credenciales de los usuarios ADSO
   */
  const manejarLogin = (e) => {
    e.preventDefault();
    
    if (bloqueado) {
      mostrarMensaje("SISTEMA BLOQUEADO: Demasiados intentos fallidos. Contacte a seguridad.");
      return;
    }

    if (isRegistering) {
      mostrarMensaje(`REGISTRO EXITOSO: Bienvenido ${nombreRegistro}. Ya puedes iniciar sesión.`);
      setIsRegistering(false);
      return;
    }

    // Simulación de validación de Segundo Factor (MFA)
    if (esperandoMFA) {
      if (mfaToken === "123456") {
        mostrarMensaje("MFA VERIFICADO: Identidad confirmada.");
        setEsperandoMFA(false);
        cambiarVista(vista === 'admin' ? 'panel-admin' : 'panel-empleado');
      } else {
        mostrarMensaje("ERROR: Token MFA inválido.");
      }
      return;
    }

    // En Android Studio, estas credenciales vendrán de un servicio de Auth
    const ADMIN_USER = process.env.REACT_APP_ADMIN_EMAIL || "admin@lojjic.com";
    const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS || "ADSO2026";

    if (email === ADMIN_USER && pass === ADMIN_PASS) {
      mostrarMensaje("CREDENCIALES CORRECTAS: Se ha enviado un código MFA a su dispositivo.");
      setEsperandoMFA(true);
      setIntentosLogin(0);
    } else {
      const nuevosIntentos = intentosLogin + 1;
      setIntentosLogin(nuevosIntentos);
      
      if (nuevosIntentos >= 3) {
        setBloqueado(true);
        mostrarMensaje("ALERTA DE SEGURIDAD: Acceso denegado. IP registrada en lista negra.");
        console.error("POSIBLE ATAQUE DE FUERZA BRUTA DETECTADO");
      } else {
        mostrarMensaje(`ERROR: Credenciales inválidas. Intento ${nuevosIntentos} de 3.`);
      }
    }
  };

  /*
   * GESTIÓN DEL CARRITO DE COMPRAS
   * Permite añadir y eliminar productos con IDs únicos temporales
   */
  const añadirAlCarrito = (p) => {
    const itemConId = { ...p, tempId: Date.now() + Math.random() };
    setCarrito([...carrito, itemConId]);
    // alert(`¡Excelente elección! Has seleccionado: ${p.nombre}`); // Removido por ser intrusivo
    mostrarMensaje(`SISTEMA: El producto ${p.nombre} ha sido indexado en su bolsa correctamente.`);
  };

  const eliminarDelCarrito = (tempId) => {
    setCarrito(carrito.filter(item => item.tempId !== tempId));
    mostrarMensaje("SISTEMA: Producto removido de la orden actual.");
  };

  const manejarRecuperacion = () => {
    mostrarMensaje("SISTEMA: Se ha enviado un enlace de recuperación a su correo corporativo.");
    console.log("Solicitud de recuperación de contraseña iniciada.");
  };

  /* 
   * Nota: Se eliminó el segundo useEffect duplicado que causaba advertencias de redundancia.
   */

  const totalCalculado = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="bg-lines">
        <div className="line" style={{ left: '20%', animationDelay: '0s' }}></div>
        <div className="line" style={{ left: '50%', animationDelay: '2s' }}></div>
        <div className="line" style={{ left: '80%', animationDelay: '4s' }}></div>
      </div>

      {/* COMPONENTES DE INTERFAZ GLOBAL */}
      <div className="top-loader" style={{ width: `${loadingWidth}%` }}></div>
      {mensajeActivo && <div className="toast fade-in">{mensajeActivo}</div>}
      
      {/* BARRA DE NAVEGACIÓN SUPERIOR */}
      <nav style={{ 
        padding: '25px 80px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: darkMode ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(20px)',
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        borderBottom: '1px solid rgba(184, 134, 11, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', cursor: 'pointer' }} onClick={() => cambiarVista('inicio')}>
          <div className="logo-box">LOJJ-J</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Syncopate', letterSpacing: '4px', fontSize: '1rem', color: darkMode ? '#fff' : '#111', fontWeight: 'bold' }}>
              LOJJIC-J <span style={{color: '#b8860b'}}>SISTEMAS</span>
            </span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '2px', color: '#9ca3af', fontWeight: '800' }}>TECNOLOGÍA E INGENIERÍA</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
          <span className="nav-item" onClick={() => cambiarVista('tienda')}>CATÁLOGO</span>
          <span className="nav-item" onClick={() => cambiarVista('empleado')}>LOGÍSTICA</span>
          <span className="nav-item" onClick={() => cambiarVista('admin')}>ADMINISTRACIÓN</span>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
            title="Cambiar Tema"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          
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
          <div className="hero-container" style={{ textAlign: 'center' }}>
            <div className="hero-badge fade-in">
              <span style={{ marginRight: '10px' }}>💎</span>
              ACCESO EXCLUSIVO: {tiempo.h}H {tiempo.m}M {tiempo.s}S
            </div>
            
            <h1 style={{ 
              fontFamily: 'Syncopate', 
              fontSize: '6.5rem', 
              color: darkMode ? '#fff' : '#111', 
              marginTop: '0', 
              lineHeight: '0.9',
              letterSpacing: '-2px'
            }}>
              ELITE <br/> 
              <span style={{ color: '#b8860b', fontSize: '6.5rem', textShadow: '0 0 30px rgba(184, 134, 11, 0.3)' }}>HARDWARE</span>
            </h1>
            
            <p style={{ 
              color: darkMode ? '#94a3b8' : '#4b5563', 
              maxWidth: '850px', 
              margin: '40px auto', 
              fontSize: '1.3rem', 
              lineHeight: '1.8',
              fontWeight: '400'
            }}>
              No vendemos equipos, entregamos el poder para dominar el ecosistema digital. 
              Ingeniería de precisión para la nueva era del software.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
              <button 
                className="btn-oro" 
                style={{ padding: '25px 60px', fontSize: '1.2rem' }} 
                onClick={() => cambiarVista('tienda')}
              >
                EXPLORAR EQUIPOS
              </button>
            </div>

            <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '50px', opacity: 0.6 }}>
              {['PREMIUM QUALITY', 'GLOBAL SHIPPING', '24/7 SUPPORT', 'SECURE PAY'].map((text) => (
                <span key={text} style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>✓ {text}</span>
              ))}
            </div>
          </div>
        )}

        {/* SECCIÓN 2: CATÁLOGO DE PRODUCTOS */}
        {vista === 'tienda' && (
          <div style={{ padding: '80px 10%' }}>
            <div style={{ marginBottom: '60px', textAlign: 'left' }}>
              <h2 style={{ fontFamily: 'Syncopate', fontSize: '2.5rem', color: darkMode ? '#fff' : '#111' }}>
                CATÁLOGO DE <span style={{color: '#b8860b'}}>ACTIVOS</span>
              </h2>
              <div style={{ width: '80px', height: '4px', background: '#b8860b', marginTop: '15px' }}></div>
            </div>

            <div style={{ marginBottom: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="¿Qué potencia necesitas hoy?..." 
                style={{ flex: 2, margin: 0, background: darkMode ? '#111' : '#f9fafb', color: darkMode ? '#fff' : '#000' }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                style={{ flex: 1, padding: '15px', borderRadius: '14px', border: '2px solid #e5e7eb', fontFamily: 'Outfit' }}
                onChange={(e) => setFiltroCat(e.target.value)}
              >
                <option value="Todos">Todas las Categorías</option>
                <option value="Portátiles">Portátiles</option>
                <option value="Móviles">Móviles</option>
                <option value="Consolas">Consolas</option>
              </select>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
              gap: '50px' 
            }}>
              {productosFiltrados.length > 0 ? productosFiltrados.map(p => (
                <div key={p.id} className="glass-card" style={{ 
                  padding: '40px', 
                  textAlign: 'center', 
                  background: darkMode ? 'rgba(255,255,255,0.02)' : '#ffffff' }}>
                  <img 
                    src={p.img} 
                    alt={p.nombre}
                    style={{ 
                      width: '100%', 
                      height: '220px', 
                      objectFit: 'contain', 
                      marginBottom: '20px',
                      borderRadius: '12px',
                      filter: darkMode ? 'drop-shadow(0 0 15px rgba(184, 134, 11, 0.2))' : 'none'
                    }} 
                  />
                  <h3 style={{ fontSize: '1.5rem', color: darkMode ? '#fff' : '#111', fontWeight: '800', letterSpacing: '-0.5px' }}>{p.nombre}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '20px 0', minHeight: '60px', lineHeight: '1.6' }}>
                    {p.detalles}
                  </p>
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold' }}>🛡️ GARANTÍA EXTENDIDA DISPONIBLE</span>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Soporte técnico 24/7 LOJJIC-CARE</div>
                  </div>
                  <div style={{ 
                    marginTop: 'auto', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : '#f3f4f6'}`, 
                    paddingTop: '25px' 
                  }}>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ display: 'block', fontSize: '0.7rem', color: '#9ca3af', fontWeight: 'bold' }}>PRECIO NETO</span>
                      <span style={{ fontSize: '1.6rem', fontWeight: '900', color: darkMode ? '#fff' : '#111' }}>
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
              )) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
                  <p style={{ color: '#9ca3af' }}>No se encontraron activos que coincidan con su búsqueda.</p>
                </div>
              )}
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
          }} 
          className="glass-card">
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
              {!esperandoMFA ? (
                <>
                  {isRegistering && (
                    <div style={{ marginBottom: '5px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563', marginLeft: '5px' }}>NOMBRE COMPLETO</label>
                      <input 
                        type="text" 
                        placeholder="Juan Pérez" 
                        style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e5e7eb', marginTop: '5px' }}
                        required 
                        onChange={(e) => setNombreRegistro(e.target.value)} 
                      />
                    </div>
                  )}
                  <div style={{ marginBottom: '5px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563', marginLeft: '5px' }}>IDENTIFICADOR</label>
                    <input 
                      type="email" 
                      placeholder="correo@ejemplo.com" 
                      style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e5e7eb', marginTop: '5px' }}
                      required 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563', marginLeft: '5px' }}>{isRegistering ? 'CONTRASEÑA' : 'TOKEN DE SEGURIDAD'}</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••" 
                      style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e5e7eb', marginTop: '5px' }}
                      required 
                      onChange={(e) => setPass(e.target.value)} 
                    />
                  </div>
                </>
              ) : (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#b8860b', marginLeft: '5px' }}>CÓDIGO DE VERIFICACIÓN (MFA)</label>
                  <input 
                    type="text" 
                    placeholder="Ingrese el código de 6 dígitos" 
                    style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #b8860b', marginTop: '5px' }}
                    maxLength="6"
                    required 
                    onChange={(e) => setMfaToken(e.target.value)} 
                  />
                  <p style={{fontSize: '0.7rem', color: '#6b7280'}}>Prueba con: 123456</p>
                </div>
              )}
              <button 
                type="submit" 
                className="btn-oro" 
                style={{ width: '100%', padding: '22px', marginTop: '15px', fontSize: '1rem' }}
                disabled={bloqueado}
              >
                {bloqueado ? 'ACCESO RESTRINGIDO' : esperandoMFA ? 'VERIFICAR IDENTIDAD' : isRegistering ? 'CREAR CUENTA' : 'ACCEDER AL NÚCLEO'}
              </button>
              <p 
                style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8rem' }}
              >
                <span 
                  onClick={() => setIsRegistering(!isRegistering)}
                  style={{ cursor: 'pointer', color: '#b8860b', fontWeight: 'bold', marginRight: '15px' }}
                >
                  {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                </span>
                {!isRegistering && (
                  <span 
                    onClick={manejarRecuperacion}
                    style={{ cursor: 'pointer', color: '#6b7280', textDecoration: 'underline' }}>
                    ¿Olvidaste tu contraseña?
                  </span>
                )}
              </p>
            </form>
          </div>
        )}

        {/* SECCIÓN 4: DASHBOARD ADMINISTRADOR */}
        {vista === 'panel-admin' && (
          <div style={{ padding: '80px 10%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontFamily: 'Syncopate', color: darkMode ? '#fff' : '#111', margin: 0 }}>
                CONSOLA <span style={{color:'#b8860b'}}>ADMIN</span>
              </h2>
              <div style={{ color: '#6b7280', fontWeight: '600' }}>
                <span style={{ 
                  background: '#10b981', 
                  color: '#fff', 
                  padding: '4px 10px', 
                  borderRadius: '4px', 
                  fontSize: '0.7rem', 
                  marginRight: '10px' 
                }}>🔒 CONEXIÓN SEGURA SSL/TLS 1.3</span>
                Sesión: <span style={{color: '#b8860b'}}>J. Martínez</span> | <span style={{fontSize: '0.8rem'}}>{DATABASE_LOGYTECH.versionamiento.version}</span>
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
                <span className="stat-badge">INFRAESTRUCTURA</span>
                <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Integridad del Sistema</h4>
                <h2 style={{margin:0, color:'#10b981', fontSize:'2.8rem', fontWeight: '900'}}>ÓPTIMO</h2>
                <div style={{ marginTop: '20px', color: '#6b7280' }}>Latencia: 14ms | Uptime: 99.9%</div>
              </div>

              <div className="glass-card" style={{ padding: '40px', background: darkMode ? '#1e293b' : '#fff' }}>
                <span className="stat-badge">RECURSOS HUMANOS</span>
                <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Personal en Turno</h4>
                <h2 style={{margin:0, fontSize:'2.8rem', fontWeight: '900', color: darkMode ? '#fff' : '#111'}}>{usuariosActivos < 10 ? `0${usuariosActivos}` : usuariosActivos}</h2>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => setUsuariosActivos(prev => prev + 1)} style={{padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #b8860b', background: 'none', color: '#b8860b'}}>+ Alta</button>
                  <button onClick={() => setUsuariosActivos(prev => Math.max(0, prev - 1))} style={{padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ff4d4d', background: 'none', color: '#ff4d4d'}}>- Baja</button>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '40px', background: darkMode ? '#1e293b' : '#fff' }}>
                <span className="stat-badge">CONTROL DE ACCESO</span>
                <h4 style={{margin:'25px 0 10px 0', color: '#6b7280', fontWeight: '500'}}>Estado del Firewall</h4>
                <h2 style={{margin:0, color:'#10b981', fontSize:'2.2rem', fontWeight: '900'}}>ACTIVO</h2>
                <button className="btn-oro" style={{ marginTop: '20px', padding: '10px', fontSize: '0.7rem', width: '100%' }} onClick={() => mostrarMensaje("SISTEMA: Reiniciando protocolos de seguridad...")}>
                  REINICIAR FIREWALL
                </button>
              </div>

              <div className="glass-card" style={{ padding: '40px', gridColumn: 'span 3', background: darkMode ? '#1e293b' : '#fff' }}>
                <span className="stat-badge">LOGS DE ACTIVIDAD RECIENTE</span>
                <div style={{ marginTop: '20px' }}>
                  {[
                    { t: '10:45 AM', m: 'Despacho GUIA-4421 procesado por J. Martínez', s: 'success' },
                    { t: '09:12 AM', m: 'Alerta de Stock: MacBook Pro M3 Max bajo (12)', s: 'warning' },
                    { t: '08:00 AM', m: 'Sincronización MongoDB Atlas completada', s: 'info' }
                  ].map((log, i) => (
                    <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
                      <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>{log.t}</span>
                      <span style={{ color: darkMode ? '#cbd5e1' : '#4b5563' }}>{log.m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                  <button className="btn-oro" style={{ padding: '10px 20px', fontSize: '0.7rem' }}>VER TODOS LOS REGISTROS</button>
                  <button className="btn-oro" style={{ padding: '10px 20px', fontSize: '0.7rem', background: '#111827' }} onClick={generarPDFAuditoria}>EXPORTAR AUDITORÍA</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECCIÓN 6: CHECKOUT / DESPACHO */}
        {vista === 'checkout' && (
          <div style={{ padding: '80px 10%' }}>
            <Checkout 
              carrito={carrito} 
              total={totalCalculado} 
              onFinalizar={(datosEnvio) => procesarSalidaActivos(datosEnvio)} 
            />
            <button className="nav-item" style={{marginTop: '20px', border: 'none', background: 'none'}} onClick={() => cambiarVista('tienda')}>← Volver al catálogo</button>
          </div>
        )}

        {/* SECCIÓN 5: PANEL OPERACIONES (LOGÍSTICA) */}
        {vista === 'panel-empleado' && (
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
              <div className="glass-card" style={{ padding: '25px', textAlign: 'center', cursor: 'pointer' }} onClick={() => alert(`Capacidad actual: ${DATABASE_LOGYTECH.sedes[0].capacidad}`)}>
                <div style={{ fontSize: '2rem' }}>🏗️</div>
                <h4 style={{ margin: '10px 0' }}>Estado de Bodega</h4>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '50px', background: darkMode ? 'rgba(255,255,255,0.05)' : '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h3 style={{ margin: 0, color: darkMode ? '#fff' : '#111', fontSize: '1.5rem' }}>Gestión de Stocks - Sede Principal</h3>
                <button className="btn-oro" style={{ padding: '12px 25px', fontSize: '0.8rem' }}>DESCARGAR REPORTE</button>
              </div>

              {incidencias.length > 0 && (
                <div style={{ marginBottom: '30px', padding: '20px', background: '#fff5f5', borderRadius: '12px', border: '1px solid #feb2b2' }}>
                  <h4 style={{ color: '#c53030', marginTop: 0 }}>Incidencias Recientes</h4>
                  {incidencias.map(inc => (
                    <div key={inc.id} style={{ fontSize: '0.85rem', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>{inc.fecha}:</strong> {inc.motivo}</span>
                      <span style={{ 
                        background: '#fed7d7', color: '#9b2c2c', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' 
                      }}>{inc.estado}</span>
                    </div>
                  ))}
                </div>
              )}

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
                      <td style={{ fontWeight:'700', color: darkMode ? '#fff' : '#111' }}>{p.nombre}</td>
                      <td style={{ color: darkMode ? '#cbd5e1' : '#4b5563' }}>{p.stock} Unidades Físicas</td>
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
        background: darkMode ? '#0a0a0a' : '#ffffff', 
        borderTop: `1px solid ${darkMode ? '#333' : '#e5e7eb'}` 
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
            <p style={{ fontSize: '1rem', color: darkMode ? '#94a3b8' : '#4b5563', lineHeight: '1.9', fontWeight: '300' }}>
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
            <p style={{ fontSize: '0.9rem', color: darkMode ? '#94a3b8' : '#4b5563', lineHeight: '1.8' }}>
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
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563' }}>SEDE DE DESPACHO</label>
            <select 
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e5e7eb', marginTop: '10px', fontFamily: 'Outfit' }}
              onChange={(e) => setSedeSeleccionada(e.target.value)}
              value={sedeSeleccionada}
            >
              <option value="">Seleccione origen...</option>
              {DATABASE_LOGYTECH.sedes.map(s => (
                <option key={s.id} value={s.nombre}>{s.nombre} ({s.capacidad} stock)</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4b5563' }}>MÉTODO DE PAGO</label>
            <select 
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid #e5e7eb', marginTop: '10px', fontFamily: 'Outfit' }}
              onChange={(e) => setMetodoPago(e.target.value)}
              value={metodoPago}
            >
              <option value="">Seleccione una opción...</option>
              <option value="PSE">PSE - Transferencia Bancaria</option>
              <option value="TC">Tarjeta de Crédito (Visa/Mastercard)</option>
              <option value="Bancolombia">Botón Bancolombia</option>
              <option value="Efecty">Efecty / Su Red</option>
            </select>
          </div>

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
              opacity: (carrito.length === 0 || !metodoPago || !sedeSeleccionada) ? 0.5 : 1,
              cursor: (carrito.length === 0 || !metodoPago || !sedeSeleccionada) ? 'not-allowed' : 'pointer'
            }} 
            disabled={carrito.length === 0 || !metodoPago || !sedeSeleccionada}
            onClick={() => {
              setMostrarCarrito(false);
              cambiarVista('checkout');
            }}
          >
            {(!metodoPago || !sedeSeleccionada) ? 'COMPLETAR DATOS' : `PAGAR CON ${metodoPago}`}
          </button>
        </div>
      </div>
    </div>
    );
  }

export default App;
 