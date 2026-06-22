# MANUAL TÉCNICO DE INSTALACIÓN Y CONFIGURACIÓN
## SISTEMA DE GESTIÓN DE INVENTARIO Y DESPACHO (SIGID)

---

**Versión:** 2.4.0-STABLE  
**Build:** 2026.04.29  
**Fecha:** [Fecha actual]  
**Dirigido a:** Desarrolladores y Administradores de Sistemas

---

## ÍNDICE

1. Arquitectura del Sistema
2. Requisitos Técnicos
3. Instalación del Backend
4. Instalación del Frontend
5. Instalación de la App Android
6. Configuración de Base de Datos
7. Despliegue en Producción
8. Mantenimiento y Monitoreo
9. Troubleshooting

---

## 1. ARQUITECTURA DEL SISTEMA

### 1.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTES                             │
├──────────────┬──────────────────┬──────────────────────┤
│  Navegador   │   App Android    │   App iOS (Futuro)   │
│  (React.js)  │   (Kotlin)       │                      │
└──────┬───────┴────────┬─────────┴──────────────────────┘
       │                │
       │  HTTP/HTTPS    │
       │  REST API      │
       │                │
┌──────▼────────────────▼─────────────────────────────────┐
│            API REST (Backend)                            │
│            Node.js + Express.js                          │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │ Controllers│  │ Middleware │  │   Routes   │       │
│  └────────────┘  └────────────┘  └────────────┘       │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Mongoose ODM
                       │
┌──────────────────────▼──────────────────────────────────┐
│              BASE DE DATOS                               │
│              MongoDB Atlas (Cloud)                       │
│                                                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐          │
│  │ Productos │  │  Usuarios │  │   Guías   │          │
│  └───────────┘  └───────────┘  └───────────┘          │
└──────────────────────────────────────────────────────────┘
```

### 1.2 Stack Tecnológico

**Frontend Web:**
- React.js v18.2.0
- React Router DOM v6.x
- jsPDF v2.5.1
- CSS3 con Glassmorphism

**Backend API:**
- Node.js v16.x+
- Express.js v4.18.x
- Mongoose v7.x (ODM para MongoDB)
- JSON Web Tokens (JWT)
- bcrypt para hash de contraseñas

**Base de Datos:**
- MongoDB Atlas v6.0
- Cluster M0 (Free Tier) o superior

**Aplicación Móvil:**
- Android Studio Hedgehog 2023.1.1+
- Kotlin 1.8.0
- Gradle 8.0
- Material Design 3
- Retrofit 2.9.0 (Cliente HTTP)
- CameraX + ML Kit (Escaneo)

**Herramientas de Desarrollo:**
- Git para control de versiones
- npm/yarn para gestión de dependencias
- Postman para testing de API
- VS Code / Android Studio

---

## 2. REQUISITOS TÉCNICOS

### 2.1 Requisitos del Servidor

**Hardware Mínimo:**
- CPU: 2 cores
- RAM: 4 GB
- Disco: 20 GB SSD
- Red: 10 Mbps

**Hardware Recomendado:**
- CPU: 4+ cores
- RAM: 8 GB
- Disco: 50 GB SSD
- Red: 100 Mbps

**Sistema Operativo:**
- Ubuntu 20.04 LTS o superior
- CentOS 8+
- Windows Server 2019+
- macOS 11+ (desarrollo)

### 2.2 Software Requerido

**Backend:**
- Node.js v16.x o superior
- npm v8.x o yarn v1.22.x
- MongoDB Atlas cuenta (gratuita o de pago)

**Frontend:**
- Node.js v16.x+
- npm v8.x+
- Navegador moderno para testing

**Móvil:**
- JDK 17
- Android Studio Hedgehog+
- Gradle 8.0+
- Android SDK 34

---

## 3. INSTALACIÓN DEL BACKEND

### 3.1 Clonar el Repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/tu-usuario/sigid.git
cd sigid/backend
```

### 3.2 Instalar Dependencias

```bash
# Usando npm
npm install

# O usando yarn
yarn install
```

