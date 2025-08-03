import Express from "express";
import { ROLES } from "../utils/constant";

import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import categoryController from "../controllers/category.controller";

const router = Express.Router();

router.get(
  "/category",
  categoryController.findAll
  /*
  #swagger.tags = ['Category']
  */
);
router.get(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.findOne
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.post(
  "/category",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.create
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CategoryRequest"
    }
  }
  */
);
router.put(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.update
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/CategoryRequest"
    }
  }
  */
);
router.delete(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.delete
  /*
  #swagger.tags = ['Category']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
