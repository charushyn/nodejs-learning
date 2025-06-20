import { Schema, model, Types } from "mongoose";

interface MovieType {
  title: string;
  year: number;
  rating: number;
  director: Types.ObjectId;
}

const MovieSchema = new Schema<MovieType>({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
  director: { type: Schema.Types.ObjectId, ref: "Director", required: true },
});

const MovieModel = model<MovieType>("Movie", MovieSchema, "movies");

export { MovieType, MovieModel };