**Dependencias principales instaladas:**
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.3",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "express-validator": "^7.0.1"
}
```

### 3.3 Configurar Variables de Entorno

Crea un archivo `.env` en la raíz de `backend/`:

```env
# Servidor
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/sigid?retryWrites=true&w=majority

# JWT Secrets
JWT_SECRET=tu_clave_secreta_super_segura_2024
JWT_EXPIRE=7d

# Credenciales Admin
ADMIN_EMAIL=admin@lojjic.com
ADMIN_PASSWORD=ADSO2026

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# MFA (Futuro)
MFA_ENABLED=true
MFA_SECRET=tu_secreto_mfa
```

**⚠️ IMPORTANTE:** Nunca subas el archivo `.env` a Git. Ya está incluido en `.gitignore`.

### 3.4 Configurar MongoDB Atlas

1. **Crear cuenta en MongoDB Atlas:**
   - Ve a https://www.mongodb.com/cloud/atlas
   - Regístrate o inicia sesión
   - Crea un nuevo cluster (M0 Free Tier)

2. **Configurar Network Access:**
   - En Atlas, ve a "Network Access"
   - Clic en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (0.0.0.0/0) para desarrollo
   - En producción, restringe a IPs específicas

3. **Crear Usuario de BD:**
   - Ve a "Database Access"
   - Clic en "Add New Database User"
   - Usuario: `sigid_admin`
   - Contraseña: Genera una segura
   - Rol: "Read and Write to any database"

4. **Obtener Connection String:**
   - Ve a "Clusters" > "Connect"
   - Selecciona "Connect your application"
   - Copia el string de conexión
   - Reemplaza `<password>` con tu contraseña
   - Pega en `.env` como `MONGODB_URI`

### 3.5 Inicializar Base de Datos

```bash
# Ejecutar script de seed para datos iniciales
npm run seed

# O manualmente
node seed.js
```

**El script creará:**
- 8 productos de ejemplo
- Usuario admin
- Usuario operador
- 3 sedes de despacho

### 3.6 Iniciar el Servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

**Verificar que funciona:**
```bash
# Debería mostrar: "Server running on port 5000"
# Test endpoint
curl http://localhost:5000/api/health
# Respuesta esperada: {"status":"ok","timestamp":"..."}
```

---

## 4. INSTALACIÓN DEL FRONTEND

### 4.1 Navegar a la Carpeta

```bash
cd ../frontend
# O desde raíz del proyecto:
cd "SISTEMA DE GESTIÓN DE INVENTARIO Y DESPACHO (SIGID) - LOGÍSTICA DE TECNOLOGÍA/frontend"
```

### 4.2 Instalar Dependencias

```bash
npm install
```

**Dependencias principales:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.11.0",
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.5.31"
}
```

### 4.3 Configurar Variables de Entorno

Crea `.env.local` en `frontend/`:

```env
# URL del Backend API
REACT_APP_API_URL=http://localhost:5000/api

# Credenciales de Admin (solo desarrollo)
REACT_APP_ADMIN_EMAIL=admin@lojjic.com
REACT_APP_ADMIN_PASS=ADSO2026

# Configuración
REACT_APP_ENV=development
REACT_APP_VERSION=2.4.0
```

### 4.4 Iniciar Aplicación

```bash
# Modo desarrollo
npm start

# Se abrirá automáticamente en http://localhost:3000
```

### 4.5 Build para Producción

```bash
# Generar build optimizado
npm run build

# Los archivos estarán en /build
# Listos para desplegar en hosting (Vercel, Netlify, etc.)
```

---

## 5. INSTALACIÓN DE LA APP ANDROID

### 5.1 Abrir Proyecto en Android Studio

1. Abre Android Studio
2. File > Open
3. Selecciona la carpeta `android/`
4. Espera la sincronización de Gradle (puede tardar 5-10 min)

### 5.2 Configurar SDK

1. Ve a Tools > SDK Manager
2. Asegúrate de tener instalado:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android Emulator
   - Intel x86 Emulator Accelerator (HAXM)

