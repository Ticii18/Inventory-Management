// src/controllers/authController.ts
import { Request, Response } from "express";
import { authService } from "../services/authService.js";
import { pool } from "../database.js";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email y password requeridos" });

    const user = await authService.findUserByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const ok = await authService.verifyPassword(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    // obtener nombre rol
    const roleRow = await pool.query("SELECT nombre FROM roles WHERE id = $1", [
      user.rol_id,
    ]);
    const role = roleRow.rows[0]?.nombre ?? "user";

    const token = authService.generateTokenFromUser({
      id: user.id,
      email: user.email,
      role,
    });

    return res.json({
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email, role },
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nombre, email, password, rol_id } = req.body;
    if (!nombre || !email || !password || !rol_id)
      return res.status(400).json({ message: "Faltan datos" });

    const exists = await authService.findUserByEmail(email);
    if (exists) return res.status(409).json({ message: "Email ya registrado" });

    const newUser = await authService.createUser(
      nombre,
      email,
      password,
      rol_id
    );
    return res.status(201).json({ message: "Usuario creado", user: newUser });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
