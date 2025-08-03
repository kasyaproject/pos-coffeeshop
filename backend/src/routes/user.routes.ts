import Express from "express";
import { ROLES } from "../utils/constant";

import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";

const router = Express.Router();

router.get(
  "/user",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.findAll
  /*
  #swagger.tags = ['User']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.get(
  "/user/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.findOne
  /*
  #swagger.tags = ['User']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.post(
  "/user",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.create
  /*
  #swagger.tags = ['User']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/UserRequest"
    }
  }
  */
);
router.put(
  "/user/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.update
  /*
  #swagger.tags = ['User']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.delete(
  "/user/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.delete
  /*
  #swagger.tags = ['User']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
