import { useState, useEffect } from 'react';
import { userService } from '../services/userService.js';

// Hook personalizado para manejo de usuarios
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers();
      setUsers(Array.isArray(response) ? response : response.users || []);
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.createUser(userData);
      await loadUsers(); // Recargar lista después de crear
      return response;
    } catch (err) {
      setError(err.message || 'Error al crear usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteUser(userId);
      await loadUsers(); // Recargar lista después de eliminar
    } catch (err) {
      setError(err.message || 'Error al eliminar usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUserById(userId);
      return response;
    } catch (err) {
      setError(err.message || 'Error al obtener usuario');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    deleteUser,
    getUserById,
    setError
  };
};