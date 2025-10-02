import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../helpers/routeGuards.jsx';
import Register from '../components/pages/Register.jsx';
import UserManagement from '../components/pages/UserManagement.jsx';

// Rutas que requieren permisos de administrador
export const adminRoutes = [
  {
    path: '/register',
    element: <Register />,
    title: 'Registrar Usuario'
  },
  {
    path: '/users',
    element: <UserManagement />,
    title: 'Gestión de Usuarios'
  },

];

// Función para renderizar rutas de admin
export const renderAdminRoutes = () => {
  return adminRoutes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ProtectedRoute adminOnly={true}>
          {route.element}
        </ProtectedRoute>
      }
    />
  ));
};