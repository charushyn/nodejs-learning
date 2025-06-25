import express from "express";
import {
  createDirector,
  getDirectors,
  getDirectorById,
  updateDirectorById,
  deleteDirectorById,
} from "./controller";
import { body, param } from "express-validator";
import { validateRequest } from "../../utils/middleware/validateRequest";

const router = express.Router();

router.get("/", getDirectors);
router.post(
  "/",
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 chars"),
  validateRequest,
  createDirector
);
router.get(
  "/:directorId",
  param("directorId").isMongoId().withMessage("Invalid MongoDB ObjectId"),
  validateRequest,
  getDirectorById
);
router.delete(
  "/:directorId",
  param("directorId").isMongoId().withMessage("Invalid MongoDB ObjectId"),
  validateRequest,
  deleteDirectorById
);
router.put(
  "/:directorId",
  param("directorId").isMongoId().withMessage("Invalid MongoDB ObjectId"),
  body("name")
    .isString()
    .withMessage("Name should be a string")
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 chars"),
  validateRequest,
  updateDirectorById
);

export { router as director_router };
