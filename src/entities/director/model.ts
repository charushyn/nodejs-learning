import { Schema, model } from "mongoose";

interface DirectorType {
  name: string;
}

const DirectorSchema = new Schema<DirectorType>({
  name: { type: String, required: true },
});

const DirectorModel = model<DirectorType>(
  "Director",
  DirectorSchema,
  "directors"
);

export { DirectorType, DirectorModel };
