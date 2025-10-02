# Frontend - Sistema de Inventario FORMOTEX

Frontend modular y escalable del Sistema de Gestión de Inventario de FORMOTEX, desarrollado con React, Vite y Tailwind CSS.

## 🏗️ Arquitectura Componentizada

### 📁 Estructura Semántica y Organizada

```
src/
├── components/              # Componentes de UI organizados por tipo
│   ├── ui/                 # Componentes reutilizables de interfaz
│   │   ├── Layout.jsx     # Layout base de la aplicación
│   │   ├── PageHeader.jsx # Header reutilizable para páginas
│   │   ├── Loading.jsx    # Componentes de carga
│   │   ├── Alert.jsx      # Sistema de alertas
│   │   └── index.js       # Exportaciones centralizadas
│   ├── pages/             # Componentes de páginas/vistas
│   │   ├── Dashboard.jsx  # Panel principal
│   │   ├── Login.jsx      # Autenticación
│   │   ├── Register.jsx   # Registro de usuarios
│   │   ├── UserManagement.jsx # Gestión de usuarios
│   │   ├── Equipment.jsx  # Gestión de equipos
│   │   └── Settings.jsx   # Configuración
│   └── TailwindTest.jsx   # Componente de prueba (temporal)
├── routes/                # Sistema de rutas modular
│   ├── AppRoutes.jsx     # Router principal
│   ├── PublicRoutes.jsx  # Rutas públicas
│   ├── ProtectedRoutes.jsx # Rutas protegidas básicas
│   ├── AdminRoutes.jsx   # Rutas de administrador
│   └── SpecialRoutes.jsx # Rutas especiales y 404
├── helpers/              # Utilidades y helpers
│   ├── routeGuards.jsx   # Protección de rutas
│   └── utils.js          # Funciones utilitarias
├── hooks/                # Hooks personalizados
│   ├── useAuth.jsx       # Manejo de autenticación
│   └── useUsers.jsx      # Manejo de usuarios
├── services/             # Servicios API
│   ├── api.js           # Configuración base de Axios
│   ├── authService.js   # Servicio de autenticación
│   └── userService.js   # Servicio de usuarios
├── config/              # Configuraciones
│   └── navigation.js    # Configuración de navegación
├── constants/           # Constantes de la aplicación
│   └── index.js         # Constantes centralizadas
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## � Características Avanzadas

### ✅ Funcionalidades Implementadas
- **Arquitectura Modular**: Separación clara de responsabilidades
- **Context API**: Manejo global de estado de autenticación
- **Hooks Personalizados**: Lógica reutilizable encapsulada
- **Rutas Organizadas**: Sistema modular de routing
- **Componentes Reutilizables**: UI consistente y mantenible
- **Protección de Rutas**: Control granular de acceso
- **Estados de Carga**: UX mejorada con indicadores
- **Sistema de Alertas**: Feedback visual consistente

### � Patrones Implementados

#### 1. **Separación Semántica**
```javascript
// Estructura organizada por responsabilidad
/components/ui/      // Componentes reutilizables de interfaz
/components/pages/   // Páginas/vistas de la aplicación
/helpers/           // Utilidades y funciones helper
/routes/            // Sistema de rutas modular
/hooks/             // Lógica de estado reutilizable
/services/          // Comunicación con API
/config/            // Configuraciones
/constants/         // Constantes de la aplicación
```

#### 2. **Hooks Personalizados**
```javascript
// useAuth.jsx - Manejo de autenticación
const { user, login, logout, isAdmin } = useAuth();

// useUsers.jsx - Gestión de usuarios
const { users, loading, createUser, deleteUser } = useUsers();
```

#### 3. **Context Provider**
```javascript
// AuthProvider envuelve toda la aplicación
<AuthProvider>
  <AppRoutes />
