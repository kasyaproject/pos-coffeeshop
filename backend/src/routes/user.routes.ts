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
);
router.get(
  "/user/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.findOne
);
router.post(
  "/user",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.create
);
router.put(
  "/user/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.update
);
router.delete(
  "/user/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  userController.delete
);

export default router;
