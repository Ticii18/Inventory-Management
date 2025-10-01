// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });

    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ message: "Token mal formado" });

    const token = parts[1];
    if (!token) return res.status(401).json({ message: "Token no encontrado" });
    
    try {
      const payload = verifyToken(token);
      req.user = { id: payload.id, email: payload.email, role: payload.role };
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error en autenticación" });
  }
};

export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permiso denegado" });
    }
    return next();
  };
