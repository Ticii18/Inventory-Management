import { query } from "../database";
import bcrypt from "bcrypt";
import { User } from "../models/User";

const saltRounds = 10;

export const createUser = async (user: User) => {
  try {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  const nombre = user.nombre.toLocaleLowerCase()
  const email = user.email.toLocaleLowerCase()
  const result = await query(
    `INSERT INTO usuarios (nombre, email, password, rol_id, creado_en) 
     VALUES ($1, $2, $3, $4, NOW()) 
     RETURNING id_usuario, nombre, email, rol_id, creado_en`,
    [nombre, email, hashedPassword, user.rol_id]
  );

  return result.rows[0];
  } catch (error) {
    console.log(error)
  }
};

export const getUsers = async () => {
  const result = await query("SELECT * FROM usuarios");
  return result.rows;
};

export const getUserById = async (id: number) => {
  const result = await query("SELECT * FROM usuarios WHERE id_usuario = $1", [id]);
  return result.rows[0];
};


export const deleteUser = async (id: number) => {
  const result = await query("DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario", [id]);
  return result.rows[0];
};
