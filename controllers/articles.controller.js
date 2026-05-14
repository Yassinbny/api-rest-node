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
    let consult = Article.find({}).sort({ date: -1 });

    if (req.params?.last) {
      consult = consult.limit(parseInt(req.params.last));
    }
    consult = await consult.exec();
    if (!consult || consult.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found", status: "error" });
    }

    return res.status(200).json({
      message: "getArticles is ok",
      url_parameter: req.params?.last,
      data: consult,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error fetching articles", status: "error", error });
  }
};

const getOneArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);

    if (!article) {
      return res
        .status(404)
        .json({ message: "Article not found", status: "error" });
    }
    return res.status(200).json({
      message: "getOneArticle is ok",
      data: article,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error fetching article", status: "error", error });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const articleDeleted = await Article.findByIdAndDelete(articleId);

    if (!articleDeleted) {
      return res
        .status(404)
        .json({ message: "Article not found", status: "error" });
    }

    return res.status(200).json({
      message: "Article deleted successfully",
      data: articleDeleted,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting article", status: "error", error });
  }
};

const updateArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    const updateData = req.body;
    const articleUpdated = await Article.findByIdAndUpdate(
      articleId,
      updateData,
      { new: true },
    );

    if (!articleUpdated) {
      return res
        .status(404)
        .json({ message: "Article not found", status: "error" });
    }

    return res.status(200).json({
      message: "Article updated successfully",
      data: articleUpdated,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating article", status: "error", error });
  }
};

export {
  createArticle,
  getArticles,
  getOneArticle,
  deleteArticle,
  updateArticle,
};
