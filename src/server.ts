import "dotenv/config";

import mongoose from "mongoose";
import cors from "cors";

import { movie_router } from "./entities/movie/routes";

import express from "express";
import { category_router } from "./entities/category/routes";
import { comment_router } from "./entities/comment/routes";
import { director_router } from "./entities/director/routes";
import { errorHandler } from "./utils/middleware/error";

mongoose.connect(process.env.DB_URL || "");

const app = express();
const port = 3000;

const allowedOrigins = ["*"];
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/movies", movie_router);
app.use("/categories", category_router);
app.use("/comments", comment_router);
app.use("/directors", director_router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
