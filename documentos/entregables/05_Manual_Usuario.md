# MANUAL DE USUARIO
## SISTEMA DE GESTIÓN DE INVENTARIO Y DESPACHO (SIGID)

---

**Versión del Sistema:** 2.4.0  
**Versión del Manual:** 1.0  
**Fecha:** [Fecha actual]  
**Dirigido a:** Usuarios Finales (Administradores y Operadores)

---

## ÍNDICE

1. Introducción
2. Requisitos del Sistema
3. Acceso al Sistema
4. Funcionalidades por Rol
5. Guía de Uso Paso a Paso
6. Preguntas Frecuentes
7. Solución de Problemas
8. Contacto y Soporte

---

## 1. INTRODUCCIÓN

### 1.1 ¿Qué es SIGID?

SIGID (Sistema de Gestión de Inventario y Despacho) es una plataforma web y móvil diseñada para optimizar los procesos logísticos de empresas tecnológicas. Permite:

- ✓ Gestionar inventario de activos en tiempo real
- ✓ Procesar despachos de manera ágil
- ✓ Generar guías automáticas en PDF
- ✓ Controlar stock y alertas
- ✓ Visualizar métricas administrativas

### 1.2 Componentes del Sistema

**Sistema Web (Navegador)**
- Interfaz completa para administración y operaciones
- Accesible desde cualquier computador con internet

**Aplicación Móvil (Android)**
- Versión optimizada para operadores de bodega
- Consulta rápida de inventario
- Escaneo de códigos (próximamente)

### 1.3 Roles de Usuario

| Rol | Acceso | Permisos |
|-----|--------|----------|
| **Administrador** | Completo | Ver métricas, gestionar usuarios, reportes, configuración |
| **Operador Logístico** | Limitado | Gestionar inventario, procesar despachos, reportar incidencias |
| **Cliente** (Futuro) | Restringido | Consultar catálogo, crear órdenes |

---

## 2. REQUISITOS DEL SISTEMA

### 2.1 Para Sistema Web

**Navegadores compatibles:**
- Google Chrome 90+
- Mozilla Firefox 88+
- Microsoft Edge 90+
- Safari 14+

**Conexión:**
- Internet estable (mínimo 2 Mbps)
- Recomendado: WiFi o datos móviles 4G

**Resolución de pantalla:**
- Mínimo: 1366x768
- Recomendado: 1920x1080 o superior

### 2.2 Para Aplicación Móvil

**Sistema operativo:**
- Android 7.0 (Nougat) o superior
- API Level 24+

**Especificaciones:**
- RAM: 2 GB mínimo
- Almacenamiento: 50 MB libres
- Cámara (para escaneo futuro)

---

## 3. ACCESO AL SISTEMA

### 3.1 Ingresar al Sistema Web

**Paso 1: Abrir la aplicación**
1. Abre tu navegador web
2. Ve a la URL: `http://localhost:3000` (desarrollo) o `https://sigid.lojjic.com` (producción)
3. Espera a que cargue la pantalla de inicio

**Paso 2: Navegar al Login**
1. En la barra superior, haz clic en **"ADMINISTRACIÓN"** o **"LOGÍSTICA"**
2. Serás redirigido a la pantalla de autenticación

![Pantalla de Login](../anexos/capturas/login.png)

**Paso 3: Ingresar Credenciales**
1. Escribe tu **correo corporativo** (ejemplo: `admin@lojjic.com`)
2. Ingresa tu **contraseña**
3. Haz clic en el botón **"ACCEDER AL SISTEMA"**

**Paso 4: Verificación MFA (Segundo Factor)**
1. El sistema solicitará un código de verificación
2. Ingresa el código: `123456` (ambiente de prueba)
3. En producción, recibirás el código por email o SMS
4. Haz clic en **"VERIFICAR IDENTIDAD"**

✅ **¡Listo!** Serás redirigido a tu panel correspondiente.

### 3.2 Credenciales de Prueba

