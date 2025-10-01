import { Request, Response } from "express";
import * as userService from "../services/userServices";


export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
};


export const deleteUser = async (req: Request, res: Response) => {
  const user = await userService.deleteUser(Number(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json({ message: "Usuario eliminado" });
};
