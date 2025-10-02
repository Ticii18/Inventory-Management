import { Request, Response } from "express";
import * as equipService from '../services/equipmentService'

export const createEquip = async (req: Request, res: Response) => {
  try {
    const equip = await equipService.createEquip(req.body);
    res.status(201).json(equip);
  } catch (err) {
    res.status(500).json({ error: "Error al crear el equipo" });
  }
};

export const getEquip = async (_req: Request, res: Response) => {
  const users = await equipService.getEquip();
  res.json(users);
};

export const getEquipById = async (req: Request, res: Response) => {
  const equip = await equipService.getEquipById(Number(req.params.id));
  if (!equip) return res.status(404).json({ error: "Equipo no encontrado" });
  res.json(equip);
};



export const deleteEquip = async (req: Request, res: Response) => {
  const equip = await equipService.deleteEquip(Number(req.params.id));
  if (!equip) return res.status(404).json({ error: "Equipo no encontrado" });
  res.json({ message: "Equipo eliminado" });
};
