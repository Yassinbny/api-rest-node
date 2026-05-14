import validator from "validator";
import { Article } from "../models/Articles.model.js";

const createArticle = async (req, res) => {
  // take the data from the request body
  const { title, content } = req.body;

  // validate the data
  try {
    let validate_title =
      !validator.isEmpty(title) &&
      validator.isLength(title, { min: 5, max: 25 });
    let validate_content = !validator.isEmpty(content);
    if (!validate_title || !validate_content) {
      throw new Error("Validation failed: title and content are required");
    }

    // create the article to save
    // assign values to the article
    const article = new Article(req.body);
    // save the article to the database
    const articleStored = await article.save();

    return res
      .status(200)
      .json({ message: "createArticle is ok", data: articleStored });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error creating article", status: "error", error });
  }
};

const getArticles = async (req, res) => {
  try {
    let consult = await Article.find({}).sort({ date: -1 }).exec();

    if (!consult || consult.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found", status: "error" });
    }

    return res
      .status(200)
      .json({ message: "getArticles is ok", data: consult });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error fetching articles", status: "error", error });
  }
};

export { createArticle, getArticles };
