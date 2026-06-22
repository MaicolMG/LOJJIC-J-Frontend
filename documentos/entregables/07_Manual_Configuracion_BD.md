# MANUAL DE CONFIGURACIÓN DE BASE DE DATOS
## SISTEMA DE GESTIÓN DE INVENTARIO Y DESPACHO (SIGID)

---

**DBMS:** MongoDB Atlas v6.0  
**ODM:** Mongoose v7.x  
**Fecha:** [Fecha actual]  
**Versión:** 1.0

---

## ÍNDICE

1. Introducción a MongoDB
2. Configuración de MongoDB Atlas
3. Estructura de la Base de Datos
4. Scripts de Inicialización
5. Operaciones CRUD
6. Índices y Optimización
7. Seguridad y Respaldos
8. Migración de Datos

---

## 1. INTRODUCCIÓN A MONGODB

### 1.1 ¿Por qué MongoDB?

MongoDB es una base de datos NoSQL orientada a documentos que ofrece:

✓ **Flexibilidad:** Esquema dinámico, ideal para desarrollo ágil  
✓ **Escalabilidad:** Escala horizontalmente con sharding  
✓ **Alto rendimiento:** Consultas rápidas con índices  
✓ **JSON nativo:** Integración perfecta con JavaScript/Node.js  
✓ **Cloud-ready:** MongoDB Atlas simplifica el despliegue

### 1.2 Conceptos Clave

| Concepto SQL | Equivalente MongoDB | Descripción |
|--------------|---------------------|-------------|
| Database | Database | Conjunto de colecciones |
| Table | Collection | Grupo de documentos |
| Row | Document | Registro individual (JSON/BSON) |
| Column | Field | Atributo del documento |
| Index | Index | Optimización de consultas |
| JOIN | Embedded/Reference | Relación entre colecciones |

### 1.3 Formato de Documentos (BSON)

```javascript
// Documento de ejemplo
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "nombre": "Apple MacBook Pro M3 Max",
  "precio": 15499000,
  "stock": 12,
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

## 2. CONFIGURACIÓN DE MONGODB ATLAS

### 2.1 Crear Cuenta y Cluster

**Paso 1: Registro**
1. Ve a https://www.mongodb.com/cloud/atlas/register
2. Regístrate con email o cuenta de Google
3. Verifica tu correo electrónico

**Paso 2: Crear Organización y Proyecto**
1. Nombre de organización: `LOJJIC-J SISTEMAS`
2. Crear proyecto: `SIGID-Produccion`

**Paso 3: Desplegar Cluster**
1. Clic en "Build a Database"
2. Selecciona **M0 (Free Tier)**:
   - Provider: AWS
   - Region: `us-east-1` (Virginia) - Más cercana a Colombia
   - Cluster Name: `SIGID-Cluster`
3. Clic en "Create"

**Tiempo de creación:** 3-5 minutos

### 2.2 Configurar Seguridad

**A. Network Access (IP Whitelist)**
1. Ve a "Network Access" en el menú lateral
2. Clic en "Add IP Address"
3. Opciones:
   - **Desarrollo:** "Allow Access from Anywhere" (0.0.0.0/0)
   - **Producción:** Agregar IP del servidor específica

```bash
# Obtener IP pública del servidor
curl ifconfig.me
# Ejemplo: 198.51.100.25
```

4. Clic en "Confirm"

**B. Database Access (Usuarios)**
1. Ve a "Database Access"
2. Clic en "Add New Database User"
3. Configuración:
   - Authentication Method: **Password**
   - Username: `sigid_admin`
   - Password: **Auto-generate Secure Password** (guárdala)
   - Database User Privileges: **Read and write to any database**
   - Built-in Role: `readWriteAnyDatabase`
4. Clic en "Add User"

### 2.3 Obtener Connection String

1. Ve a "Database" > "Connect"
2. Selecciona "Connect your application"
3. Driver: **Node.js** / Version: **4.1 or later**
4. Copia el string:

```
mongodb+srv://sigid_admin:<password>@sigid-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. Reemplaza `<password>` con la contraseña del usuario
6. Agrega el nombre de la base de datos: `/sigid`

