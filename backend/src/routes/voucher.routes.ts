import Express from "express";
import voucherController from "../controllers/voucher.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = Express.Router();

router.post(
  "/voucher",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  voucherController.create
);

router.get("/voucher", voucherController.findAll);
router.get("/voucher/:id", voucherController.FindOne);

router.put(
  "/voucher/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  voucherController.update
);
router.delete(
  "/voucher/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  voucherController.delete
);

export default router;
