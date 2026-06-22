# HISTORIA DE USUARIO - HU001
## SIGID - Sistema de Gestión de Inventario y Despacho

---

**ID:** HU-001  
**Título:** Login de Usuario con Autenticación MFA  
**Sprint:** Sprint 2  
**Asignado a:** [Nombre del Desarrollador]  
**Prioridad:** Alta ⚠️  
**Estado:** ✅ Completado  
**Fecha Inicio:** 2024-01-15  
**Fecha Fin:** 2024-01-22  
**Puntos de Historia:** 8

---

## COMO...
**Rol:** Administrador / Operador Logístico

## QUIERO...
**Funcionalidad:** Poder iniciar sesión en el sistema de manera segura

## PARA...
**Beneficio:** Acceder a las funcionalidades del sistema según mi rol y garantizar que solo personal autorizado acceda a la información

---

## CRITERIOS DE ACEPTACIÓN

**Escenario 1: Login Exitoso**
```
DADO que soy un usuario registrado
CUANDO ingreso mi email "admin@lojjic.com" y contraseña "ADSO2026"
  Y hago clic en "ACCEDER AL SISTEMA"
ENTONCES el sistema me solicita un código MFA de 6 dígitos
```

**Escenario 2: Verificación MFA**
```
DADO que he ingresado credenciales válidas
CUANDO ingreso el código MFA correcto "123456"
  Y hago clic en "VERIFICAR IDENTIDAD"
ENTONCES soy redirigido al panel correspondiente a mi rol
  Y el sistema registra mi último login
```

**Escenario 3: Credenciales Inválidas**
```
DADO que estoy en la pantalla de login
CUANDO ingreso un email o contraseña incorrectos
ENTONCES veo el mensaje "ERROR: Credenciales inválidas. Intento X de 3"
  Y el contador de intentos aumenta
```

**Escenario 4: Bloqueo por Múltiples Intentos**
```
DADO que he fallado 3 veces consecutivas
CUANDO intento ingresar de nuevo
ENTONCES veo el mensaje "SISTEMA BLOQUEADO: Demasiados intentos fallidos"
  Y mi acceso queda restringido por 15 minutos
```

**Escenario 5: Código MFA Incorrecto**
```
DADO que he ingresado credenciales válidas
CUANDO ingreso un código MFA incorrecto
ENTONCES veo el mensaje "ERROR: Token MFA inválido"
  Y se me permite reintentar
```

---

## TAREAS TÉCNICAS

### Frontend (React.js)
- [x] Crear componente LoginActivity
- [x] Diseñar formulario con campos email y contraseña
- [x] Implementar validación de inputs
- [x] Crear flujo de MFA con segundo formulario
- [x] Manejar estados de carga y error
- [x] Implementar redirección según rol
- [x] Agregar contador de intentos
- [x] Mostrar mensajes toast de feedback

### Backend (Node.js)
- [x] Endpoint POST /api/auth/login
- [x] Validar credenciales contra BD
- [x] Hash de contraseñas con bcrypt
- [x] Generar código MFA temporal
- [x] Endpoint POST /api/auth/verify-mfa
- [x] Validar código MFA
- [x] Generar JWT token
- [x] Registrar último login del usuario
- [x] Implementar rate limiting (3 intentos)

### Base de Datos
- [x] Colección `usuarios` con campos: email, password, rol
- [x] Índice único en campo email
- [x] Campo `ultimoLogin` tipo Date
- [x] Campo `intentosFallidos` para control

---

## NOTAS TÉCNICAS

**Tecnologías Utilizadas:**
- Frontend: React.js, React Hooks (useState)
- Backend: Express.js, bcrypt, jsonwebtoken
- BD: MongoDB

**Dependencias:**
```json
{
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "express-validator": "^7.0.1"
}
```

**Seguridad:**
- Contraseñas hasheadas con bcrypt (salt rounds: 10)
- JWT con expiración de 7 días
- MFA temporal válido por 5 minutos
- Rate limiting: máximo 3 intentos cada 15 minutos

