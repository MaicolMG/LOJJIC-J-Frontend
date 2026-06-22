# ESPECIFICACIÓN DE REQUISITOS DE SOFTWARE (ERS)
## SISTEMA DE GESTIÓN DE INVENTARIO Y DESPACHO (SIGID)

---

**Proyecto:** SIGID - Sistema de Gestión de Inventario y Despacho  
**Programa:** Análisis y Desarrollo de Software (ADSO) Virtual  
**Ficha:** 3134555  
**Fecha:** [Fecha actual]  
**Versión:** 2.4.0  
**Estado:** Aprobado

---

## ÍNDICE

1. Introducción
2. Descripción General
3. Requisitos Funcionales
4. Requisitos No Funcionales
5. Interfaces Externas
6. Restricciones del Sistema
7. Casos de Uso
8. Matriz de Trazabilidad

---

## 1. INTRODUCCIÓN

### 1.1 Propósito
Este documento especifica los requisitos funcionales y no funcionales del Sistema de Gestión de Inventario y Despacho (SIGID) v2.4.0, destinado a optimizar los procesos logísticos de empresas tecnológicas.

### 1.2 Alcance
SIGID es una solución integral compuesta por:
- Aplicación Web (Frontend React.js)
- API REST (Backend Node.js/Express)
- Aplicación Móvil Android (Kotlin)
- Base de Datos MongoDB

### 1.3 Definiciones, Acrónimos y Abreviaturas
- **SIGID:** Sistema de Gestión de Inventario y Despacho
- **API:** Application Programming Interface
- **REST:** Representational State Transfer
- **MFA:** Multi-Factor Authentication
- **PDF:** Portable Document Format
- **CRUD:** Create, Read, Update, Delete
- **UI/UX:** User Interface / User Experience

### 1.4 Referencias
- IEEE Std 830-1998: Guía para especificación de requisitos
- Documentación técnica React.js v18
- Documentación MongoDB Atlas
- Material Design 3 Guidelines

### 1.5 Visión General
El documento se estructura en secciones que describen requisitos funcionales, no funcionales, interfaces, restricciones y casos de uso del sistema.

---

## 2. DESCRIPCIÓN GENERAL

### 2.1 Perspectiva del Producto
SIGID es un sistema independiente que se integra con los procesos operativos de empresas de logística tecnológica, automatizando:
- Control de inventario
- Procesos de picking y packing
- Generación de guías de despacho
- Trazabilidad de activos

### 2.2 Funciones del Producto
1. Gestión de catálogo de productos tecnológicos
2. Control de stock en tiempo real
3. Registro de movimientos de inventario
4. Generación automática de guías PDF
5. Sistema de autenticación corporativa
6. Panel administrativo con métricas
7. Panel logístico operativo
8. Aplicación móvil para operadores de bodega

### 2.3 Características de los Usuarios

| Tipo de Usuario | Descripción | Funciones |
|-----------------|-------------|-----------|
| **Administrador** | Gerente general o supervisor | Acceso total, configuración del sistema, reportes |
| **Operador Logístico** | Personal de bodega | Gestión de inventario, registro de movimientos |
| **Cliente Final** | Usuario externo (futuro) | Consulta de catálogo, creación de órdenes |

### 2.4 Restricciones
- Sistema web debe ser compatible con navegadores modernos (Chrome, Firefox, Edge)
- Aplicación Android requiere API Level 24+ (Android 7.0+)
- Conexión a internet obligatoria para operación completa
- Base de datos centralizada en MongoDB Atlas

### 2.5 Suposiciones y Dependencias
- Los usuarios tienen conocimientos básicos de informática
- Infraestructura de red empresarial estable
- Disponibilidad de dispositivos Android para operadores
- Acceso a servicios cloud (MongoDB Atlas, hosting web)

---

## 3. REQUISITOS FUNCIONALES

### RF-001: Gestión de Usuarios y Autenticación

**RF-001.1 - Login de Usuario**
- **Descripción:** El sistema debe permitir login con email y contraseña
- **Entrada:** Email, contraseña
- **Proceso:** Validación contra base de datos
- **Salida:** Token de sesión y redirección a panel correspondiente
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-001.2 - Autenticación de Dos Factores (MFA)**
- **Descripción:** Sistema de verificación con código de 6 dígitos
- **Entrada:** Código MFA
- **Proceso:** Validación del código temporal
- **Salida:** Confirmación de identidad
- **Prioridad:** Media
- **Estado:** Implementado

**RF-001.3 - Control de Acceso por Roles**
- **Descripción:** Permisos diferenciados según rol (Admin, Operador)
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-001.4 - Recuperación de Contraseña**
- **Descripción:** Envío de enlace de recuperación por email
- **Prioridad:** Media
- **Estado:** Pendiente

