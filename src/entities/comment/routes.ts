import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} from "./controller";
import validateBody from "../../utils/middleware/validateBody";

const router = express.Router();

router.get("/", getComments);
router.post("/", validateBody(["text"]), createComment);
router.get("/:commentId", getCommentById);
router.delete("/:commentId", deleteCommentById);
router.put("/:commentId", validateBody(["text"]), updateCommentById);

export { router as comment_router };