**String final:**
```
mongodb+srv://sigid_admin:Tu_Password_Aqui@sigid-cluster.xxxxx.mongodb.net/sigid?retryWrites=true&w=majority
```

### 2.4 Configurar en la Aplicación

Edita `backend/.env`:

```env
MONGODB_URI=mongodb+srv://sigid_admin:Tu_Password@sigid-cluster.xxxxx.mongodb.net/sigid?retryWrites=true&w=majority
```

---

## 3. ESTRUCTURA DE LA BASE DE DATOS

### 3.1 Diagrama Entidad-Relación

```
┌─────────────────┐
│    USUARIOS     │
├─────────────────┤
│ _id             │◄──────┐
│ email (unique)  │       │
│ password (hash) │       │
│ nombre          │       │ (creador)
│ rol             │       │
│ activo          │       │
│ ultimoLogin     │       │
│ createdAt       │       │
└─────────────────┘       │
                          │
┌─────────────────┐       │
│   PRODUCTOS     │       │
├─────────────────┤       │
│ _id             │◄──┐   │
│ id (number)     │   │   │
│ nombre          │   │   │
│ precio          │   │   │
│ cat             │   │   │
│ img             │   │   │
│ detalles        │   │   │
│ stock           │   │ (items)
│ createdAt       │   │   │
│ updatedAt       │   │   │
└─────────────────┘   │   │
                      │   │
┌─────────────────┐   │   │
│     GUIAS       │   │   │
├─────────────────┤   │   │
│ _id             │   │   │
│ id_guia (unique)│   │   │
│ fecha_emision   │   │   │
│ total_activos   │   │   │
│ valor_declarado │   │   │
│ estado          │   │   │
│ sede_origen     │   │   │
│ items [ref] ────┼───┘   │
│ usuario_creador ┼───────┘
│ createdAt       │
└─────────────────┘
```

### 3.2 Colección: `productos`

**Schema Definition (Mongoose):**
```javascript
const productoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  cat: {
    type: String,
    required: true,
    enum: ['Portátiles', 'Móviles', 'Consolas', 'Accesorios']
  },
  img: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/300'
  },
  detalles: {
    type: String,
    maxlength: 500
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  timestamps: true  // Crea automáticamente createdAt y updatedAt
});
```

**Documento de ejemplo:**
```json
{
  "_id": "65a7b8c9d4e5f6a7b8c9d4e5",
  "id": 1,
  "nombre": "Apple MacBook Pro M3 Max",
  "precio": 15499000,
  "cat": "Portátiles",
  "img": "https://m.media-amazon.com/images/I/618S69vK6mL._AC_UF1000,1000_QL80_.jpg",
  "detalles": "Arquitectura Chip M3 Max de Apple, 36GB RAM, SSD 1TB",
  "stock": 12,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-02-20T14:45:30.000Z"
}
```

### 3.3 Colección: `usuarios`

