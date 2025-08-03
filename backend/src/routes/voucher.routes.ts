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
  /*
  #swagger.tags = ['Voucher']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/VoucherRequest"
    }
  }
  */
);

router.get(
  "/voucher",
  voucherController.findAll
  /*
  #swagger.tags = ['Voucher']
  */
);
router.get(
  "/voucher/:id",
  voucherController.FindOne
  /*
  #swagger.tags = ['Voucher']
  */
);

router.put(
  "/voucher/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  voucherController.update
  /*
  #swagger.tags = ['Voucher']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.delete(
  "/voucher/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  voucherController.delete
  /*
  #swagger.tags = ['Voucher']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