### 5.3 Configurar URL del Backend

Edita `android/app/src/main/java/com/sigid/logistica/data/api/RetrofitClient.kt`:

```kotlin
object RetrofitClient {
    // Para emulador Android
    private const val BASE_URL = "http://10.0.2.2:5000/"
    
    // Para dispositivo físico, usa tu IP local
    // private const val BASE_URL = "http://192.168.1.XXX:5000/"
    
    // Para producción
    // private const val BASE_URL = "https://api.sigid.com/"
}
```

**Nota:** `10.0.2.2` es el localhost desde el emulador Android.

### 5.4 Ejecutar en Emulador

1. Tools > Device Manager
2. Clic en "Create Device"
3. Selecciona Pixel 6 (recomendado)
4. System Image: Android 13 (API 33)
5. Finish
6. Clic en ▶️ Run (Shift + F10)

### 5.5 Generar APK

**APK de Debug:**
```bash
# Desde terminal en la carpeta android/
./gradlew assembleDebug

# El APK estará en:
# android/app/build/outputs/apk/debug/app-debug.apk
```

**APK de Release (Producción):**
```bash
# Generar Keystore (primera vez)
keytool -genkey -v -keystore sigid-release.keystore -alias sigid -keyalg RSA -keysize 2048 -validity 10000

# Configurar en android/app/build.gradle:
signingConfigs {
    release {
        storeFile file("sigid-release.keystore")
        storePassword "tu_password"
        keyAlias "sigid"
        keyPassword "tu_password"
    }
}

# Generar APK firmado
./gradlew assembleRelease

# El APK estará en:
# android/app/build/outputs/apk/release/app-release.apk
```

### 5.6 Instalar APK en Dispositivo

**Método 1: USB**
```bash
# Habilitar "Depuración USB" en el dispositivo
# Conectar por USB
adb install app-debug.apk
```

**Método 2: Manual**
1. Copia el APK al dispositivo (email, Drive, etc.)
2. Abre el archivo en el dispositivo
3. Permitir instalar desde "Fuentes desconocidas"
4. Seguir el instalador

---

## 6. CONFIGURACIÓN DE BASE DE DATOS

### 6.1 Estructura de Colecciones

**Colección: `productos`**
```javascript
{
  "_id": ObjectId,
  "id": Number,
  "nombre": String,
  "precio": Number,
  "cat": String,
  "img": String,
  "detalles": String,
  "stock": Number,
  "createdAt": Date,
  "updatedAt": Date
}
```

**Colección: `usuarios`**
```javascript
{
  "_id": ObjectId,
  "email": String (unique),
  "password": String (hashed),
  "nombre": String,
  "rol": String (enum: ["admin", "operador"]),
  "activo": Boolean,
  "ultimoLogin": Date,
  "createdAt": Date
}
```

**Colección: `guias`**
```javascript
{
  "_id": ObjectId,
  "id_guia": String (unique),
  "fecha_emision": Date,
  "total_activos": Number,
  "valor_declarado": Number,
  "estado": String (enum: ["DESPACHADO", "EN_TRANSITO", "ENTREGADO"]),
  "sede_origen": String,
  "items": [ObjectId] (ref: productos),
  "usuario_creador": ObjectId (ref: usuarios),
  "createdAt": Date
}
```

### 6.2 Índices Recomendados

```javascript
// En MongoDB Shell o Compass
db.productos.createIndex({ "nombre": "text" });
db.productos.createIndex({ "cat": 1 });
db.productos.createIndex({ "stock": 1 });

db.usuarios.createIndex({ "email": 1 }, { unique: true });

db.guias.createIndex({ "id_guia": 1 }, { unique: true });
db.guias.createIndex({ "fecha_emision": -1 });
db.guias.createIndex({ "estado": 1 });
```

### 6.3 Backup y Restauración

**Backup:**
```bash
# Backup completo
mongodump --uri="mongodb+srv://usuario:password@cluster.mongodb.net/sigid" --out=./backup

# Backup de una colección específica
mongodump --uri="..." --collection=productos --out=./backup
```

