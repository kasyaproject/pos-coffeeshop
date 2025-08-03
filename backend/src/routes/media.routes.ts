import Express from "express";

import mediaController from "../controllers/media.controller";
import authMiddleware from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";
import mediaMiddleware from "../middlewares/media.middleware";

const router = Express.Router();

router.post(
  "/media/single",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.single("file"),
  ],
  mediaController.single
  /*
      #swagger.tags = ['Media']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema:{
              type: "object",
              properties: {
                file:{
                  type: "string",
                  format: "binary"
                }
              }
            }
          }
        }
      }
    */
);

router.post(
  "/media/multiple",
  [
    authMiddleware,
    aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]),
    mediaMiddleware.multiple("file"),
  ],
  mediaController.multiple
  /*
      #swagger.tags = ['Media']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        content: {
          "multipart/form-data": {
            schema:{
              type: "object",
              properties: {
                files:{
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary"
                  }
                }
              }
            }
          }
        }
      }
    */
);

router.delete(
  "/media/remove",
  [authMiddleware, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
  mediaController.remove
  /*
      #swagger.tags = ['Media']
      #swagger.security = [{
        "bearerAuth": {}
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/RemoveMediaRequest"
        }       
      }
    */
);
export default router;
