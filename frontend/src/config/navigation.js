import { HomeIcon } from '@heroicons/react/24/outline';

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
    }
  ],

  // Breadcrumbs para navegación
  breadcrumbs: {
    '/dashboard': [{ title: 'Dashboard', href: '/dashboard' }],
    // Sin otras secciones por ahora
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