**Schema Definition:**
```javascript
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  rol: {
    type: String,
    required: true,
    enum: ['admin', 'operador', 'cliente'],
    default: 'operador'
  },
  activo: {
    type: Boolean,
    default: true
  },
  ultimoLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

**Documento de ejemplo:**
```json
{
  "_id": "65a7b8c9d4e5f6a7b8c9d4e6",
  "email": "admin@lojjic.com",
  "password": "$2b$10$xQZ5kJmPqYnXyZ3kJmPqYnXyZ...",
  "nombre": "Juan Martínez",
  "rol": "admin",
  "activo": true,
  "ultimoLogin": "2024-02-28T09:15:00.000Z",
  "createdAt": "2023-12-01T08:00:00.000Z",
  "updatedAt": "2024-02-28T09:15:00.000Z"
}
```

### 3.4 Colección: `guias`

**Schema Definition:**
```javascript
const guiaSchema = new mongoose.Schema({
  id_guia: {
    type: String,
    required: true,
    unique: true,
    match: [/^GUIA-\d{4}$/, 'Formato: GUIA-XXXX']
  },
  fecha_emision: {
    type: Date,
    required: true,
    default: Date.now
  },
  total_activos: {
    type: Number,
    required: true,
    min: 1
  },
  valor_declarado: {
    type: Number,
    required: true,
    min: 0
  },
  estado: {
    type: String,
    required: true,
    enum: ['DESPACHADO', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO'],
    default: 'DESPACHADO'
  },
  sede_origen: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'
  }],
  usuario_creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, {
  timestamps: true
});
```

**Documento de ejemplo:**
```json
{
  "_id": "65a7b8c9d4e5f6a7b8c9d4e7",
  "id_guia": "GUIA-4521",
  "fecha_emision": "2024-02-28T10:30:00.000Z",
  "total_activos": 3,
  "valor_declarado": 28000000,
  "estado": "DESPACHADO",
  "sede_origen": "Logytech Fontanar - Chía",
  "items": [
    "65a7b8c9d4e5f6a7b8c9d4e5",
    "65a7b8c9d4e5f6a7b8c9d4e8",
    "65a7b8c9d4e5f6a7b8c9d4e9"
  ],
  "usuario_creador": "65a7b8c9d4e5f6a7b8c9d4e6",
  "createdAt": "2024-02-28T10:30:00.000Z",
  "updatedAt": "2024-02-28T10:30:00.000Z"
}
```

---

## 4. SCRIPTS DE INICIALIZACIÓN

### 4.1 Conectar a MongoDB

**Archivo:** `backend/config/database.js`

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 4.2 Script de Seed (Datos Iniciales)

**Archivo:** `backend/seed.js`

```javascript
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');
const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');

const productos = [
  {
    id: 1,
    nombre: 'Apple MacBook Pro M3 Max',
    precio: 15499000,
    cat: 'Portátiles',
    img: 'https://m.media-amazon.com/images/I/618S69vK6mL._AC_UF1000,1000_QL80_.jpg',
    detalles: 'Chip M3 Max, 36GB RAM, SSD 1TB',
    stock: 12
  },
  {
    id: 2,
    nombre: 'Samsung Galaxy S24 Ultra',
    precio: 6899000,
    cat: 'Móviles',
    img: 'https://m.media-amazon.com/images/I/71RZA9Lpg8L._AC_UF1000,1000_QL80_.jpg',
    detalles: 'Snapdragon 8 Gen 3, 200MP, Dynamic AMOLED 2X',
    stock: 25
  },
  // ... más productos
];

const usuarios = [
  {
    email: 'admin@lojjic.com',
    password: 'ADSO2026',  // Se hasheará automáticamente
    nombre: 'Administrador SIGID',
    rol: 'admin'
  },
  {
    email: 'operador@lojjic.com',
    password: 'Operador2024',
    nombre: 'Operador Logístico',
    rol: 'operador'
  }
];

const seedDB = async () => {
  try {
    await connectDB();

    // Limpiar colecciones existentes
    await Producto.deleteMany({});
    await Usuario.deleteMany({});

    // Insertar productos
    const productosCreados = await Producto.insertMany(productos);
    console.log(`✓ ${productosCreados.length} productos insertados`);

    // Insertar usuarios
    for (const usuario of usuarios) {
      await Usuario.create(usuario);
    }
    console.log(`✓ ${usuarios.length} usuarios insertados`);

    console.log('✅ Base de datos inicializada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al inicializar BD:', error);
    process.exit(1);
  }
};

