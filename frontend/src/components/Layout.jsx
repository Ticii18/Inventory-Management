import { useAuth } from '../hooks/useAuth.jsx';
import { 
  ComputerDesktopIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

function Layout({ children, title, description }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <ComputerDesktopIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {title || 'FORMOTEX'}
                </h1>
                <p className="text-sm text-gray-600">
                  {description || 'Sistema de Gestión de Inventario'}
                </p>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <UserIcon className="h-5 w-5 text-gray-600 mr-2" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.nombre}</p>
                    <p className="text-gray-600 capitalize">{user.role}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;