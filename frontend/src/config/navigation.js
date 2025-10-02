import { 
  UserGroupIcon, 
  ComputerDesktopIcon, 
  Cog6ToothIcon,
  PlusIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

// Configuración de navegación principal
export const navigationConfig = {
  // Elementos del menú principal para usuarios autenticados
  mainMenu: [
    {
      title: 'Dashboard',
      description: 'Panel principal del sistema',
      icon: HomeIcon,
      href: '/dashboard',
      color: 'bg-blue-500',
      adminOnly: false,
      userOnly: false
    },
    {
      title: 'Equipos Informáticos',
      description: 'Gestionar inventario de equipos',
      icon: ComputerDesktopIcon,
      href: '/equipment',
      color: 'bg-green-500',
      adminOnly: false,
      userOnly: false
    },
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar usuarios del sistema',
      icon: UserGroupIcon,
      href: '/users',
      color: 'bg-blue-500',
      adminOnly: true,
      userOnly: false
    },
    {
      title: 'Registrar Usuario',
      description: 'Agregar nuevo usuario al sistema',
      icon: PlusIcon,
      href: '/register',
      color: 'bg-purple-500',
      adminOnly: true,
      userOnly: false
    },
    {
      title: 'Configuración',
      description: 'Configurar parámetros del sistema',
      icon: Cog6ToothIcon,
      href: '/settings',
      color: 'bg-orange-500',
      adminOnly: true,
      userOnly: false
    }
  ],

  // Breadcrumbs para navegación
  breadcrumbs: {
    '/dashboard': [{ title: 'Dashboard', href: '/dashboard' }],
    '/users': [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Usuarios', href: '/users' }
    ],
    '/register': [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Usuarios', href: '/users' },
      { title: 'Registrar', href: '/register' }
    ],
    '/equipment': [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Equipos', href: '/equipment' }
    ],
  }
};

// Función para filtrar elementos de menú según el rol del usuario
export const getMenuItemsForUser = (isAdmin) => {
  return navigationConfig.mainMenu.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    if (item.userOnly && isAdmin) return false;
    return true;
  });
};

// Función para obtener breadcrumbs de una ruta
export const getBreadcrumbs = (pathname) => {
  return navigationConfig.breadcrumbs[pathname] || [
    { title: 'Dashboard', href: '/dashboard' }
  ];
};