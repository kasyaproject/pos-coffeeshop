import Express from "express";
import orderController from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = Express.Router();

router.post(
  "/order",
  orderController.create
  /*
  #swagger.tags = ['Order']
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/OrderRequest"
    }
  }
  */
);
router.get(
  "/order",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.findAll
  /*
  #swagger.tags = ['Order']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.delete(
  "/order/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.remove
  /*
  #swagger.tags = ['Order']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

router.put(
  "/order/:id/processing",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.processing
  /*
  #swagger.tags = ['Order']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.put(
  "/order/:id/completed",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.completed
  /*
  #swagger.tags = ['Order']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.put(
  "/order/:id/cancelled",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  orderController.cancelled
  /*
  #swagger.tags = ['Order']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
