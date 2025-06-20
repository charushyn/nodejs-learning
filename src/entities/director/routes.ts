import express from "express";
import {
  createDirector,
  getDirectors,
  getDirectorById,
  updateDirectorById,
  deleteDirectorById,
} from "./controller";
import validateBody from "../../utils/middleware/validateBody";

const router = express.Router();

router.get("/", getDirectors);
router.post("/", validateBody(["name"]), createDirector);
router.get("/:directorId", getDirectorById);
router.delete("/:directorId", deleteDirectorById);
router.put("/:directorId", validateBody(["name"]), updateDirectorById);

export { router as director_router };
