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
