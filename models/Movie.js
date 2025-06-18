import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: { type: ObjectId, ref: "Category" },
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
