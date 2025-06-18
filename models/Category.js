import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: String,
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
