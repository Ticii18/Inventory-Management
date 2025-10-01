import { Router } from "express";
import { login, register } from "../controllers/authControllers.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
// register restringido a admin
router.post("/register", authenticate, authorize("admin"), register);

export default router;
