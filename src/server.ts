import "dotenv/config";

import mongoose from "mongoose";
import cors from "cors";

import { movie_router } from "./entities/movie/routes";

import express from "express";

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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