### RF-002: Gestión de Productos/Activos

**RF-002.1 - Visualizar Catálogo de Productos**
- **Descripción:** Lista de productos con información detallada
- **Atributos mostrados:** ID, nombre, precio, categoría, stock, imagen
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-002.2 - Búsqueda y Filtrado**
- **Descripción:** Búsqueda por nombre y filtrado por categoría
- **Opciones de categoría:** Portátiles, Móviles, Consolas
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-002.3 - Detalle de Producto**
- **Descripción:** Vista detallada con especificaciones técnicas
- **Prioridad:** Media
- **Estado:** Implementado

**RF-002.4 - Gestión CRUD de Productos (Admin)**
- **Descripción:** Crear, editar, eliminar productos
- **Prioridad:** Alta
- **Estado:** Pendiente (backend preparado)

### RF-003: Gestión de Carrito y Órdenes

**RF-003.1 - Agregar Producto al Carrito**
- **Descripción:** Añadir items al carrito de compra
- **Validación:** Verificar disponibilidad de stock
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-003.2 - Visualizar Carrito**
- **Descripción:** Lista de productos seleccionados con total
- **Información mostrada:** Nombre, precio, cantidad, subtotal
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-003.3 - Eliminar Item del Carrito**
- **Descripción:** Remover productos individuales
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-003.4 - Seleccionar Sede de Despacho**
- **Descripción:** Elegir origen del despacho
- **Opciones:** Chía, Chiquinquirá, Zipaquirá
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-003.5 - Seleccionar Método de Pago**
- **Descripción:** Elección de forma de pago
- **Opciones:** PSE, Tarjeta de Crédito, Bancolombia, Efecty
- **Prioridad:** Media
- **Estado:** Implementado (sin procesamiento real)

### RF-004: Gestión de Despachos

**RF-004.1 - Generar Guía de Despacho**
- **Descripción:** Crear guía en formato PDF
- **Contenido:** ID guía, fecha, sede origen, lista de activos, valor total
- **Formato:** Tabla estructurada con encabezado corporativo
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-004.2 - Validar Disponibilidad en Bodega**
- **Descripción:** Verificar stock antes de procesar despacho
- **Proceso:** Simulación de latencia de BD (800ms)
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-004.3 - Registrar Salida de Activos**
- **Descripción:** Actualizar inventario tras despacho
- **Prioridad:** Alta
- **Estado:** Implementado (en memoria)

**RF-004.4 - Historial de Guías**
- **Descripción:** Consultar guías generadas
- **Prioridad:** Media
- **Estado:** Pendiente

### RF-005: Panel Administrativo

**RF-005.1 - Dashboard con Métricas**
- **Descripción:** Panel con KPIs del negocio
- **Métricas mostradas:**
  - Ventas consolidadas
  - Estado del sistema
  - Personal en turno
  - Estado del firewall
- **Prioridad:** Alta
- **Estado:** Implementado (datos mockeados)

**RF-005.2 - Logs de Actividad**
- **Descripción:** Registro de eventos del sistema
- **Información:** Timestamp, acción, usuario
- **Prioridad:** Media
- **Estado:** Implementado (básico)

**RF-005.3 - Gestión de Usuarios del Sistema**
- **Descripción:** Altas, bajas y modificaciones de personal
- **Prioridad:** Media
- **Estado:** Pendiente

**RF-005.4 - Generar Reporte de Auditoría**
- **Descripción:** Exportar PDF con logs y actividades
- **Prioridad:** Baja
- **Estado:** Implementado (básico)

### RF-006: Panel Logístico

**RF-006.1 - Visualizar Estado de Inventario**
- **Descripción:** Tabla con stock actual de productos
- **Información:** SKU, nombre, cantidad, estado crítico
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-006.2 - Alertas de Stock Crítico**
- **Descripción:** Notificación cuando stock < 10 unidades
- **Visualización:** Indicador rojo "REABASTECER URGENTE"
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-006.3 - Reportar Incidencias**
- **Descripción:** Registrar novedades de bodega
- **Campos:** Motivo, fecha, estado (Pendiente/Resuelta)
- **Prioridad:** Media
- **Estado:** Implementado

**RF-006.4 - Sincronizar Dispositivo Handheld**
- **Descripción:** Activar escáner de radiofrecuencia
- **Prioridad:** Baja
- **Estado:** Mockup (mensaje de confirmación)

**RF-006.5 - Consultar Capacidad de Bodega**
- **Descripción:** Ver porcentaje de ocupación
- **Prioridad:** Media
- **Estado:** Implementado (datos estáticos)

### RF-007: Aplicación Móvil Android

