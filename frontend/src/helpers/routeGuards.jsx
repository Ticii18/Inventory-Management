import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { LoadingPage } from '../components/Loading.jsx';

// Helper para proteger rutas que requieren autenticación
export function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingPage text="Verificando autenticación..." />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Helper para rutas públicas (redirige si ya está autenticado)
export function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingPage text="Cargando aplicación..." />;
  }

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Helper para verificar permisos sin redirección
export function requireAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated();
}

// Helper para verificar si es admin sin redirección  
export function requireAdmin() {
  const { isAdmin } = useAuth();
  return isAdmin();
}