seedDB();
```

**Ejecutar:**
```bash
node seed.js
```

---

## 5. OPERACIONES CRUD

### 5.1 CREATE (Crear)

**Insertar un documento:**
```javascript
// Crear un producto
const nuevoProducto = new Producto({
  id: 9,
  nombre: 'iPhone 16 Pro',
  precio: 7500000,
  cat: 'Móviles',
  stock: 15
});

await nuevoProducto.save();
```

**Insertar múltiples:**
```javascript
await Producto.insertMany([
  { id: 10, nombre: 'Producto 1', ... },
  { id: 11, nombre: 'Producto 2', ... }
]);
```

### 5.2 READ (Leer)

**Buscar todos:**
```javascript
const productos = await Producto.find();
```

**Buscar con filtro:**
```javascript
// Por categoría
const portatiles = await Producto.find({ cat: 'Portátiles' });

// Por ID
const producto = await Producto.findOne({ id: 1 });

// Con operadores
const stockBajo = await Producto.find({ stock: { $lt: 10 } });
```

**Buscar con populate (JOIN):**
```javascript
const guia = await Guia.findOne({ id_guia: 'GUIA-4521' })
  .populate('items')
  .populate('usuario_creador', 'nombre email');
```

**Búsqueda de texto:**
```javascript
const resultados = await Producto.find({
  $text: { $search: 'MacBook' }
});
```

### 5.3 UPDATE (Actualizar)

**Actualizar uno:**
```javascript
await Producto.findOneAndUpdate(
  { id: 1 },
  { $set: { stock: 10, precio: 15999000 } },
  { new: true }  // Retornar documento actualizado
);
```

**Incrementar/Decrementar:**
```javascript
// Restar stock después de venta
await Producto.findOneAndUpdate(
  { id: 1 },
  { $inc: { stock: -1 } }
);
```

**Actualizar múltiples:**
```javascript
await Producto.updateMany(
  { cat: 'Portátiles' },
  { $inc: { precio: 100000 } }  // Aumentar 100k
);
```

### 5.4 DELETE (Eliminar)

**Eliminar uno:**
```javascript
await Producto.findOneAndDelete({ id: 9 });
```

**Eliminar múltiples:**
```javascript
await Producto.deleteMany({ stock: 0 });
```

---

## 6. ÍNDICES Y OPTIMIZACIÓN

### 6.1 Crear Índices

**En MongoDB Compass:**
1. Conecta a tu cluster
2. Selecciona la colección
3. Pestaña "Indexes"
4. Clic en "Create Index"

**Con Mongoose:**
```javascript
// En el schema
productoSchema.index({ nombre: 'text' });
productoSchema.index({ cat: 1 });
productoSchema.index({ stock: 1 });

usuarioSchema.index({ email: 1 }, { unique: true });

guiaSchema.index({ id_guia: 1 }, { unique: true });
guiaSchema.index({ fecha_emision: -1 });
```

**Con MongoDB Shell:**
```javascript
db.productos.createIndex({ "nombre": "text" });
db.productos.createIndex({ "cat": 1 });
db.productos.createIndex({ "stock": 1 });

db.usuarios.createIndex({ "email": 1 }, { unique: true });

db.guias.createIndex({ "id_guia": 1 }, { unique: true });
db.guias.createIndex({ "fecha_emision": -1 });
```

### 6.2 Analizar Performance

**Explain Plan:**
```javascript
// Verificar si se usa índice
const explain = await Producto.find({ cat: 'Portátiles' }).explain('executionStats');

console.log('Documentos examinados:', explain.executionStats.totalDocsExamined);
console.log('Documentos retornados:', explain.executionStats.nReturned);
console.log('Tiempo (ms):', explain.executionStats.executionTimeMillis);
```

---

## 7. SEGURIDAD Y RESPALDOS

### 7.1 Configurar Roles de Usuario

```javascript
// Usuario solo lectura
db.createUser({
  user: "sigid_readonly",
  pwd: "password_seguro",
  roles: [{ role: "read", db: "sigid" }]
});

