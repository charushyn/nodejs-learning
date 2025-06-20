import express from "express";
import {
  createCategory,
  getCategoryById,
  getCategories,
  deleteCategoryById,
  updateCategoryById,
} from "./controller";
import validateBody from "../../utils/middleware/validateBody";

const router = express.Router();

router.get("/", getCategories);
router.post("/", validateBody(["name"]), createCategory);
router.get("/:categoryId", getCategoryById);
router.delete("/:categoryId", deleteCategoryById);
router.put("/:categoryId", validateBody(["name"]), updateCategoryById);

export { router as category_router };
