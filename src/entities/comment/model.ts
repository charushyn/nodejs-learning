import { Schema, model } from "mongoose";

interface CommentType {
  text: string;
}

const CommentSchema = new Schema<CommentType>({
  text: { type: String, required: true },
});

const CommentModel = model<CommentType>("Comment", CommentSchema, "comments");

export { CommentType, CommentModel };
