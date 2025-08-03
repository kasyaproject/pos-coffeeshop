import Express from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Express.Router();

router.post(
  "/auth/login",
  authController.login
  /**
     * #swagger.tags = ['Auth']
     #swagger.requestBody ={
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
     }
     */
);
router.post(
  "/auth/activation",
  authController.activation
  /*
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        required: true,
        schema: {$ref: '#/components/schemas/ActivationRequest'},
      }
     */
);
router.get(
  "/auth/checkMe",
  authMiddleware,
  authController.checkMe
  /**
      #swagger.tags = ['Auth']
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);

export default router;
