import { Schema, model, Types } from "mongoose";

const MovieSchema = new Schema({
  title: String,
  year: Number,
  rating: Number,
  category: { type: Types.ObjectId, ref: "Category" },
});

const MovieModel = model("Movie", MovieSchema);

export default MovieModel;