// Usuario lectura/escritura
db.createUser({
  user: "sigid_readwrite",
  pwd: "password_seguro",
  roles: [{ role: "readWrite", db: "sigid" }]
});
```

### 7.2 Backup Manual

**Exportar colección:**
```bash
mongoexport --uri="mongodb+srv://..." \
  --collection=productos \
  --out=productos_backup.json
```

**Importar colección:**
```bash
mongoimport --uri="mongodb+srv://..." \
  --collection=productos \
  --file=productos_backup.json
```

### 7.3 Backup Completo

```bash
# Backup de toda la BD
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/sigid" \
  --out=./backup_$(date +%Y%m%d)

# Restaurar
mongorestore --uri="mongodb+srv://..." \
  ./backup_20240228/sigid
```

### 7.4 Backup Automático en Atlas

1. Ve a "Backups" en Atlas Dashboard
2. Activa "Enable Cloud Backups"
3. Configura frecuencia (diario, semanal)
4. Retención: 7 días (Free Tier) o más (Paid)

---

## 8. MIGRACIÓN DE DATOS

### 8.1 Migrar desde SQL

**Ejemplo: Migrar desde MySQL**

```javascript
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

async function migrarProductos() {
  // Conectar a MySQL
  const mysqlConn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'old_sigid'
  });

  // Conectar a MongoDB
  await mongoose.connect(process.env.MONGODB_URI);

  // Obtener datos de MySQL
  const [rows] = await mysqlConn.execute('SELECT * FROM productos');

  // Transformar e insertar en MongoDB
  for (const row of rows) {
    await Producto.create({
      id: row.id,
      nombre: row.nombre,
      precio: row.precio,
      cat: row.categoria,
      stock: row.stock
    });
  }

  console.log(`✓ ${rows.length} productos migrados`);
}
```

### 8.2 Migrar Estructura

```javascript
// Renombrar campo
await Producto.updateMany(
  {},
  { $rename: { "categoria": "cat" } }
);

// Agregar campo nuevo
await Producto.updateMany(
  {},
  { $set: { activo: true } }
);
```

---

## 9. CONSULTAS AVANZADAS

### 9.1 Agregaciones

**Total de ventas por categoría:**
```javascript
const ventasPorCategoria = await Producto.aggregate([
  {
    $group: {
      _id: "$cat",
      total: { $sum: "$precio" },
      cantidad: { $sum: 1 }
    }
  },
  {
    $sort: { total: -1 }
  }
]);
```

**Productos con stock crítico:**
```javascript
const stockCritico = await Producto.aggregate([
  { $match: { stock: { $lt: 10 } } },
  { $sort: { stock: 1 } },
  { $project: { nombre: 1, stock: 1, _id: 0 } }
]);
```

### 9.2 Transacciones

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Operación 1: Restar stock
  await Producto.updateOne(
    { id: 1 },
    { $inc: { stock: -1 } },
    { session }
  );

  // Operación 2: Crear guía
  await Guia.create([{
    id_guia: 'GUIA-5000',
    // ...
  }], { session });

  await session.commitTransaction();
  console.log('✓ Transacción exitosa');
} catch (error) {
  await session.abortTransaction();
  console.error('✗ Transacción fallida:', error);
} finally {
  session.endSession();
}
```

---

## 10. MONITOREO

### 10.1 Métricas en Atlas

**Dashboard:**
- Operations/sec
- Connections
- Network
- Query Performance

**Alertas configurables:**
- Conexiones > 80%
- CPU > 75%
- Disk space < 10%

### 10.2 Logs

**Desde código:**
```javascript
mongoose.set('debug', true);  // Mostrar queries en consola
```

**En Atlas:**
- Real-time Performance Panel
- Slow Query Logs

---

**Fin del Manual de Configuración de BD**

*Elaborado por el equipo de desarrollo - SENA ADSO 2024-2026*
