import { query } from "../database";
import { Equipment, CreateEquipmentRequest, UpdateEquipmentRequest } from "../models/User";

// Crear equipo
export const createEquip = async (data: CreateEquipmentRequest) => {
  try {
    const result = await query(
      `INSERT INTO equipos (nombre, marca, modelo, numero_serie, responsable_id, fecha_registro)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id_usuario, nombre, marca, modelo, numero_serie, responsable_id, fecha_registro`,
      [
        data.nombre,
        data.marca,
        data.modelo,
        data.numero_serie,
        data.responsable_id,
      ]
    );

    return result.rows[0] as Equipment;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Obtener todos los equipos
export const getEquip = async () => {
  const result = await query(
    `SELECT id_usuario, nombre, marca, modelo, numero_serie, responsable_id, fecha_registro
     FROM equipos
     ORDER BY fecha_registro DESC`
  );
  return result.rows as Equipment[];
};

// Obtener equipo por ID
export const getEquipById = async (id: number) => {
  const result = await query(
    `SELECT id_usuario, nombre, marca, modelo, numero_serie, responsable_id, fecha_registro
     FROM equipos
     WHERE id_usuario = $1`,
    [id]
  );
  return (result.rows[0] as Equipment) || null;
};

// Actualizar equipo (parcial)
export const updateEquip = async (id: number, data: UpdateEquipmentRequest) => {
  const fields: string[] = [];
  const values: any[] = [];
  let i = 1;

  if (data.nombre !== undefined) {
    fields.push(`nombre = $${i++}`);
    values.push(data.nombre);
  }
  if (data.marca !== undefined) {
    fields.push(`marca = $${i++}`);
    values.push(data.marca);
  }
  if (data.modelo !== undefined) {
    fields.push(`modelo = $${i++}`);
    values.push(data.modelo);
  }
  if (data.responsable_id !== undefined) {
    fields.push(`responsable_id = $${i++}`);
    values.push(data.responsable_id);
  }

  if (fields.length === 0) {
    return await getEquipById(id);
  }

  values.push(id);
  const result = await query(
    `UPDATE equipos
     SET ${fields.join(", ")}
     WHERE id_usuario = $${i}
     RETURNING id_usuario, nombre, marca, modelo, numero_serie, responsable_id, fecha_registro`,
    values
  );

  return (result.rows[0] as Equipment) || null;
};

// Eliminar equipo
export const deleteEquip = async (id: number) => {
  const result = await query(
    "DELETE FROM equipos WHERE id_usuario = $1 RETURNING id_usuario",
    [id]
  );
  return result.rows[0]; // mismo patrón que deleteUser
};

// Equipos por responsable
export const getEquipByResponsable = async (responsableId: number) => {
  const result = await query(
    `SELECT id_usuario, nombre, marca, modelo, numero_serie, responsable_id, fecha_registro
     FROM equipos
     WHERE responsable_id = $1
     ORDER BY fecha_registro DESC`,
    [responsableId]
  );
  return result.rows as Equipment[];
};
