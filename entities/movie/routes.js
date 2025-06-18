import express from "express";
import { getMovies } from "./controller.js";

const router = express.Router();

router.get("/", getMovies);

export { router as movie_router };
