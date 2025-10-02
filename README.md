<div align="center">

# 🎛️ FORMOTEX — Inventario de Equipos (Backend)

API REST construida con Node.js, Express y TypeScript para gestionar usuarios y equipos informáticos, con autenticación JWT y PostgreSQL.

<p>
	<img alt="Node" src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white" />
	<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" />
	<img alt="Express" src="https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white" />
	<img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-14%2B-4169E1?logo=postgresql&logoColor=white" />
	<img alt="JWT" src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white" />
</p>

</div>

---

## 📚 Tabla de contenidos

- [🚀 Instrucciones para ejecutar el backend](#-instrucciones-para-ejecutar-el-backend)
- [🧩 Endpoints disponibles](#-endpoints-disponibles)
- [🧪 Pruebas rápidas](#-pruebas-rápidas)
- [🧱 Estructura del proyecto](#-estructura-del-proyecto)
- [🧠 Justificación técnica](#-justificación-técnica)
- [🔮 Próximos pasos](#-próximos-pasos)

---

## 🚀 Instrucciones para ejecutar el backend

Este documento cumple el punto “Documentación requerida”: contiene dependencias necesarias, comandos para iniciar el backend, configuración de variables de entorno, y justificación técnica.

## 1) Instrucciones para ejecutar el backend

### Requisitos previos

- Node.js 18+ y npm
- PostgreSQL (configurado localmente) — si no lo tienes, instala PostgreSQL y crea la base de datos indicada en Variables de entorno

### Instalación

```bash
# Desde la raíz del proyecto
cd backend

# Instalar dependencias
npm install
```

### Variables de entorno

Crea un archivo `.env` en `backend/` con el siguiente contenido (ejemplo real del proyecto):

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=InventarioDB
DB_USER=postgres
DB_PASSWORD=2204

# Autenticación
JWT_SECRET=una_clave_muy_secreta_que_nadie_debe_saber
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=10

```

Sugerencias:

- Cambia `DB_PASSWORD` por tu contraseña real de PostgreSQL.
- Asegúrate de que la base `InventarioDB` exista en tu servidor local de PostgreSQL.

### Comandos disponibles

```bash
# Desarrollo con recarga automática
npm run dev

# Compilar TypeScript a JavaScript en dist/
npm run build

# Ejecutar compilado (producción local)
npm start

# Limpiar carpeta dist/
npm run clean
```

### Levantar el backend

```bash
cd backend
npm run dev
```

Por defecto el servidor se inicia en: http://localhost:3000

---

## 🧩 Endpoints disponibles

Base URL: `http://localhost:3000`

- Healthcheck: `GET /api/health`
- Autenticación:
	- `POST /api/auth/login`
	- `POST /api/auth/register` (protegido: requiere rol `admin`)
- Usuarios (`/api/users`):
	- `POST /api/users`
	- `GET /api/users`
	- `GET /api/users/:id`
	- `DELETE /api/users/:id`
- Equipos (`/api/equip`):
	- `POST /api/equip`
	- `GET /api/equip`
	- `GET /api/equip/:id`
	- `DELETE /api/equip/:id`

Autenticación de rutas protegidas mediante header:

```http
Authorization: Bearer <token>
```

---

## 🧠 Justificación técnica

### Diseño de entidades y relaciones

- Usuario (`User`):
	- Propiedades típicas: `id`, `nombre`, `email` (único), `password` (hash), `rol` (`admin` | `user`), `createdAt`, `updatedAt`.
	- Razón: el email es la clave natural única para autenticación; se aplica hash a la contraseña con `bcrypt`.
- Equipo (`Equipment`):
	- Propiedades esperadas: `id`, `nombre`, `tipo`, `marca`, `modelo`, `numeroSerie`, `estado` (ej. operativo, en reparación, dado de baja), `ubicacion`, `asignadoA` (FK a `User.id`), `observaciones`, `createdAt`, `updatedAt`.
	- Relación principal: un usuario puede tener muchos equipos asignados (1:N). Esta relación permite saber el responsable actual de cada equipo.

Decisiones clave:

- Se prioriza un modelo con campos “relevantes” más allá del nombre, para apoyar mantenibilidad, auditoría y trazabilidad.
- Se define unicidad por `email` en usuarios; en equipos es recomendable unicidad por `numeroSerie`.

### Organización de carpetas (arquitectura por capas)

```
src/
	controllers/      # Traducen HTTP ↔ dominio. Sin lógica de negocio.
	services/         # Lógica de negocio y orquestación de datos.
	routes/           # Rutas HTTP a controllers.
	middleware/       # Autenticación, autorización, validaciones.
	helpers/          # Utilidades (JWT, etc.).
	models/           # Modelos/Tipos de dominio.
	types/            # Tipos de TS y extensiones (por ej., Request.user).
	database.ts       # Conexión a PostgreSQL.
	app.ts            # Bootstrap del servidor y wiring de middlewares/rutas.
```

Razones:

- Separación de responsabilidades (SRP) para mejorar mantenibilidad y testeabilidad.
- Evita “controllers gordos”; la lógica vive en `services/`.
- `middleware/` centraliza preocupaciones transversales (auth, permisos, validación).

### Propiedades relevantes por entidad

- Usuario: `email` único, `rol` para control de permisos, timestamps para auditoría.
- Equipo: `numeroSerie` único `asignadoA` para responsabilidad.

### Librerías seleccionadas y motivo

- `dotenv`: gestión de configuración por entorno 
- `jsonwebtoken`: emisión/verificación de JWT para auth.
- `bcrypt`/`bcryptjs`: hash seguro de contraseñas (configurable con `BCRYPT_SALT_ROUNDS`).
- `pg`: cliente PostgreSQL nativo.
- `helmet` y `morgan`: seguridad de cabeceras y logging HTTP (disponibles para fortalecer prod).
- `tsx`: experiencia rápida en desarrollo con ES Modules y TS.
- `typescript`: tipado estricto para prevenir errores y mejorar DX.

### Prácticas y patrones

- Arquitectura en capas: `Route → Controller → Service → Data`.
- Middlewares: `authenticate` (valida JWT) y `authorize` (verifica rol, p. ej. `admin`).
- Tipado estricto (TS) y `tsconfig` con `strict`, `noUnused*`, etc.
- ES Modules (`"type": "module"`) para alinearse con el estándar moderno.

### Control de acceso y validaciones

- Autenticación: JWT via header `Authorization: Bearer <token>`.
- Autorización por roles vía `authorize("admin")` en endpoints sensibles (por ejemplo, registro de usuarios).
- Unicidad: `email` (usuarios) y recomendado `numeroSerie` (equipos).
- Validaciones: centralizables en middleware o services según complejidad (futuro: integrar `express-validator` o esquemas con Zod/Yup).


---