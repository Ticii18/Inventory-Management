import { Route } from 'react-router-dom';
import { ProtectedRoute } from '../helpers/routeGuards.jsx';
import Dashboard from '../components/pages/Dashboard.jsx';
import Equipment from '../components/pages/Equipment.jsx';
import EquipmentDetail from '../components/pages/EquipmentDetail.jsx';
import EquipmentCreate from '../components/pages/EquipmentCreate.jsx';
import EquipmentEdit from '../components/pages/EquipmentEdit.jsx';

// Rutas protegidas que requieren autenticación básica
export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
    adminOnly: false
  },
  {
    path: '/equipment',
    element: <Equipment />,
    adminOnly: false
  },
  {
    path: '/equipment/new',
    element: <EquipmentCreate />,
    adminOnly: true
  },
  {
    path: '/equipment/:id',
    element: <EquipmentDetail />,
    adminOnly: false
  },
  {
    path: '/equipment/:id/edit',
    element: <EquipmentEdit />,
    adminOnly: true
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