import express from "express";
import {
  createMovie,
  deleteMovieById,
  getMovieById,
  getMovies,
  updateMovieById,
} from "./controller";
import validateBody from "../../utils/middleware/validateBody";

const router = express.Router();

router.get("/", getMovies);
router.post(
  "/",
  validateBody(["title", "year", "rating", "director"]),
  createMovie
);
router.get("/:movieId", getMovieById);
router.delete("/:movieId", deleteMovieById);
router.put(
  "/:movieId",
  validateBody(["title", "year", "rating", "director"]),
  updateMovieById
);

export { router as movie_router };