**Administrador:**
- Email: `admin@lojjic.com`
- Contraseña: `ADSO2026`
- Código MFA: `123456`

**Operador:**
- Email: `operador@lojjic.com`
- Contraseña: `Operador2024`
- Código MFA: `123456`

### 3.3 Recuperar Contraseña

Si olvidaste tu contraseña:

1. En la pantalla de login, haz clic en **"¿Olvidaste tu contraseña?"**
2. Ingresa tu correo corporativo
3. Revisa tu email y sigue el enlace de recuperación
4. Crea una nueva contraseña segura

---

## 4. FUNCIONALIDADES POR ROL

### 4.1 Panel Administrativo

**Acceso:** Administradores únicamente

#### 4.1.1 Dashboard con Métricas

Al ingresar como administrador verás:

**Métricas de Venta**
- Ventas consolidadas del mes
- Comparación vs mes anterior (%)

**Estado del Sistema**
- Integridad: ÓPTIMO / ALERTA / CRÍTICO
- Latencia del servidor
- Uptime

**Recursos Humanos**
- Personal en turno actual
- Botones para registrar altas/bajas

**Logs de Actividad**
- Últimas 10 acciones del sistema
- Timestamp, descripción y usuario

#### 4.1.2 Gestión de Personal

1. En el dashboard, ve a la sección **"Recursos Humanos"**
2. Usa los botones **"+ Alta"** o **"- Baja"** para actualizar el contador
3. El sistema registra automáticamente la acción

#### 4.1.3 Exportar Reporte de Auditoría

1. Desplázate hasta **"Logs de Actividad"**
2. Haz clic en **"EXPORTAR AUDITORÍA"**
3. Se descargará un PDF con el historial completo

### 4.2 Panel Logístico

**Acceso:** Operadores y Administradores

#### 4.2.1 Consultar Inventario

**Ver tabla de stock:**
1. Navega a la sección **"LOGÍSTICA"** en el menú superior
2. Verás una tabla con todos los productos:
   - **SKU:** Código del producto
   - **Nombre:** Descripción del activo
   - **Stock:** Unidades disponibles
   - **Estado:** Disponibilidad OK o Alerta crítica

**Interpretar alertas:**
- 🟢 **Verde** = Stock suficiente (10+ unidades)
- 🔴 **Rojo** = "REABASTECER URGENTE" (< 10 unidades)

#### 4.2.2 Reportar Incidencias

Cuando ocurra una novedad en bodega:

1. Haz clic en el botón con ícono ⚠️ **"Reportar Novedad"**
2. Aparecerá un cuadro de diálogo
3. Escribe la descripción de la incidencia (ejemplo: "Producto dañado en transporte")
4. Haz clic en **"Aceptar"**
5. Verás el mensaje: *"SISTEMA: Incidencia registrada y enviada a supervisión"*

La incidencia aparecerá en la sección **"Incidencias Recientes"** con:
- Fecha y hora
- Descripción
- Estado: Pendiente / Resuelta

#### 4.2.3 Sincronizar Dispositivo Handheld

Para operadores con escáner de radiofrecuencia:

1. Haz clic en 📡 **"Sincronizar Handheld"**
2. El sistema activará la conexión
3. Mensaje: *"SISTEMA: Escáner de radiofrecuencia activado..."*

#### 4.2.4 Consultar Capacidad de Bodega

1. Haz clic en 🏗️ **"Estado de Bodega"**
2. Aparecerá un popup con:
   - Capacidad actual (ejemplo: 80%)
   - Responsable de la sede

---

## 5. GUÍA DE USO PASO A PASO

### 5.1 Consultar el Catálogo de Productos

#### Paso 1: Acceder al Catálogo
1. En el menú superior, haz clic en **"CATÁLOGO"**
2. Verás todos los productos disponibles en formato de tarjetas (cards)

