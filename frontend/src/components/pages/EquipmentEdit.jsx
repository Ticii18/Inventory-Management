import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { equipmentService } from '../../services/equipmentService.js';
import EquipmentForm from './EquipmentForm.jsx';

export default function EquipmentEdit() {
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
        setItem(data?.data ?? data);
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

  return <EquipmentForm mode="edit" initialData={{ ...item, id: item.id_usuario ?? id }} />;
}