**RF-007.1 - Login Móvil**
- **Descripción:** Autenticación desde dispositivo Android
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-007.2 - Visualizar Catálogo Móvil**
- **Descripción:** Grid de productos adaptado a mobile
- **Layout:** 2 columnas, cards con imagen y precio
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-007.3 - Gestión de Carrito Móvil**
- **Descripción:** Agregar/eliminar items desde Android
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-007.4 - Escaneo de Códigos de Barras**
- **Descripción:** Captura con cámara usando CameraX y ML Kit
- **Prioridad:** Media
- **Estado:** Pendiente (dependencias configuradas)

**RF-007.5 - Navegación por Fragmentos**
- **Descripción:** Bottom Navigation con 4 secciones
- **Secciones:** Catálogo, Carrito, Logística, Admin
- **Prioridad:** Alta
- **Estado:** Implementado

### RF-008: Notificaciones y Alertas

**RF-008.1 - Toast de Confirmación**
- **Descripción:** Mensajes temporales en pantalla
- **Duración:** 4 segundos
- **Ejemplos:** "Producto agregado", "Guía generada"
- **Prioridad:** Media
- **Estado:** Implementado

**RF-008.2 - Alertas de Validación**
- **Descripción:** Mensajes de error en formularios
- **Prioridad:** Alta
- **Estado:** Implementado

**RF-008.3 - Notificaciones Push (Futuro)**
- **Descripción:** Alertas en tiempo real
- **Prioridad:** Baja
- **Estado:** No implementado

---

## 4. REQUISITOS NO FUNCIONALES

### RNF-001: Rendimiento

**RNF-001.1 - Tiempo de Carga**
- Página inicial debe cargar en < 3 segundos
- Consultas a BD deben responder en < 500ms
- Generación de PDF debe completarse en < 2 segundos

**RNF-001.2 - Capacidad**
- Sistema debe soportar 50 usuarios concurrentes
- Base de datos debe manejar 10,000+ registros sin degradación

**RNF-001.3 - Escalabilidad**
- Arquitectura preparada para escalar horizontalmente
- API REST stateless para balanceo de carga

### RNF-002: Seguridad

**RNF-002.1 - Autenticación**
- Contraseñas almacenadas con hash bcrypt
- Tokens JWT para sesiones con expiración

**RNF-002.2 - Autorización**
- Control de acceso basado en roles (RBAC)
- Validación de permisos en cada endpoint

**RNF-002.3 - Protección de Datos**
- Conexiones HTTPS en producción
- Validación de inputs para prevenir inyección SQL/XSS
- CORS configurado para dominios autorizados

**RNF-002.4 - Auditoría**
- Registro de todas las operaciones críticas
- Logs con timestamp y usuario responsable

### RNF-003: Usabilidad

**RNF-003.1 - Interfaz Intuitiva**
- Diseño basado en Material Design 3
- Máximo 3 clics para cualquier funcionalidad
- Feedback visual inmediato en todas las acciones

**RNF-003.2 - Accesibilidad**
- Contraste de colores WCAG AA
- Tamaños de fuente legibles (mínimo 14px)
- Etiquetas descriptivas en formularios

**RNF-003.3 - Responsive Design**
- Adaptación a pantallas desde 320px hasta 4K
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)

### RNF-004: Compatibilidad

**RNF-004.1 - Navegadores Web**
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

**RNF-004.2 - Dispositivos Móviles**
- Android 7.0+ (API Level 24+)
- Resoluciones: 720x1280 hasta 1440x3040

**RNF-004.3 - Sistemas Operativos**
- Backend compatible con Linux, Windows, macOS
- Base de datos multiplataforma

### RNF-005: Mantenibilidad

**RNF-005.1 - Código Limpio**
- Arquitectura MVVM en Android
- Componentes reutilizables en React
- Separación de responsabilidades clara

**RNF-005.2 - Documentación**
- Comentarios en funciones complejas
- README con instrucciones de instalación
- JSDoc/KDoc para métodos públicos

**RNF-005.3 - Control de Versiones**
- Git para versionamiento
- Commits descriptivos
- Ramas por funcionalidad (Git Flow)

### RNF-006: Disponibilidad

**RNF-006.1 - Uptime**
- Disponibilidad objetivo: 99.5%
- Mantenimientos programados fuera de horario laboral

**RNF-006.2 - Recuperación ante Fallos**
- Backups automáticos diarios de MongoDB
- Logs persistentes para debugging

**RNF-006.3 - Tolerancia a Fallos**
- Manejo graceful de errores de red
- Mensajes descriptivos en caso de fallo

### RNF-007: Portabilidad

**RNF-007.1 - Despliegue**
- Backend containerizable con Docker
- Frontend deployable en cualquier CDN
- Base de datos en MongoDB Atlas (cloud)

**RNF-007.2 - Configuración**
- Variables de entorno para configuración
- Separación de config desarrollo/producción

---

## 5. INTERFACES EXTERNAS

### 5.1 Interfaces de Usuario

