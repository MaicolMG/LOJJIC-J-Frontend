# SIGID - Aplicación Android

## 📱 Sistema de Gestión de Inventario y Despacho

Aplicación móvil nativa para Android desarrollada con Kotlin.

---

## 🚀 Instrucciones de Inicio

### Requisitos Previos
- Android Studio Hedgehog (2023.1.1) o superior
- JDK 17 o superior
- Gradle 8.0+
- Dispositivo Android o Emulador con API Level 24+ (Android 7.0)

### Pasos para Iniciar

1. **Abrir el Proyecto**
   ```bash
   # Abre Android Studio
   # File > Open > Selecciona la carpeta "android"
   ```

2. **Sincronizar Gradle**
   - Android Studio sincronizará automáticamente
   - O manualmente: File > Sync Project with Gradle Files

3. **Configurar el Backend**
   - Asegúrate que el backend esté corriendo en `http://localhost:5000`
   - Para emulador, la app usa `http://10.0.2.2:5000` automáticamente
   - Para dispositivo físico, edita `RetrofitClient.kt` y cambia a tu IP local

4. **Ejecutar la Aplicación**
   - Click en el botón ▶️ Run
   - O presiona Shift + F10

---

## 📂 Estructura del Proyecto

```
app/
├── src/main/
│   ├── java/com/sigid/logistica/
│   │   ├── data/
│   │   │   ├── api/          # Retrofit API Service
│   │   │   ├── models/       # Modelos de datos
│   │   │   └── repository/   # Repositorios
│   │   ├── ui/
│   │   │   ├── activities/   # Activities principales
│   │   │   ├── fragments/    # Fragments de navegación
│   │   │   └── adapters/     # RecyclerView Adapters
│   │   ├── viewmodels/       # ViewModels (MVVM)
│   │   └── utils/            # Utilidades
│   ├── res/
│   │   ├── layout/           # Archivos XML de UI
│   │   ├── values/           # Colores, strings, temas
│   │   ├── menu/             # Menús de navegación
│   │   └── navigation/       # Navigation Graph
│   └── AndroidManifest.xml
```

---

## ✨ Funcionalidades Implementadas

### ✅ Módulos Principales
- **Login/Autenticación** - Sistema de login con MFA
- **Catálogo de Productos** - Grid con productos del backend
- **Carrito de Compras** - Gestión de items seleccionados
- **Panel Logístico** - Vista para operadores
- **Panel Admin** - Dashboard administrativo

### 🔧 Características Técnicas
- Arquitectura MVVM (Model-View-ViewModel)
- Retrofit para consumo de API REST
- Navigation Component para navegación
- Material Design 3
- Coroutines para operaciones asíncronas
- ViewBinding para acceso a vistas

---

## 🔐 Credenciales de Prueba

```
Email: admin@lojjic.com
Password: ADSO2026
MFA Code: 123456
```

---

## 📡 Configuración de Red

### Para Emulador Android
```kotlin
// RetrofitClient.kt
private const val BASE_URL = "http://10.0.2.2:5000/"
```

### Para Dispositivo Físico
```kotlin
// Cambia por tu IP local
private const val BASE_URL = "http://192.168.1.XXX:5000/"
```

---

## 🛠️ Dependencias Principales

```gradle
// Retrofit - Cliente HTTP
implementation 'com.squareup.retrofit2:retrofit:2.9.0'
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'

// Material Design
implementation 'com.google.android.material:material:1.11.0'

// ViewModel & LiveData
implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0'
implementation 'androidx.lifecycle:lifecycle-livedata-ktx:2.7.0'

// Navigation Component
implementation 'androidx.navigation:navigation-fragment-ktx:2.7.6'
implementation 'androidx.navigation:navigation-ui-ktx:2.7.6'

// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3'
```

---

## 🐛 Troubleshooting

### Error de conexión al backend
- Verifica que el backend esté corriendo
- Revisa la URL en `RetrofitClient.kt`
- Asegúrate de tener `android:usesCleartextTraffic="true"` en el Manifest

### Gradle Sync Failed
```bash
./gradlew clean
./gradlew build
```

### Permisos de Internet
- Ya están configurados en `AndroidManifest.xml`
- `INTERNET`, `CAMERA` (para futuro escaneo)

---

## 📱 Pantallas de la App

1. **Login** - Autenticación corporativa
2. **Catálogo** - Grid de productos con precio y stock
3. **Carrito** - Lista de items seleccionados con total
4. **Logística** - Panel de operaciones
5. **Admin** - Dashboard administrativo

---

## 🎨 Tema y Colores

```xml
<!-- Oro corporativo -->
<color name="oro">#B8860B</color>

<!-- Colores de estado -->
<color name="verde_exito">#10B981</color>
<color name="rojo_error">#EF4444</color>
```

---

## 📝 Próximas Funcionalidades

- [ ] Escaneo de códigos de barras con CameraX
- [ ] Generación de PDF de guías de despacho
- [ ] Sincronización offline con Room Database
- [ ] Push notifications
- [ ] Biometría para login

---

## 👨‍💻 Desarrollador

**Maicol Andres Matallana Garcia**  
Programa: Análisis y Desarrollo de Software (ADSO) - SENA  
Proyecto: SIGID v2.4.0 - Guía 8  

---

## 📄 Licencia

Proyecto Académico ADSO 2024-2026  
SENA - Centro Agropecuario Chiquinquirá
