import Express from "express";
import orderController from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = Express.Router();

router.post("/order", orderController.create);
router.get(
  "/order",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.findAll
);
router.delete(
  "/order/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.remove
);

router.put(
  "/order/:id/processing",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.processing
);
router.put(
  "/order/:id/completed",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.completed
);
router.put(
  "/order/:id/cancelled",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.cancelled
);

export default router;
