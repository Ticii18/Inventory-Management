import { Router } from "express";
import * as userController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
