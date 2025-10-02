import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import equipmentService from '../../services/equipmentService.js';
import { 
  ComputerDesktopIcon, 
  ArrowLeftIcon,
  PlusIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

function Equipment() {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const canCreate = useMemo(() => isAdmin(), [isAdmin]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = canCreate
        ? await equipmentService.getAll()
        : await equipmentService.getMine();
      // Normalizar campos a los usados en UI
      const normalized = (Array.isArray(data) ? data : data?.data || []).map((e) => ({
        id: e.id_usuario ?? e.id ?? e.id_equipo ?? Math.random(),
        name: e.nombre,
        type: e.marca && e.modelo ? `${e.marca} ${e.modelo}` : e.marca || 'Equipo',
        serialNumber: e.numero_serie,
        status: e.estado || 'Activo',
        assignedTo: e.responsable_nombre || e.responsable_id || '—',
      }));
      setItems(normalized);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Error al cargar equipos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [canCreate]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <ComputerDesktopIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Equipos Informáticos</h1>
                <p className="text-sm text-gray-600">Gestión del inventario de equipos</p>
              </div>
            </div>
            
            {canCreate && (
              <button
                onClick={() => navigate('/equipment/new')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Nuevo Equipo
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Notice */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700 flex items-center">
            <WrenchScrewdriverIcon className="h-5 w-5 text-blue-600 mr-2" />
            Cargando equipos...
          </div>
        )}

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((equipment) => (
            <div key={equipment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ComputerDesktopIcon className="h-8 w-8 text-gray-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{equipment.name}</h3>
                    <p className="text-sm text-gray-600">{equipment.type}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Número de Serie</p>
                  <p className="text-sm text-gray-900">{equipment.serialNumber}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Asignado a</p>
                  <p className="text-sm text-gray-900">
                    {equipment.assignedTo || 'No asignado'}
                  </p>
                </div>

              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => navigate(`/equipment/${equipment.id}`)}
                  className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Detalles
                </button>
                {canCreate && (
                  <button 
                    onClick={() => navigate(`/equipment/${equipment.id}/edit`)}
                    className="flex-1 bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Alternative */}
        {!loading && items.length === 0 && (
          <div className="text-center py-12">
            <ComputerDesktopIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay equipos registrados</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza agregando un nuevo equipo al inventario.
            </p>
            <div className="mt-6">
              {canCreate && (
                <button
                  onClick={() => navigate('/equipment/new')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Agregar Equipo
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen de Inventario</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{items.length}</p>
              <p className="text-sm text-gray-600">Total Equipos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">1</p>
              <p className="text-sm text-gray-600">Disponibles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">2</p>
              <p className="text-sm text-gray-600">Asignados</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Equipment;