**Restauración:**
```bash
# Restaurar todo
mongorestore --uri="mongodb+srv://usuario:password@cluster.mongodb.net/sigid" ./backup

# Restaurar una colección
mongorestore --uri="..." --collection=productos ./backup/sigid/productos.bson
```

---

## 7. DESPLIEGUE EN PRODUCCIÓN

### 7.1 Backend en Servidor Linux (Ubuntu)

**1. Preparar el Servidor:**
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version
```

**2. Clonar y Configurar:**
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/sigid.git
cd sigid/backend

# Instalar dependencias
npm install --production

# Copiar .env de producción
nano .env
# Configurar variables con datos reales
```

**3. Configurar PM2 (Process Manager):**
```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar aplicación
pm2 start index.js --name sigid-backend

# Configurar inicio automático
pm2 startup
pm2 save

# Monitorear
pm2 monit
pm2 logs sigid-backend
```

**4. Configurar Nginx como Reverse Proxy:**
```bash
# Instalar Nginx
sudo apt install nginx -y

# Crear configuración
sudo nano /etc/nginx/sites-available/sigid
```

Contenido del archivo:
```nginx
server {
    listen 80;
    server_name api.sigid.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar configuración
sudo ln -s /etc/nginx/sites-available/sigid /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**5. Configurar SSL con Let's Encrypt:**
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d api.sigid.com

# Renovación automática ya está configurada
```

### 7.2 Frontend en Vercel/Netlify

**Opción 1: Vercel**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desde la carpeta frontend/
vercel

# Seguir el asistente:
# - Set up and deploy: Yes
# - Which scope: tu cuenta
# - Link to existing project: No
# - Project name: sigid-frontend
# - Directory: ./
# - Override settings: No

# Configurar variables de entorno en Vercel Dashboard
# REACT_APP_API_URL=https://api.sigid.com/api
```

**Opción 2: Netlify**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=build

# Configurar variables en Netlify UI
```

### 7.3 Configurar Dominio Personalizado

**DNS Records:**
```
# Para backend
Type: A
Name: api
Value: [IP del servidor]

# Para frontend (si usas servidor propio)
Type: A
Name: @
Value: [IP del servidor]

# Para Vercel/Netlify
Type: CNAME
Name: www
Value: [dominio proporcionado por el servicio]
```

---

## 8. MANTENIMIENTO Y MONITOREO

### 8.1 Logs del Sistema

**Backend (PM2):**
```bash
# Ver logs en tiempo real
pm2 logs sigid-backend

# Ver solo errores
pm2 logs sigid-backend --err

# Limpiar logs antiguos
pm2 flush
```

**Frontend (Vercel):**
- Accede a https://vercel.com/dashboard
- Ve a tu proyecto
- Pestaña "Logs"

**MongoDB:**
- Accede a MongoDB Atlas Dashboard
- Ve a "Monitoring" > "Metrics"
- Revisa: Operations, Connections, Query Performance

### 8.2 Monitoreo de Rendimiento

