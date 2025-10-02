import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { equipmentService } from '../../services/equipmentService.js';
import { userService } from '../../services/userService.js';

export default function EquipmentForm({ mode = 'create', initialData }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    marca: '',
    modelo: '',
    numero_serie: '',
    responsable_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre: initialData.nombre || '',
        marca: initialData.marca || '',
        modelo: initialData.modelo || '',
        numero_serie: initialData.numero_serie || '',
        responsable_id: initialData.responsable_id ? String(initialData.responsable_id) : ''
      });
    }
  }, [initialData]);

  // Cargar usuarios para el select de responsable
  useEffect(() => {
    let mounted = true;
    const loadUsers = async () => {
      try {
        setUsersLoading(true);
        setUsersError('');
        const res = await userService.getUsers();
        const list = Array.isArray(res) ? res : res?.data || [];
        if (!mounted) return;
        setUsers(list);
      } catch (e) {
        if (!mounted) return;
        setUsersError(e?.message || 'No se pudieron cargar los usuarios');
      } finally {
        if (mounted) setUsersLoading(false);
      }
    };
    loadUsers();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const payload = {
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      numero_serie: form.numero_serie.trim(),
      responsable_id: Number(form.responsable_id),
    };

    try {
      if (mode === 'create') {
        await equipmentService.create(payload);
        setSuccess('Equipo creado correctamente');
        navigate('/equipment');
      } else if (mode === 'edit' && initialData?.id) {
        await equipmentService.update(initialData.id, payload);
        setSuccess('Equipo actualizado correctamente');
        navigate(`/equipment/${initialData.id}`);
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Error al guardar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {mode === 'create' ? 'Nuevo Equipo' : 'Editar Equipo'}
          </h1>
          <p className="text-sm text-gray-600 mb-6">Completa los datos del equipo</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3">{error}</div>
          )}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3">{success}</div>
          )}
          {usersError && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg p-3">
              {usersError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Laptop Dell"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={form.marca}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Dell, HP, Lenovo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={form.modelo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Latitude 5520"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Serie</label>
                <input
                  type="text"
                  name="numero_serie"
                  value={form.numero_serie}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: DL5520-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
                <select
                  name="responsable_id"
                  value={form.responsable_id}
                  onChange={handleChange}
                  required
                  disabled={usersLoading}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="">
                    {usersLoading ? 'Cargando usuarios...' : 'Selecciona un responsable'}
                  </option>
                  {users.map((u) => (
                    <option key={u.id_usuario ?? u.id} value={String(u.id_usuario ?? u.id)}>
                      {u.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/equipment')}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Guardando...' : (mode === 'create' ? 'Crear' : 'Guardar cambios')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
