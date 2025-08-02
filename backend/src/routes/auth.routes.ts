import Express from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/activation", authController.activation);
router.get("/auth/checkMe", authMiddleware, authController.checkMe);

export default router;
