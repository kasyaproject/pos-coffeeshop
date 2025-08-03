import Express from "express";
import reviewController from "../controllers/review.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constant";
import aclMiddleware from "../middlewares/acl.middleware";

const router = Express.Router();

router.post(
  "/review",
  reviewController.create
  /*
  #swagger.tags = ['Review']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  #swagger.requestBody = {
    required: true,
    schema: {
      $ref: "#/components/schemas/ReviewRequest"
    }
  }
  */
);
router.get(
  "/review/:MenuId",
  reviewController.findAll
  /*
  #swagger.tags = ['Review']
  */
);
router.put(
  "/review/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  reviewController.update
  /*
  #swagger.tags = ['Review']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);
router.delete(
  "/review/:id",
  [authMiddleware, aclMiddleware([ROLES.ADMIN])],
  reviewController.delete
  /*
  #swagger.tags = ['Review']
  #swagger.security = [{
    "bearerAuth": {}
  }]
  */
);

export default router;
