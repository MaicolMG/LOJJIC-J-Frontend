# PLANTEAMIENTO DEL PROBLEMA
## SISTEMA DE GESTIÓN DE INVENTARIO Y DESPACHO (SIGID)

---

**Proyecto:** Sistema de Gestión de Inventario y Despacho (SIGID)  
**Programa:** Análisis y Desarrollo de Software (ADSO) Virtual  
**Ficha:** 3134555  
**Elaborado por:** [Nombres de los integrantes]  
**Fecha:** [Fecha actual]  
**Versión:** 1.0

---

## 1. IDENTIFICACIÓN DEL PROBLEMA

### 1.1 Título del Problema
"Deficiencias en el control de inventario y procesos de despacho de activos tecnológicos en empresas de logística especializadas"

### 1.2 Planteamiento del Problema

Las empresas dedicadas a la logística de tecnología enfrentan desafíos críticos en la gestión eficiente de sus inventarios y procesos de despacho. LOJJIC-J SISTEMAS, empresa especializada en distribución de hardware de alta gama, ha identificado las siguientes problemáticas:

**Problemáticas identificadas:**

1. **Control Manual de Inventario:** El registro y seguimiento de activos tecnológicos se realiza mediante hojas de cálculo y documentos físicos, generando:
   - Alto margen de error humano en la digitación de datos
   - Pérdida de información por manipulación inadecuada de documentos
   - Dificultad para consultar el stock en tiempo real

2. **Procesos de Despacho Ineficientes:** Los procedimientos de picking y packing carecen de trazabilidad digital:
   - Generación manual de guías de despacho (tiempo promedio: 15-20 minutos por guía)
   - Falta de registro histórico de movimientos de inventario
   - Imposibilidad de auditar procesos de salida de bodega

3. **Ausencia de Alertas Automatizadas:** No existe un sistema que notifique:
   - Niveles críticos de stock
   - Discrepancias en el inventario
   - Necesidades de reabastecimiento

4. **Limitada Accesibilidad a la Información:** El personal operativo no puede:
   - Consultar el inventario desde dispositivos móviles
   - Registrar entradas/salidas en tiempo real desde bodega
   - Generar reportes de manera ágil

5. **Falta de Integración de Datos:** La información está dispersa en múltiples fuentes:
   - Falta de centralización de datos
   - Dificultad para generar informes consolidados
   - Imposibilidad de realizar análisis predictivos

### 1.3 Contexto y Justificación

**Contexto empresarial:**
- LOJJIC-J SISTEMAS maneja un inventario promedio de 500+ activos tecnológicos mensuales
- Cuenta con 3 sedes de operación (Chía, Chiquinquirá, Zipaquirá)
- Procesa aproximadamente 80-100 despachos semanales
- Emplea 8 colaboradores en el área logística

**Impacto actual:**
- Pérdidas económicas estimadas del 3-5% por errores de inventario
- Tiempo promedio de 45 minutos para procesamiento de un despacho completo
- Insatisfacción del cliente por demoras en la entrega (NPS: 6.5/10)

**Necesidad del sistema:**
La empresa requiere una solución tecnológica integral que permita:
- Automatizar el control de inventario
- Agilizar los procesos de despacho
- Garantizar trazabilidad completa de los activos
- Facilitar el acceso a información en tiempo real
- Mejorar la toma de decisiones basada en datos

---

## 2. POBLACIÓN AFECTADA

### 2.1 Población Directamente Afectada
- **Personal Operativo de Bodega:** 5 colaboradores
- **Área Administrativa:** 2 administradores de sistema
- **Gerencia:** 1 gerente general

### 2.2 Población Indirectamente Afectada
- Clientes corporativos (empresas que adquieren tecnología)
- Proveedores de hardware
- Área contable y financiera

---

## 3. PREGUNTA DE INVESTIGACIÓN

### Pregunta Principal
¿Cómo diseñar e implementar un sistema de información web y móvil que optimice los procesos de gestión de inventario y despacho de activos tecnológicos en empresas de logística especializada?

### Preguntas Secundarias
1. ¿Cuáles son los requisitos funcionales y no funcionales necesarios para un sistema de gestión logística eficiente?
2. ¿Qué arquitectura de software es más adecuada para garantizar escalabilidad y mantenibilidad?
3. ¿Cómo garantizar la trazabilidad completa de los activos desde la entrada hasta la salida de bodega?
4. ¿Qué mecanismos de seguridad deben implementarse para proteger la información sensible?
5. ¿Cómo facilitar el acceso móvil para el personal operativo en bodega?

---

## 4. OBJETIVOS

### 4.1 Objetivo General
Desarrollar un sistema de información web y móvil (SIGID) que automatice y optimice los procesos de gestión de inventario y despacho de activos tecnológicos, garantizando control preciso, trazabilidad completa y acceso en tiempo real a la información.

### 4.2 Objetivos Específicos

1. **Análisis y Especificación:**
   - Realizar levantamiento de requisitos con los stakeholders
   - Definir especificaciones funcionales y no funcionales del sistema
   - Elaborar casos de uso y diagramas UML