**Herramientas recomendadas:**
1. **Uptime Robot** (https://uptimerobot.com/)
   - Monitoreo gratuito cada 5 minutos
   - Alertas por email/SMS

2. **New Relic** (https://newrelic.com/)
   - APM (Application Performance Monitoring)
   - Análisis de rendimiento en tiempo real

3. **Sentry** (https://sentry.io/)
   - Tracking de errores
   - Alertas automáticas

**Configurar Sentry en Backend:**
```bash
npm install @sentry/node

# En index.js:
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'tu_dsn_de_sentry' });
```

### 8.3 Backups Automáticos

**Script de backup diario:**
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/home/usuario/backups"
MONGO_URI="mongodb+srv://..."

# Crear backup
mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/backup-$DATE"

# Comprimir
tar -czf "$BACKUP_DIR/backup-$DATE.tar.gz" "$BACKUP_DIR/backup-$DATE"

# Eliminar carpeta sin comprimir
rm -rf "$BACKUP_DIR/backup-$DATE"

# Eliminar backups mayores a 30 días
find $BACKUP_DIR -name "backup-*.tar.gz" -mtime +30 -delete

echo "Backup completado: backup-$DATE.tar.gz"
```

**Configurar Cron Job:**
```bash
# Editar crontab
crontab -e

# Agregar línea (ejecutar a las 2 AM diariamente)
0 2 * * * /home/usuario/scripts/backup.sh >> /var/log/sigid-backup.log 2>&1
```

### 8.4 Actualizaciones de Seguridad

**Actualizar dependencias:**
```bash
# Backend
cd backend
npm audit
npm audit fix

# Frontend
cd frontend
npm audit
npm audit fix
```

**Actualizar Node.js:**
```bash
# Usando nvm
nvm install 18
nvm use 18
nvm alias default 18
```

---

## 9. TROUBLESHOOTING

### 9.1 Backend no inicia

**Error:** `Cannot find module 'express'`
```bash
# Solución
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Error:** `MongooseServerSelectionError`
```bash
# Verificar:
1. Connection string correcto en .env
2. IP permitida en MongoDB Atlas Network Access
3. Usuario de BD tiene permisos
4. Conexión a internet estable
```

**Error:** `Port 5000 already in use`
```bash
# Opción 1: Matar proceso
lsof -ti:5000 | xargs kill -9

# Opción 2: Cambiar puerto en .env
PORT=5001
```

### 9.2 Frontend no carga

**Error:** `Failed to compile`
```bash
# Limpiar caché
rm -rf node_modules/.cache
npm start
```

**Error:** `CORS policy blocked`
```bash
# Verificar en backend:
# cors configurado correctamente
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));
```

### 9.3 Android no conecta al backend

**Error:** `Unable to resolve host`
```bash
# Verificar:
1. RetrofitClient.kt tiene la URL correcta
2. Para emulador: http://10.0.2.2:5000/
3. Para dispositivo físico: http://[TU_IP_LOCAL]:5000/
4. Backend corriendo
5. android:usesCleartextTraffic="true" en Manifest
```

**Encontrar tu IP local:**
```bash
# Linux/Mac
ifconfig | grep inet

# Windows
ipconfig
```

### 9.4 MongoDB no responde

**Error:** `Timed out`
```bash
# Verificar:
1. Cluster activo en Atlas
2. Conexiones disponibles no agotadas
3. Whitelist IP correcta
4. Verificar en Atlas: Metrics > Connections
```

**Error:** `Authentication failed`
```bash
# Regenerar credenciales:
1. Atlas > Database Access
2. Editar usuario
3. "Edit Password" > Auto-generate
4. Actualizar en .env
```

---

## 10. COMANDOS ÚTILES

### Backend
```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Iniciar producción
npm start

# Ejecutar seed
npm run seed

# Limpiar node_modules
rm -rf node_modules package-lock.json && npm install
```

### Frontend
```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm start

# Build producción
npm run build

# Servir build localmente
npx serve -s build
```

### Android
```bash
# Limpiar proyecto
./gradlew clean

# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# Instalar en dispositivo
adb install app-debug.apk

# Ver logs del dispositivo
adb logcat
```

### Git
```bash
# Clonar repositorio
git clone [URL]

# Crear rama
git checkout -b feature/nueva-funcionalidad

# Commit
git add .
git commit -m "Descripción del cambio"

# Push
git push origin feature/nueva-funcionalidad

# Pull request en GitHub
```

---

## 11. REFERENCIAS

### Documentación Oficial
- Node.js: https://nodejs.org/docs/
- React: https://react.dev/
- Express: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/
- Kotlin: https://kotlinlang.org/docs/
- Android: https://developer.android.com/

### Tutoriales Recomendados
- MERN Stack: https://www.mongodb.com/mern-stack
- React Hooks: https://react.dev/reference/react
- Android Jetpack: https://developer.android.com/jetpack

---

**Fin del Manual Técnico**

*Elaborado por el equipo de desarrollo - SENA ADSO 2024-2026*

**Soporte técnico:** desarrollo@lojjic.com
