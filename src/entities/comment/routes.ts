import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} from "./controller";
import { body, param } from "express-validator";
import { validateRequest } from "../../utils/middleware/validateRequest";

const router = express.Router();

router.get("/", getComments);
router.post(
  "/",
  body("text")
    .isString()
    .withMessage("Text should be a string")
    .isLength({ min: 2, max: 500 })
    .withMessage("Text should be between 2 a 500 chars"),
  validateRequest,
  createComment
);
router.get(
  "/:commentId",
  param("commentId")
    .isMongoId()
    .withMessage("commentId should be a MongoDB ObjectId"),
  validateRequest,
  getCommentById
);
router.delete(
  "/:commentId",
  param("commentId")
    .isMongoId()
    .withMessage("commentId should be a MongoDB ObjectId"),
  validateRequest,
  deleteCommentById
);
router.put(
  "/:commentId",
  param("commentId")
    .isMongoId()
    .withMessage("commentId should be a MongoDB ObjectId"),
  validateRequest,
  updateCommentById
);

export { router as comment_router };
