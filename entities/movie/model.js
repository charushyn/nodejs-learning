import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
