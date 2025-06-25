import express from "express";
import {
  createMovie,
  deleteMovieById,
  getMovieById,
  getMovies,
  updateMovieById,
} from "./controller";
import { body, param } from "express-validator";
import { validateRequest } from "../../utils/middleware/validateRequest";

const router = express.Router();

router.get("/", getMovies);
router.post(
  "/",
  body("title")
    .isString()
    .withMessage("Title should be a string")
    .isLength({ min: 2 })
    .withMessage("Title should be at least 2 chars"),
  body("year")
    .custom((v) => Number.isInteger(v) && v > 0)
    .withMessage("Year should be a number")
    .isLength({ min: 1, max: 4 })
    .withMessage("We are at X/XX/XXX/XXXX format!"),
  body("rating")
    .custom((v) => Number.isFinite(v) && v >= 1 && v <= 5)
    .withMessage("Rating should be a number and be between 1 a 5")
    .isLength({ min: 1, max: 1 })
    .withMessage("Rating should be and be between 1 a 5 "),
  body("directorId")
    .isString()
    .withMessage("Director should be a string")
    .isMongoId()
    .withMessage("Director should be a MongoDB ObjectId"),
  validateRequest,
  createMovie
);
router.get(
  "/:movieId",
  param("movieId").isMongoId().withMessage("Invalid MongoDB ObjectId"),
  validateRequest,
  getMovieById
);
router.delete(
  "/:movieId",
  param("movieId").isMongoId().withMessage("Invalid MongoDB ObjectId"),
  validateRequest,
  deleteMovieById
);
router.put(
  "/:movieId",
  param("movieId").isMongoId().withMessage("Invalid MongoDB ObjectId"),
  body("title")
    .isString()
    .withMessage("Title should be a string")
    .isLength({ min: 2 })
    .withMessage("Title should be at least 2 chars"),
  body("year")
    .custom((v) => Number.isInteger(v) && v > 0)
    .withMessage("Year should be a number")
    .isLength({ min: 1, max: 4 })
    .withMessage("We are at X/XX/XXX/XXXX format!"),
  body("rating")
    .custom((v) => Number.isFinite(v) && v >= 1 && v <= 5)
    .withMessage("Rating should be a number and be between 1 a 5")
    .isLength({ min: 1, max: 1 })
    .withMessage("Rating should be and be between 1 a 5 "),
  body("directorId")
    .isString()
    .withMessage("Director should be a string")
    .isMongoId()
    .withMessage("Director should be a MongoDB ObjectId"),
  validateRequest,
  updateMovieById
);

export { router as movie_router };
