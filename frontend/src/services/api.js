import axios from 'axios';

const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const defaultApiUrl = hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : `http://${hostname}:5000/api`;
const API_URL = process.env.REACT_APP_API_URL || defaultApiUrl;

console.log(`[SIGID] API base URL: ${API_URL}`);

/**
 * Instancia de axios con la URL base del backend SIGID
 * Incluye automáticamente el token JWT en cada petición si existe
 */
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor: agrega el token JWT a cada petición automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('sigid_token');
    config.headers = config.headers || {};
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor: maneja errores de autenticación globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido — limpiar sesión
            localStorage.removeItem('sigid_token');
            localStorage.removeItem('sigid_user');
        }
        return Promise.reject(error);
    }
);

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const authService = {
    login: (email, password) =>
        api.post('/auth/login', { email, password }),

    register: (nombre, email, password, rol) =>
        api.post('/auth/register', { nombre, email, password, rol }),

    getMe: () =>
        api.get('/auth/me'),

    getUsuarios: () =>
        api.get('/auth/usuarios'),

    // Cambiamos a put o patch según prefieras, usaremos patch para actualizaciones parciales (como el estado)
    actualizarEstadoUsuario: (id, activo) =>
        api.patch(`/auth/usuarios/${id}`, { activo }),

    eliminarUsuario: (id) =>
        api.delete(`/auth/usuarios/${id}`),
};

// ─── PRODUCTOS ───────────────────────────────────────────────────────────────

export const productService = {
    getAll: (params = {}) =>
        api.get('/productos', { params }),

    getById: (id) =>
        api.get(`/productos/${id}`),

    crear: (data) =>
        api.post('/productos', data),

    actualizar: (id, data) =>
        api.put(`/productos/${id}`, data),

    eliminar: (id) =>
        api.delete(`/productos/${id}`),

    ajustarStock: (id, delta) =>
        api.patch(`/productos/${id}/stock`, { delta }),

    sync: () =>
        api.get('/productos/sync'),
};

// ─── ÓRDENES ─────────────────────────────────────────────────────────────────

export const ordenService = {
    getAll: (params = {}) =>
        api.get('/ordenes', { params }),

    getById: (id) =>
        api.get(`/ordenes/${id}`),

    crear: (data) =>
        api.post('/ordenes', data),

    asignar: (id, empleadoAsignado) =>
        api.patch(`/ordenes/${id}/asignar`, { empleadoAsignado }),

    marcarEntregada: (id) =>
        api.patch(`/ordenes/${id}/entregar`),

    descargarGuia: (id) =>
        api.get(`/ordenes/${id}/descargar-guia`, { responseType: 'blob' })
};

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────

export const healthCheck = () =>
    api.get('/health');

// ─── NOTIFICACIONES ──────────────────────────────────────────────────────────

export const notificacionService = {
    getAll: () =>
        api.get('/notificaciones'),

    getNoLeidas: () =>
        api.get('/notificaciones/no-leidas'),

    marcarComoLeida: (id) =>
        api.patch(`/notificaciones/${id}/leer`)
};

export default api;
