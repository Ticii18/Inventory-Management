// src/services/authService.ts
import { pool } from "../database.js";
import bcrypt from "bcrypt";
import { signToken, TokenPayload } from "../helpers/jwt.js";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export type UserRow = {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
};

export const authService = {
  async findUserByEmail(email: string): Promise<UserRow | null> {
    const res = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return res.rows[0] ?? null;
  },

  async createUser(nombre: string, email: string, plainPassword: string, rol_id: number) {
    const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    const res = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol_id) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, email, rol_id`,
      [nombre, email, hashed, rol_id]
    );
    return res.rows[0];
  },

  async verifyPassword(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  },

  generateTokenFromUser(user: { id: number; email: string; role: string }) {
    const payload: TokenPayload = { id: user.id, email: user.email, role: user.role };
    return signToken(payload);
  },

  async getRoleNameById(rol_id: number) {
    const res = await pool.query("SELECT nombre FROM roles WHERE id = $1", [rol_id]);
    return res.rows[0]?.nombre ?? null;
  }
};