</AuthProvider>
```

#### 4. **Separación de Responsabilidades**
```javascript
// Helpers para lógica de negocio
import { ProtectedRoute } from '../helpers/routeGuards.jsx';
import { validateEmail, formatDate } from '../helpers/utils.js';

// Componentes UI reutilizables
import { Layout, PageHeader, Alert } from '../components/ui';

// Páginas específicas de la aplicación  
import Dashboard from '../components/pages/Dashboard.jsx';
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 20+
- npm o yarn
- Backend corriendo en http://localhost:3000

### Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev           # http://localhost:5173

# Producción
npm run build
npm run preview

# Linting
npm run lint
```

## 🎨 Sistema de Componentes

### Componentes Base

#### Layout.jsx
```javascript
// Layout base con header y navegación
<Layout title="Título" description="Descripción">
  {children}
</Layout>
```

#### PageHeader.jsx
```javascript
// Header reutilizable para páginas
<PageHeader 
  title="Gestión de Usuarios"
  icon={UserGroupIcon}
  showBackButton={true}
  actions={<button>Nuevo Usuario</button>}
/>
```

#### Loading.jsx
```javascript
// Componentes de carga
<LoadingSpinner size="large" text="Cargando..." />
<LoadingPage text="Iniciando aplicación..." />
```

#### Alert.jsx
```javascript
// Sistema de alertas
<Alert 
  type="success" 
  title="Éxito" 
  message="Usuario creado correctamente"
/>
```

## 🔒 Sistema de Autenticación Avanzado

### Context API
```javascript
// Proveedor global de autenticación
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Métodos: login, logout, register, isAuth, isAdmin
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Protección de Rutas
```javascript
// Rutas protegidas con roles
<ProtectedRoute adminOnly={true}>
  <UserManagement />
</ProtectedRoute>
```

## 🌐 Sistema de Rutas Modular

### Configuración Centralizada
```javascript
// config/navigation.js
export const navigationConfig = {
  mainMenu: [
    {
      title: 'Dashboard',
      icon: HomeIcon,
      href: '/dashboard',
      adminOnly: false
    }
  ]
};
```

### Rutas por Categoría
- **PublicRoutes**: Login, páginas de acceso público
- **ProtectedRoutes**: Dashboard, funcionalidades básicas
- **AdminRoutes**: Gestión usuarios, configuración avanzada
- **SpecialRoutes**: Pruebas, 404, redirects

## 🎯 Ventajas de la Nueva Arquitectura

### ✅ **Mantenibilidad**
- Código organizado por responsabilidad
- Componentes pequeños y enfocados
- Fácil localización de funcionalidades

### ✅ **Escalabilidad**
- Agregar nuevas rutas es simple
- Hooks reutilizables para nueva lógica
- Patrones consistentes

### ✅ **Reutilización**
- Componentes base reutilizables
- Servicios API centralizados
- Configuración modular

### ✅ **Testing**
- Componentes aislados fáciles de testear
- Hooks independientes
- Mocking simplificado

## 📦 Tecnologías y Dependencias

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.3",
    "axios": "^1.12.2",
    "@heroicons/react": "^2.2.0"
  },
  "devDependencies": {
    "vite": "^7.1.7",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.5.6",
    "autoprefixer": "^10.4.21"
  }
}
```

## 🚦 Próximos Pasos

### Funcionalidades Pendientes
- [ ] Sistema de equipos informáticos
- [ ] Dashboard con estadísticas reales
- [ ] Sistema de notificaciones
- [ ] Filtros y búsqueda avanzada
- [ ] Exportación de datos
- [ ] Tema oscuro
- [ ] PWA capabilities

### Mejoras Técnicas
- [ ] Tests unitarios con Jest
- [ ] Storybook para componentes
- [ ] Error boundaries
- [ ] Optimización de bundle
- [ ] Lazy loading de componentes

---

**🏢 FORMOTEX** - Sistema de Gestión de Inventario | Arquitectura Modular y Escalable+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
