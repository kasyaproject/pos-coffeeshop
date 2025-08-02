import Express from "express";
import reviewController from "../controllers/review.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constant";
import aclMiddleware from "../middlewares/acl.middleware";

const router = Express.Router();

router.post("/review", reviewController.create);
router.get("/review/:MenuId", reviewController.findAll);
router.put(
  "/review/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  reviewController.update
);
router.delete(
  "/review/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  reviewController.delete
);

export default router;
