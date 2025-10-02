import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { equipmentService } from '../../services/equipmentService.js';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function EquipmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await equipmentService.getById(id);
        const e = data?.data ?? data;
        setItem(e);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || 'Error al cargar equipo');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!item) return <div className="p-6">Equipo no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex items-center mb-4">
            <ComputerDesktopIcon className="h-8 w-8 text-gray-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{item.nombre}</h1>
              <p className="text-sm text-gray-600">{item.marca} {item.modelo}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Número de Serie</p>
              <p className="text-gray-900">{item.numero_serie}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Responsable ID</p>
              <p className="text-gray-900">{item.responsable_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fecha de Registro</p>
              <p className="text-gray-900">{new Date(item.fecha_registro).toLocaleString()}</p>
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button onClick={() => navigate('/equipment')} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Volver</button>
            <button onClick={() => navigate(`/equipment/${id}/edit`)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
