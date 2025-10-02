import api from './api.js';

// Endpoints esperados en backend:
// - GET    /api/equipments              (admin)
// - GET    /api/equipments/my-equipments (usuario autenticado)
// - GET    /api/equipments/:id          (admin)
// - POST   /api/equipments              (admin)
// - PUT    /api/equipments/:id          (admin)
// - DELETE /api/equipments/:id          (admin)

export const equipmentService = {
  // Backend actual montado en /api/equip
  getAll: async () => {
    const res = await api.get('/api/equip');
    return res.data?.data ?? res.data; // soporta ambos formatos
  },

  // No hay endpoint específico en backend, así que filtramos en cliente
  getMine: async () => {
    const all = await equipmentService.getAll();
    const list = Array.isArray(all) ? all : all?.data || [];
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user?.id) return list;
      return list.filter((e) => Number(e.responsable_id) === Number(user.id));
    } catch {
      return list;
    }
  },

  getById: async (id) => {
    const res = await api.get(`/api/equip/${id}`);
    return res.data?.data ?? res.data;
  },

  create: async (payload) => {
    const res = await api.post('/api/equip', payload);
    return res.data?.data ?? res.data;
  },

  update: async (id, payload) => {
    const res = await api.put(`/api/equip/${id}`, payload);
    return res.data?.data ?? res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/api/equip/${id}`);
    return res.data?.data ?? res.data;
  },
};

export default equipmentService;
