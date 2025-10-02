import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { userService } from '../../services/userService.js';
import { equipmentService } from '../../services/equipmentService.js';
import { 
  UserGroupIcon, 
  ComputerDesktopIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  UserIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEquipment: 0,
    assignedToMe: 0,
    pendingTasks: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated()) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const users = await userService.getUsers();
        const equip = await equipmentService.getAll();
        const mine = await equipmentService.getMine();

        setStats({
          totalUsers: users?.length ?? 0,
          totalEquipment: equip?.length ?? 0,
          assignedToMe: mine?.length ?? 0,
          pendingTasks: 0,
        });
      } catch (_err) {
        // si algo falla, dejamos los valores actuales sin romper la UI
      }
    };
    load();
  }, [navigate, isAuthenticated]);

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

  const menuItems = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar usuarios del sistema',
      icon: UserGroupIcon,
      href: '/users',
      color: 'bg-blue-500',
      adminOnly: true
    },
    {
      title: 'Equipos Informáticos',
      description: 'Gestionar inventario de equipos',
      icon: ComputerDesktopIcon,
      href: '/equipment',
      color: 'bg-green-500',
      adminOnly: false
    },
    {
      title: 'Registrar Usuario',
      description: 'Agregar nuevo usuario al sistema',
      icon: PlusIcon,
      href: '/register',
      color: 'bg-purple-500',
      adminOnly: true
    },
    {
      title: 'Configuración',
      description: 'Configurar parámetros del sistema',
      icon: Cog6ToothIcon,
      href: '/settings',
      color: 'bg-orange-500',
      adminOnly: true
    }
  ];

  const visibleMenuItems = menuItems.filter(item => 
    !item.adminOnly || isAdmin()
  );

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
              ? 'Panel de administración - Tienes acceso completo al sistema'
              : 'Panel de usuario - Gestiona los equipos asignados a ti'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-gray-600 text-sm">Total Usuarios</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <ComputerDesktopIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
                <p className="text-gray-600 text-sm">Total Equipos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <UserIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.assignedToMe}</p>
                <p className="text-gray-600 text-sm">Asignados a Mí</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <Cog6ToothIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
                <p className="text-gray-600 text-sm">Tareas Pendientes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.href)}
                className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all duration-200 transform hover:scale-105 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full ${item.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {item.adminOnly && (
                    <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        {!isAdmin() && (
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Acciones Rápidas</h3>
            <p className="text-blue-100 mb-4">
              Como usuario regular, puedes gestionar los equipos que te han sido asignados.
            </p>
            <button
              onClick={() => navigate('/equipment')}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Ver Mis Equipos
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;