import { Router } from "express";
import * as equipController from '../controllers/equipmentControllers';

const equipRouter = Router();

equipRouter.post("/", equipController.createEquip);
equipRouter.get("/", equipController.getEquip);
equipRouter.get("/:id", equipController.getEquipById);
equipRouter.delete("/:id", equipController.deleteEquip);

export default equipRouter;
