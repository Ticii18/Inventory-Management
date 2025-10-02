// Constantes de la aplicación
export const APP_CONFIG = {
  name: 'FORMOTEX',
  description: 'Sistema de Gestión de Inventario',
  version: '1.0.0',
  apiBaseUrl: 'http://localhost:3000',
  defaultRoute: '/dashboard'
};

// Constantes de roles
export const ROLES = {
  ADMIN: 1,
  USER: 2
};

export const ROLE_NAMES = {
  [ROLES.ADMIN]: 'Administrador',
  [ROLES.USER]: 'Usuario'
};

// Constantes de rutas
export const ROUTES = {
  // Públicas
  LOGIN: '/login',
  
  // Protegidas
  DASHBOARD: '/dashboard',
  EQUIPMENT: '/equipment',
  
  // Admin
  USERS: '/users',
  REGISTER: '/register',
  SETTINGS: '/settings',
  
  // Especiales
  TEST: '/test',
  NOT_FOUND: '*'
};

// Constantes de estados
export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Constantes de tipos de alerta
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Constantes de storage
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Constantes de validación
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255
};

// Constantes de UI
export const UI = {
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  LOADING_DELAY: 500
};