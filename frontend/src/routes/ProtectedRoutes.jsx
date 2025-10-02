import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../helpers/routeGuards.jsx';
import Dashboard from '../components/pages/Dashboard.jsx';

// Rutas protegidas que requieren autenticación básica
export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    adminOnly: false
  }
];

// Función para renderizar rutas protegidas
export const renderProtectedRoutes = () => {
  return protectedRoutes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <ProtectedRoute adminOnly={route.adminOnly}>
          {route.element}
        </ProtectedRoute>
      }
    />
  ));
};