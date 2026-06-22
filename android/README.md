# SIGID Android App

Aplicación móvil Android para el Sistema de Gestión de Inventario y Despacho (SIGID). Esta aplicación replica la funcionalidad del sistema web existente, permitiendo la gestión de inventario y despacho desde dispositivos móviles.

## Características

- **Autenticación JWT**: Login seguro con tokens JWT
- **Gestión de Roles**: Soporte para roles (admin, empleado, cliente)
- **Panel de Administrador**: Gestión completa de productos e inventario
- **Panel de Empleado**: Gestión de órdenes asignadas y marcado de entregas
- **Checkout**: Creación de nuevas órdenes de despacho
- **Perfil**: Información del usuario actual
- **Navegación por Roles**: Interfaz adaptada según el rol del usuario

## Requisitos Previos

- Android Studio Hedgehog (2023.1.1) o superior
- JDK 11 o superior
- Android SDK 24 (Android 7.0) o superior
- Backend SIGID corriendo en http://localhost:5000

## Configuración

### 1. Clonar el Proyecto

El proyecto Android se encuentra en la carpeta `android/` del repositorio principal.

### 2. Configurar URL del Backend

En `ApiClient.kt`, configura la URL del backend según tu entorno:

```kotlin
// Para emulador Android
private const val BASE_URL = "http://10.0.2.2:5000/"

// Para dispositivo físico (reemplazar con tu IP local)
private const val BASE_URL = "http://192.168.1.100:5000/"
```

**Para emulador Android**: Usa `10.0.2.2` que redirige a `localhost` de tu computadora.

**Para dispositivo físico**: Usa la IP de tu computadora en la red local.

### 3. Obtener IP Local (Windows)

```powershell
ipconfig
```

Busca la dirección IPv4 en el adaptador de red activo (ej: `192.168.1.100`).

### 4. Habilitar HTTP (si es necesario)

El proyecto ya tiene `android:usesCleartextTraffic="true"` en `AndroidManifest.xml` para permitir conexiones HTTP en desarrollo.

## Estructura del Proyecto

```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/sigid/logistica/
│   │       │   ├── data/
│   │       │   │   ├── api/          # Cliente Retrofit y servicios API
│   │       │   │   ├── model/        # Modelos de datos (User, Product, Orden)
│   │       │   │   └── preferences/   # Gestión de sesión (SharedPreferences)
│   │       │   └── ui/
│   │       │       ├── login/        # Pantalla de login
│   │       │       ├── main/         # Actividad principal con navegación
│   │       │       ├── products/     # Panel de productos (admin)
│   │       │       ├── orders/       # Panel de órdenes (empleado)
│   │       │       ├── checkout/     # Creación de órdenes
│   │       │       └── profile/      # Perfil de usuario
│   │       ├── res/
│   │       │   ├── layout/          # Layouts XML
│   │       │   ├── values/           # Strings, colors, themes
│   │       │   └── menu/            # Menús de navegación
│   │       └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
└── settings.gradle
```

## Instalación y Ejecución

### En Android Studio

1. **Abrir el proyecto**:
   ```bash
   File → Open → Seleccionar carpeta android/
   ```

2. **Sincronizar Gradle**:
   - Android Studio solicitará sincronizar automáticamente
   - O ejecuta: `File → Sync Project with Gradle Files`

3. **Configurar el emulador o dispositivo**:
   - Crea un emulador AVD con Android 7.0 o superior
   - O conecta tu dispositivo físico con USB debugging habilitado

4. **Ejecutar la aplicación**:
   - Presiona `Shift + F10` o el botón "Run"
   - Selecciona el emulador/dispositivo

### Backend Requerido

Asegúrate de que el backend SIGID esté corriendo:

```bash
cd backend
npm install
npm start
```

El backend debe estar accesible en `http://localhost:5000` (o la IP configurada).

## Uso de la Aplicación

### Login

1. Ingresa tu email y contraseña
2. La aplicación autentica con el backend usando JWT
3. El token se guarda localmente para sesiones futuras

### Navegación por Roles

- **Admin/Master**: Panel de Administrador (gestión de productos)
- **Empleado**: Panel de Empleado (gestión de órdenes asignadas)
- **Cliente**: Vista limitada de productos

### Funcionalidades

#### Panel de Administrador
- Ver lista de productos
- Buscar productos por nombre
- Ver detalles de stock y precios
- (Futuro: Crear, editar, eliminar productos)

#### Panel de Empleado
- Ver órdenes asignadas
- Marcar órdenes como entregadas
- Filtrar por estado de orden

#### Checkout
- Seleccionar productos del inventario
- Agregar al carrito
- Ingresar información de envío
- Crear nueva orden de despacho

#### Perfil
- Ver información del usuario actual
- Ver rol y ID de usuario

## Tecnologías Utilizadas

- **Kotlin**: Lenguaje principal
- **Retrofit**: Cliente HTTP para llamadas API
- **Gson**: Parsing de JSON
- **ViewModel & LiveData**: Arquitectura MVVM
- **Navigation Component**: Navegación entre pantallas
- **Material Components**: UI components
- **Coroutines**: Programación asíncrona
- **SharedPreferences**: Almacenamiento local de sesión

## Endpoints API Utilizados

- `POST /api/auth/login` - Autenticación
- `GET /api/auth/me` - Obtener usuario actual
- `GET /api/productos` - Listar productos
- `GET /api/ordenes` - Listar órdenes
- `POST /api/ordenes` - Crear orden
- `PATCH /api/ordenes/:id/entregar` - Marcar orden como entregada

## Solución de Problemas

### Error de conexión

- Verifica que el backend esté corriendo
- Confirma la URL configurada en `ApiClient.kt`
- Para emulador: usa `10.0.2.2` en lugar de `localhost`
- Para dispositivo físico: usa la IP de tu computadora
- Verifica que el firewall no bloquee las conexiones

### Error de autenticación

- Verifica que las credenciales sean correctas
- Confirma que el usuario exista en el backend
- Revisa que el backend esté generando tokens JWT correctamente

### Error de compilación

- Sincroniza Gradle: `File → Sync Project with Gradle Files`
- Limpia el proyecto: `Build → Clean Project`
- Rebuild: `Build → Rebuild Project`
- Verifica que JDK 11+ esté configurado

## Desarrollo Futuro

- [ ] CRUD completo de productos (crear, editar, eliminar)
- [ ] Gestión de usuarios (solo admin)
- [ ] Asignación de empleados a órdenes (solo admin)
- [ ] Escaneo de códigos QR para productos
- [ ] Notificaciones push para nuevas asignaciones
- [ ] Modo offline con sincronización
- [ ] Reportes PDF en móvil
- [ ] Cámara para fotos de productos

## Licencia

Este proyecto es parte del Sistema de Gestión de Inventario y Despacho (SIGID).

## Contacto

Para soporte técnico o preguntas, contacta al equipo de desarrollo de SIGID.