**Web (React.js):**
- Vista de Inicio (Landing)
- Vista de Catálogo
- Vista de Carrito (Checkout)
- Vista de Login/Registro
- Panel Administrativo
- Panel Logístico

**Móvil (Android):**
- Splash Screen
- Login Activity
- MainActivity con Bottom Navigation
- Fragment Catálogo
- Fragment Carrito
- Fragment Logística
- Fragment Admin

### 5.2 Interfaces de Hardware

- **Cámara:** Para escaneo de códigos de barras (Android)
- **Almacenamiento:** LocalStorage (web), SharedPreferences (Android)
- **Red:** WiFi o datos móviles

### 5.3 Interfaces de Software

**API REST Endpoints:**
```
POST   /api/auth/login
POST   /api/auth/verify-mfa
GET    /api/productos
GET    /api/productos/:id
POST   /api/guias/crear
GET    /api/guias
GET    /api/inventario/stock
```

**Base de Datos:**
- MongoDB Atlas (cloud)
- Puerto: 27017
- Autenticación: Usuario/Contraseña

### 5.4 Interfaces de Comunicación

- **Protocolo:** HTTP/HTTPS
- **Formato de datos:** JSON
- **Codificación:** UTF-8
- **CORS:** Habilitado para dominios autorizados

---

## 6. RESTRICCIONES DEL SISTEMA

### 6.1 Restricciones Técnicas
1. Backend debe ejecutarse en Node.js v16+
2. MongoDB Atlas requiere conexión a internet
3. Android app requiere Gradle 8.0+ y Kotlin 1.8+
4. React app requiere npm 8+ o yarn

### 6.2 Restricciones de Negocio
1. Sistema debe cumplir con protección de datos personales
2. Guías de despacho deben incluir datos legales de la empresa
3. Reportes deben ser auditables

### 6.3 Restricciones de Diseño
1. UI debe seguir la identidad corporativa (oro #B8860B)
2. Glassmorphism como estilo visual principal
3. Material Design 3 para Android

---

## 7. CASOS DE USO PRINCIPALES

### CU-001: Login de Usuario
**Actor:** Usuario (Admin/Operador)  
**Precondición:** Usuario registrado en el sistema  
**Flujo Principal:**
1. Usuario ingresa email y contraseña
2. Sistema valida credenciales
3. Sistema solicita código MFA
4. Usuario ingresa código MFA
5. Sistema valida código
6. Sistema redirige al panel correspondiente

**Flujo Alternativo:**
- 2a. Credenciales inválidas → Mostrar error
- 5a. Código MFA incorrecto → Mostrar error

**Postcondición:** Usuario autenticado con sesión activa

---

### CU-002: Procesar Despacho
**Actor:** Operador Logístico  
**Precondición:** Productos en carrito, sede y método de pago seleccionados  
**Flujo Principal:**
1. Usuario hace clic en "PROCESAR DESPACHO"
2. Sistema valida disponibilidad en bodega
3. Sistema genera guía de despacho PDF
4. Sistema actualiza inventario
5. Sistema vacía el carrito
6. Sistema muestra mensaje de éxito

**Flujo Alternativo:**
- 2a. Stock insuficiente → Mostrar alerta y cancelar

**Postcondición:** Guía generada, inventario actualizado

---

### CU-003: Consultar Stock
**Actor:** Operador Logístico  
**Precondición:** Usuario autenticado  
**Flujo Principal:**
1. Usuario accede al Panel Logístico
2. Sistema muestra tabla de inventario
3. Sistema resalta productos con stock crítico
4. Usuario puede filtrar por SKU o nombre

**Postcondición:** Usuario visualiza estado actual del inventario

---

## 8. MATRIZ DE TRAZABILIDAD

| Requisito | Caso de Uso | Prioridad | Estado | Módulo |
|-----------|-------------|-----------|--------|--------|
| RF-001.1 | CU-001 | Alta | ✅ | Auth |
| RF-001.2 | CU-001 | Media | ✅ | Auth |
| RF-002.1 | CU-003 | Alta | ✅ | Productos |
| RF-003.1 | CU-002 | Alta | ✅ | Carrito |
| RF-004.1 | CU-002 | Alta | ✅ | Despachos |
| RF-005.1 | - | Alta | ✅ | Admin |
| RF-006.1 | CU-003 | Alta | ✅ | Logística |
| RF-007.1 | CU-001 | Alta | ✅ | Móvil |

---

## 9. APROBACIONES

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Equipo Desarrollo | [Nombres] | | |
| Instructor Técnico | [Nombre] | | |
| Cliente (Empresa) | [Nombre] | | |

---

**Fin del Documento**

*Especificación de Requisitos de Software según IEEE 830-1998*  
*Proyecto Formativo ADSO - SENA 2024-2026*
