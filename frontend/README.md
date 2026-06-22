# SIGID - Sistema de Gestión de Inventario y Despacho
## Logística de Tecnología

Este es el frontend del sistema SIGID, desarrollado con React.

## 🚀 Inicio Rápido

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará automáticamente si realizas cambios.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.
Empaqueta React correctamente en modo de producción y optimiza la construcción para obtener el mejor rendimiento.

## 🛠️ Mejoras Sugeridas para el Proyecto

Para elevar la calidad del sistema, se recomienda considerar los siguientes puntos:

1.  **Migración a Vite**: Create React App (CRA) está oficialmente en desuso. Migrar a [Vite](https://vitejs.dev/) mejorará significativamente la velocidad de desarrollo y el tiempo de compilación.
2.  **Gestión de Estado**: Si el inventario crece en complejidad, implementar **Redux Toolkit** o **Zustand** para manejar el estado global de los productos y despachos.
3.  **Validación de Formularios**: Utilizar librerías como **React Hook Form** junto con **Zod** o **Yup** para asegurar que los datos de entrada en el inventario sean correctos.
4.  **UI Framework**: Implementar **Tailwind CSS** o **Material UI** para un diseño profesional, responsivo y consistente con las necesidades logísticas.
5.  **Consumo de API**: Utilizar **TanStack Query (React Query)** para el manejo de peticiones al backend, lo que facilitará el almacenamiento en caché y la sincronización de datos.

## 🔐 Usuarios y Contraseñas de Prueba

Para acceder al sistema, utiliza las siguientes credenciales según el rol que desees probar:

### 🗝️ Master (Acceso Total)
- **Email:** `master@lojjic.com`
- **Contraseña:** `MASTER2026#`
- **Permisos:** Acceso completo a todos los paneles (Admin + Empleado + Master)
- **Portal:** Usar el portal de **ADMINISTRACIÓN**
- **MFA:** Requiere código de verificación `123456`

### 👔 Administrador
- **Email:** `admin@lojjic.com`
- **Contraseña:** `ADSO2026`
- **Permisos:** Gestión completa del sistema, asignación de órdenes, control de usuarios
- **Portal:** Usar el portal de **ADMINISTRACIÓN**
- **MFA:** Requiere código de verificación `123456`

### 👷 Empleado de Logística
- **Email:** `empleado@lojjic.com`
- **Contraseña:** `Empleado2026`
- **Permisos:** Operaciones de bodega, gestión de inventario, despachos
- **Portal:** Usar el portal de **LOGÍSTICA**
- **MFA:** No requiere

> **Nota Importante:** 
> - Los usuarios Admin y Master requieren autenticación de dos factores (MFA) con el código `123456`
> - Asegúrate de usar el portal correcto según tu rol (Administración o Logística)
> - Estos usuarios son para entorno de desarrollo y pruebas
> - En producción, se deben utilizar contraseñas seguras y gestión adecuada de autenticación

## 📋 Requisitos Previos

*   Node.js (versión LTS recomendada)
*   npm o yarn

## 📂 Estructura del Proyecto

```text
src/
 ├── components/  # Componentes reutilizables
 ├── pages/       # Vistas principales (Inventario, Despacho, etc.)
 ├── services/    # Llamadas a la API
 ├── hooks/       # Hooks personalizados
 └── utils/       # Funciones de utilidad
```