#### Paso 2: Explorar Productos
Cada tarjeta muestra:
- **Imagen** del producto
- **Nombre** y marca
- **Precio** en pesos colombianos
- **Stock** disponible
- Badge de **"Garantía Extendida Disponible"**

#### Paso 3: Buscar Productos
- Usa el campo de búsqueda: *"¿Qué potencia necesitas hoy?..."*
- Escribe palabras clave (ejemplo: "MacBook", "Galaxy")
- El filtrado es instantáneo

#### Paso 4: Filtrar por Categoría
- Usa el dropdown **"Todas las Categorías"**
- Opciones: Portátiles, Móviles, Consolas
- Selecciona una para filtrar

### 5.2 Agregar Productos al Carrito

#### Paso 1: Seleccionar Producto
1. Encuentra el producto deseado
2. Lee las especificaciones en la descripción
3. Verifica el stock disponible

#### Paso 2: Agregar al Carrito
1. Haz clic en el botón **"ADQUIRIR"**
2. Aparecerá un mensaje: *"SISTEMA: El producto [nombre] ha sido indexado en su bolsa correctamente"*
3. El contador del carrito (🛒) aumentará en 1

#### Paso 3: Agregar Múltiples Productos
- Repite el proceso para cada producto
- No hay límite de items (sujeto a stock)

### 5.3 Gestionar el Carrito de Compra

#### Paso 1: Abrir el Panel de Carrito
1. Haz clic en el ícono de carrito 🛒 (esquina superior derecha)
2. Se abrirá un panel lateral con todos tus productos

#### Paso 2: Revisar Items
Cada item muestra:
- Nombre del producto
- Precio unitario
- Botón **"REMOVER"**

#### Paso 3: Eliminar Productos
- Si deseas quitar un item, haz clic en **"REMOVER"**
- El producto desaparecerá y el total se actualizará

#### Paso 4: Verificar Total
- En la parte inferior verás: **"VALOR TOTAL: $XX,XXX,XXX"**
- Este es el monto a pagar

### 5.4 Procesar un Despacho (Checkout)

#### Paso 1: Completar Información
Antes de procesar, debes seleccionar:

**Sede de Despacho:**
1. En el panel de carrito, ve a **"SEDE DE DESPACHO"**
2. Selecciona el origen:
   - Logytech Fontanar - Chía (80% stock)
   - SENA Centro Agropecuario - Chiquinquirá (45% stock)
   - Bodega Alterna Zipaquirá (20% stock)

**Método de Pago:**
1. En **"MÉTODO DE PAGO"**, selecciona:
   - PSE - Transferencia Bancaria
   - Tarjeta de Crédito (Visa/Mastercard)
   - Botón Bancolombia
   - Efecty / Su Red

#### Paso 2: Habilitar Botón de Pago
- El botón **"COMPLETAR DATOS"** se activará cuando ambos campos estén llenos
- Cambiará a: **"PAGAR CON [método seleccionado]"**

#### Paso 3: Confirmar y Procesar
1. Haz clic en el botón de pago
2. Serás redirigido a la página de **Checkout**
3. Completa los datos de envío:
   - **Nombre Completo**
   - **Dirección de Entrega**
   - **Ciudad**
4. Verifica el total a pagar
5. Haz clic en **"PROCESAR DESPACHO FINAL"**

#### Paso 4: Validación y Generación
El sistema realizará:
1. ✓ Validación de stock en bodega (800ms)
2. ✓ Generación de guía de despacho
3. ✓ Creación de PDF con ID único (ejemplo: GUIA-4521)
4. ✓ Actualización de inventario
5. ✓ Vaciado del carrito

#### Paso 5: Descargar Guía
- Se descargará automáticamente: `GUIA-XXXX_SIGID.pdf`
- Guarda este archivo como comprobante
- Mensaje de éxito: *"EXITO: Guía [ID] generada. Activos en ruta."*

### 5.5 Cambiar Tema Visual

Para mayor comodidad visual:

1. En la barra superior, encuentra el ícono 🌙/☀️
2. Haz clic para alternar entre:
   - **Modo Claro** (fondo blanco)
   - **Modo Oscuro** (fondo negro)
3. El cambio es instantáneo

---

## 6. USO DE LA APLICACIÓN MÓVIL ANDROID

### 6.1 Instalación

**Opción 1: Desde archivo APK**
1. Descarga el archivo `SIGID_v1.0.apk`
2. Habilita "Instalar desde fuentes desconocidas" en Ajustes
3. Abre el APK y sigue las instrucciones
4. Acepta los permisos solicitados (Internet, Cámara)

**Opción 2: Desde Play Store** (Futuro)
- Busca "SIGID Logística"
- Instala directamente

### 6.2 Primer Inicio

1. Abre la app **SIGID**
2. Verás el **Splash Screen** con el logo dorado (2 segundos)
3. Serás llevado a la pantalla de **Login**

### 6.3 Navegación en Android

La app tiene 4 secciones principales (Bottom Navigation):

**📦 Catálogo**
- Grid con 2 columnas de productos
- Scroll vertical suave
- Botón "ADQUIRIR" en cada card

**🛒 Carrito**
- Lista de productos seleccionados
- Total calculado automáticamente
- Botón "PROCESAR DESPACHO"

**📊 Logística**
- Información de operaciones
- Gestión de stock
- Reportes de bodega

**👤 Admin**
- Métricas de venta
- Gestión de usuarios
- Reportes y auditoría

### 6.4 Agregar Productos (Android)

1. Ve a la pestaña **"Catálogo"**
2. Haz scroll para ver todos los productos
3. Toca el botón **"ADQUIRIR"** en el producto deseado
4. Aparecerá un **Toast** (mensaje emergente): *"Producto agregado"*
5. El badge del carrito se actualizará

### 6.5 Ver y Gestionar Carrito (Android)

1. Toca la pestaña **"Carrito"**
2. Verás la lista de items con:
   - Nombre del producto
   - Precio
   - Cantidad
   - Botón "ELIMINAR"
3. En la parte inferior: **Total: $XXX**
4. Para procesar: Toca **"PROCESAR DESPACHO"**

---

## 7. PREGUNTAS FRECUENTES (FAQ)

### ❓ ¿Qué hago si olvidé mi contraseña?
**R:** Haz clic en "¿Olvidaste tu contraseña?" en la pantalla de login y sigue el proceso de recuperación por email.

### ❓ ¿Por qué no puedo procesar un despacho?
**R:** Verifica que:
- Tienes productos en el carrito
- Seleccionaste una sede de despacho
- Elegiste un método de pago
- Tienes conexión a internet estable

### ❓ ¿Dónde encuentro las guías generadas?
**R:** Las guías en PDF se descargan automáticamente a tu carpeta de Descargas. Busca archivos con formato: `GUIA-XXXX_SIGID.pdf`

### ❓ ¿Puedo cancelar un despacho ya procesado?
**R:** No, una vez generada la guía, el despacho es definitivo. Contacta al administrador para anular.

### ❓ ¿El carrito se guarda si cierro el navegador?
**R:** Sí, el carrito usa LocalStorage y persiste aunque cierres la pestaña o navegador.

### ❓ ¿Cómo reporto un bug o error?
**R:** Contacta al administrador del sistema o envía un email a: soporte@lojjic.com (incluye capturas de pantalla).

### ❓ ¿Por qué dice "Stock insuficiente"?
**R:** El producto que intentas despachar no tiene suficientes unidades en bodega. Verifica el inventario actualizado.

### ❓ ¿Puedo usar el sistema sin internet?
**R:** No, SIGID requiere conexión constante a internet para funcionar correctamente.

### ❓ ¿Cómo actualizo la app móvil?
**R:** Si la instalaste desde APK, descarga la nueva versión y vuelve a instalar. Si es desde Play Store, actualiza desde la tienda.

---

