import { Schema, model } from "mongoose";

interface CategoryType {
  name: string;
}

const CategorySchema = new Schema<CategoryType>({
  name: { type: String, required: true },
});

const CategoryModel = model<CategoryType>(
  "Category",
  CategorySchema,
  "categories"
);

export { CategoryType, CategoryModel };