2. **Diseño de la Solución:**
   - Diseñar la arquitectura del sistema basada en cliente-servidor
   - Crear prototipos de interfaz para web y móvil
   - Definir el modelo de base de datos relacional

3. **Implementación del Backend:**
   - Desarrollar API REST con Node.js y Express
   - Implementar endpoints para gestión de inventario, despachos y usuarios
   - Configurar base de datos MongoDB Atlas

4. **Implementación del Frontend:**
   - Desarrollar interfaz web responsive con React.js
   - Implementar módulos de catálogo, carrito, gestión logística y administración
   - Aplicar diseño UI/UX profesional (Glassmorphism)

5. **Implementación de Aplicación Móvil:**
   - Desarrollar aplicación Android nativa con Kotlin
   - Implementar funcionalidades de consulta de inventario y registro de movimientos
   - Integrar escaneo de códigos de barras con CameraX

6. **Funcionalidades de Trazabilidad:**
   - Implementar generación automática de guías de despacho en PDF
   - Registrar histórico completo de movimientos de inventario
   - Crear sistema de alertas para niveles críticos de stock

7. **Seguridad y Control de Acceso:**
   - Implementar autenticación corporativa con roles (Admin, Operador)
   - Configurar validación de segundo factor (MFA)
   - Aplicar cifrado de datos sensibles

8. **Pruebas y Validación:**
   - Realizar pruebas unitarias y de integración
   - Ejecutar pruebas de aceptación con usuarios finales
   - Validar rendimiento y seguridad del sistema

9. **Documentación:**
   - Elaborar manuales de usuario (Admin y Operador)
   - Crear manual técnico de instalación y configuración
   - Documentar procesos de despliegue y mantenimiento

10. **Despliegue:**
    - Realizar despliegue del backend en servidor cloud
    - Publicar aplicación web en hosting
    - Generar APK de aplicación Android para distribución

---

## 5. ALCANCE DEL PROYECTO

### 5.1 Dentro del Alcance
✓ Sistema web responsive (Frontend)  
✓ API REST (Backend)  
✓ Aplicación móvil Android nativa  
✓ Base de datos MongoDB  
✓ Módulo de gestión de productos/activos  
✓ Módulo de control de inventario  
✓ Módulo de generación de guías de despacho  
✓ Sistema de autenticación con MFA  
✓ Panel administrativo con métricas  
✓ Panel logístico para operadores  
✓ Generación de reportes en PDF  
✓ Persistencia de datos en LocalStorage/MongoDB  

### 5.2 Fuera del Alcance
✗ Integración con sistemas ERP externos  
✗ Módulo de facturación electrónica  
✗ Sistema de pagos en línea (PSE, tarjetas)  
✗ Aplicación para iOS  
✗ Notificaciones push en tiempo real  
✗ Geolocalización de entregas  
✗ Chat en vivo con soporte  

---

## 6. BENEFICIOS ESPERADOS

### 6.1 Beneficios Operativos
- Reducción del 70% en tiempo de procesamiento de despachos
- Disminución del 90% en errores de inventario
- Acceso en tiempo real a información desde cualquier dispositivo
- Trazabilidad completa de movimientos de activos

### 6.2 Beneficios Económicos
- Ahorro estimado de 30 horas/mes en procesos manuales
- Reducción de pérdidas por errores del 5% al 1%
- Disminución de costos de papelería en un 80%

### 6.3 Beneficios Estratégicos
- Mejora en la satisfacción del cliente (objetivo NPS: 8.5/10)
- Toma de decisiones basada en datos confiables
- Escalabilidad para crecimiento empresarial
- Ventaja competitiva en el sector logístico

---

## 7. RIESGOS IDENTIFICADOS

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Resistencia al cambio del personal | Media | Alto | Capacitaciones y seguimiento constante |
| Fallas en conexión a internet | Media | Medio | Implementar caché local y sincronización |
| Pérdida de datos | Baja | Alto | Backups automáticos diarios |
| Bugs en producción | Media | Medio | Testing exhaustivo y QA riguroso |
| Sobrecarga del servidor | Baja | Medio | Monitoreo y escalabilidad en cloud |

---

## 8. CONCLUSIONES

El desarrollo del Sistema de Gestión de Inventario y Despacho (SIGID) representa una necesidad crítica para LOJJIC-J SISTEMAS y empresas similares del sector logístico tecnológico. La implementación de esta solución permitirá:

1. Transformar procesos manuales obsoletos en flujos automatizados
2. Garantizar la integridad y trazabilidad de la información
3. Mejorar significativamente los tiempos de respuesta operativos
4. Reducir costos asociados a errores humanos
5. Facilitar la escalabilidad del negocio

Este proyecto formativo no solo cumple con los resultados de aprendizaje del programa ADSO, sino que también genera un impacto real en el sector productivo, alineándose con los objetivos del SENA de promover el desarrollo tecnológico y la competitividad empresarial.

---

**Elaborado por:**  
[Nombres completos de los integrantes del equipo]

**Revisado por:**  
[Nombre del instructor]

**Fecha de elaboración:**  
[Fecha actual]

---

*Documento elaborado en el marco del proyecto formativo del programa ADSO - SENA 2024-2026*
