import express from "express";
import {
  createCategory,
  getCategoryById,
  getCategories,
  deleteCategoryById,
  updateCategoryById,
} from "./controller";
import { body, param } from "express-validator";
import { validateRequest } from "../../utils/middleware/validateRequest";

const router = express.Router();

router.get("/", getCategories);
router.post(
  "/",
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("Name should be between 2 a 20 chars"),
  validateRequest,
  createCategory
);
router.get(
  "/:categoryId",
  param("categoryId")
    .isMongoId()
    .withMessage("categoryId should be a MongoDB ObjectId"),
  validateRequest,
  getCategoryById
);
router.delete(
  "/:categoryId",
  param("categoryId")
    .isMongoId()
    .withMessage("categoryId should be a MongoDB ObjectId"),
  validateRequest,
  deleteCategoryById
);
router.put(
  "/:categoryId",
  param("categoryId")
    .isMongoId()
    .withMessage("categoryId should be a MongoDB ObjectId"),
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 2, max: 20 })
    .withMessage("Name should be between 2 a 20 chars"),
  validateRequest,
  updateCategoryById
);

export { router as category_router };
