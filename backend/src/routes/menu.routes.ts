import Express from "express";

import menuController from "../controllers/menu.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = Express.Router();

router.post(
  "/menu",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  menuController.create
  /*
  #swagger.tags = ['Menu']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/MenuRequest"
    }
  }
  */
);

router.get(
  "/menu",
  menuController.findAll
  /*
  #swagger.tags = ['Menu']
  */
);

router.get(
  "/menu/:id",
  menuController.findOne
  /*
  #swagger.tags = ['Menu']
  */
);

router.get(
  "/menu/:categoryId/category",
  menuController.findByCategory
  /*
  #swagger.tags = ['Menu']
  */
);

router.put(
  "/menu/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  menuController.update
  /*
  #swagger.tags = ['Menu']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/MenuRequest"
    }
  }
  */
);
router.delete(
  "/menu/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  menuController.delete
  /*
  #swagger.tags = ['Menu']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
