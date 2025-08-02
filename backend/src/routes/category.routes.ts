import Express from "express";
import { ROLES } from "../utils/constant";

import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import categoryController from "../controllers/category.controller";

const router = Express.Router();

router.get(
  "/category",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  categoryController.findAll
);
router.get(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.findOne
);
router.post(
  "/category",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.create
);
router.put(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.update
);
router.delete(
  "/category/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  categoryController.delete
);

export default router;