## 8. SOLUCIÓN DE PROBLEMAS

### ⚠️ Problema: No puedo iniciar sesión

**Posibles causas:**
- Credenciales incorrectas
- Cuenta bloqueada por múltiples intentos fallidos
- Servidor caído

**Solución:**
1. Verifica que estás usando el email correcto
2. Asegúrate de escribir la contraseña correctamente (sensible a mayúsculas)
3. Si tienes 3 intentos fallidos, espera 15 minutos
4. Contacta al administrador si persiste

---

### ⚠️ Problema: El carrito no muestra productos

**Solución:**
1. Limpia la caché del navegador (Ctrl + Shift + Del)
2. Actualiza la página (F5)
3. Cierra y vuelve a abrir el navegador
4. Verifica que JavaScript esté habilitado

---

### ⚠️ Problema: No se descarga el PDF de la guía

**Solución:**
1. Verifica que el navegador tenga permisos de descarga
2. Desactiva bloqueadores de popups
3. Revisa la carpeta de Descargas
4. Intenta con otro navegador

---

### ⚠️ Problema: La aplicación móvil se cierra sola

**Solución:**
1. Cierra otras apps para liberar memoria
2. Reinicia el dispositivo Android
3. Desinstala y vuelve a instalar la app
4. Verifica que tu Android sea 7.0+

---

### ⚠️ Problema: Las imágenes no cargan

**Solución:**
1. Verifica tu conexión a internet
2. Prueba con otra red WiFi
3. Desactiva VPN si tienes una activa
4. Limpia caché del navegador

---

## 9. CONSEJOS Y BUENAS PRÁCTICAS

### ✅ Para Administradores

1. **Revisa diariamente:**
   - Logs de actividad
   - Estado del sistema
   - Incidencias pendientes

2. **Exporta reportes periódicamente:**
   - Genera auditorías semanales
   - Guarda backups de PDFs

3. **Gestiona personal:**
   - Mantén actualizado el contador de personal en turno
   - Revisa métricas de ventas mensualmente

### ✅ Para Operadores Logísticos

1. **Antes de procesar despachos:**
   - Verifica stock disponible
   - Confirma la sede de origen correcta
   - Revisa que los productos correspondan al pedido

2. **Reporta incidencias inmediatamente:**
   - Productos dañados
   - Discrepancias en el inventario
   - Problemas técnicos

3. **Mantén el inventario actualizado:**
   - Registra entradas y salidas en tiempo real
   - Alerta al admin cuando stock sea crítico

---

## 10. CONTACTO Y SOPORTE

### 📞 Soporte Técnico

**Email:** soporte.sigid@lojjic.com  
**Teléfono:** +57 300 123 4567  
**Horario:** Lunes a Viernes, 8:00 AM - 6:00 PM  

### 🏢 Sede Principal

**Dirección:** Centro, Chiquinquirá, Boyacá  
**NIT:** 901.442.XXX-X  

### 👨‍💻 Equipo de Desarrollo

**Desarrollador:** Maicol Andres Matallana Garcia  
**Programa:** ADSO - SENA 2024-2026  
**Email:** desarrollo@lojjic.com  

---

## 11. ACTUALIZACIONES Y VERSIONES

### Versión 2.4.0 (Actual)
- ✓ Sistema de autenticación MFA
- ✓ Generación de guías PDF
- ✓ Panel administrativo con métricas
- ✓ Aplicación Android nativa
- ✓ Persistencia en LocalStorage

### Próximas Funcionalidades (v2.5.0)
- 🔄 Escaneo de códigos de barras
- 🔄 Notificaciones push
- 🔄 Sincronización offline
- 🔄 Reportes avanzados con gráficos

---

**¡Gracias por usar SIGID!**

*Manual elaborado por el equipo de desarrollo - SENA ADSO 2024-2026*

---

**Última actualización:** [Fecha actual]  
**Versión del manual:** 1.0  
**Válido para SIGID v2.4.0**
