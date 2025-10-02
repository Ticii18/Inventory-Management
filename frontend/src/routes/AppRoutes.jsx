import { Routes } from 'react-router-dom';
import { renderPublicRoutes } from './PublicRoutes.jsx';
import { renderProtectedRoutes } from './ProtectedRoutes.jsx';
import { renderAdminRoutes } from './AdminRoutes.jsx';
import { renderSystemRoutes } from './SpecialRoutes.jsx';

// Componente central que maneja todas las rutas
function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      {renderPublicRoutes()}

      {/* Rutas protegidas básicas */}
      {renderProtectedRoutes()}

      {/* Rutas de administrador */}
      {renderAdminRoutes()}

      {/* Rutas del sistema (redirect, 404) */}
      {renderSystemRoutes()}
    </Routes>
  );
}

export default AppRoutes;