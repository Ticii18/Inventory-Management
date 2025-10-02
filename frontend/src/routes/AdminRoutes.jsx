import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../helpers/routeGuards.jsx';

// Rutas que requieren permisos de administrador
export const adminRoutes = [];

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