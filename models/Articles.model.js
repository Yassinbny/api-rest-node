import { Schema, model } from "mongoose";

const ArticleSchema = Schema({
  title: { type: String, required: true, minlength: 5 },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: {
    type: String,
    default: "default-image.jpg",
  },
});

export const Article = model("Article", ArticleSchema, "articles");
