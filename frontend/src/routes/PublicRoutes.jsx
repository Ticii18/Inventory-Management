import { Route } from 'react-router-dom';
import { PublicRoute } from '../helpers/routeGuards.jsx';
import Login from '../components/pages/Login.jsx';

// Rutas públicas (no requieren autenticación)
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
    title: 'Iniciar Sesión'
  }
];

// Función para renderizar rutas públicas
export const renderPublicRoutes = () => {
  return publicRoutes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <PublicRoute>
          {route.element}
        </PublicRoute>
      }
    />
  ));
};