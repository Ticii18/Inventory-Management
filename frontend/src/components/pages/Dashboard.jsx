import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { 
  ComputerDesktopIcon, 
  ArrowRightOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Solo autenticación: sin menú ni acciones. Dejamos una tarjeta informativa.

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <ComputerDesktopIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FORMOTEX</h1>
                <p className="text-sm text-gray-600">Sistema de Gestión de Inventario</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.nombre}</p>
                  <p className="text-gray-600 capitalize">{user.role}</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido, {user.nombre}
          </h2>
          <p className="text-gray-600">
            {isAdmin() 
              ? 'Panel de administración'
              : 'Panel de usuario'}
          </p>
        </div>

        {/* Mensaje informativo */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-blue-100">
              <ComputerDesktopIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Aplicación lista</h3>
              <p className="text-gray-600 text-sm">
                Solo autenticación habilitada por ahora. Puedes usar el botón "Cerrar Sesión" para salir.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;