---

## DISEÑO UI/UX

**Wireframe:**
```
┌─────────────────────────────────────┐
│        LOJJIC-J SISTEMAS            │
│     SISTEMAS LOGÍSTICOS             │
├─────────────────────────────────────┤
│                                     │
│     [Card con glassmorphism]        │
│                                     │
│        AUTENTICACIÓN                │
│                                     │
│     Portal de Seguridad Corp.       │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ 📧 Correo Electrónico       │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ 🔒 Contraseña        👁️     │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │   ACCEDER AL SISTEMA        │   │
│   └─────────────────────────────┘   │
│                                     │
│   ¿No tienes cuenta? Regístrate     │
│   ¿Olvidaste tu contraseña?         │
│                                     │
└─────────────────────────────────────┘
```

**Colores:**
- Primario: #B8860B (Oro)
- Fondo: #F8FAFC (Gris claro)
- Texto: #111111 (Negro)
- Error: #EF4444 (Rojo)

---

## PRUEBAS

### Casos de Prueba Asociados
- CP-001: Login de Usuario ✅
- CP-002: Login con Credenciales Inválidas ✅

### Resultados de Testing
- **Pruebas Unitarias:** 8/8 passed
- **Pruebas de Integración:** 5/5 passed
- **Pruebas de UI:** 3/3 passed
- **Pruebas de Seguridad:** 2/2 passed

**Cobertura de Código:** 92%

---

## DEFINICIÓN DE "HECHO" (DoD)

- [x] Código desarrollado y revisado (code review)
- [x] Pruebas unitarias pasando
- [x] Pruebas de integración pasando
- [x] Documentación actualizada
- [x] Sin bugs críticos
- [x] Aprobado por Product Owner
- [x] Deployado en ambiente de desarrollo
- [x] Demo presentada al equipo

---

## DEPENDENCIAS

**Depende de:**
- Ninguna (historia inicial)

**Bloqueantes:**
- Ninguno

**Relacionadas:**
- HU-002: Recuperación de contraseña
- HU-003: Gestión de roles de usuario

---

## ESFUERZO Y TIEMPO

**Estimación Inicial:** 8 puntos (3 días)  
**Tiempo Real:** 2.5 días  
**Velocidad:** +0.5 días mejor que estimado

**Desglose:**
- Análisis: 2 horas
- Diseño: 3 horas
- Desarrollo frontend: 8 horas
- Desarrollo backend: 6 horas
- Testing: 4 horas
- Documentación: 2 horas
- **Total:** 25 horas

---

## RETROSPECTIVA

**¿Qué salió bien?**
- ✅ Implementación de MFA fue más simple de lo esperado
- ✅ Diseño UI quedó profesional y usable
- ✅ Testing exhaustivo encontró bugs tempranos

**¿Qué se puede mejorar?**
- ⚠️ Validaciones del lado del cliente podrían ser más robustas
- ⚠️ Faltó implementar recuperación de contraseña (moverlo a HU-002)

**Lecciones Aprendidas:**
- bcrypt es más eficiente que implementar hash custom
- React Hooks simplifican el manejo de estado
- Mostrar feedback visual inmediato mejora UX

---

## SCREENSHOTS

**Pantalla de Login:**
![Login](../capturas/login.png)

**Pantalla MFA:**
![MFA](../capturas/mfa.png)

**Error de Credenciales:**
![Error](../capturas/error_login.png)

---

## APROBACIÓN

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| Desarrollador | [Nombre] | ✅ | 2024-01-22 |
| Tester QA | [Nombre] | ✅ | 2024-01-22 |
| Product Owner | [Instructor] | ✅ | 2024-01-23 |

---

**Historia completada el:** 2024-01-22  
**Integrada en:** Sprint 2  
**Versión del sistema:** v2.1.0

---

*Formato de Historia de Usuario según Agile/Scrum*  
*Proyecto SIGID - SENA ADSO 2024-2026*
