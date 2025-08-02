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
);
router.get(
  "/menu",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  menuController.findAll
);
router.get(
  "/menu/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  menuController.findOne
);
router.put(
  "/menu/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  menuController.update
);
router.delete(
  "/menu/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  menuController.delete
);

export default router;
