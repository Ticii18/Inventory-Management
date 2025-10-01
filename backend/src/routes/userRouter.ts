import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", addUser);

export default userRouter;
