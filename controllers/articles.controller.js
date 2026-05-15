import { Article } from "../models/Articles.model.js";
import { validateArticle } from "../helpers/validate.js";
import fs, { access } from "fs";
import path from "path";
const createArticle = async (req, res) => {
  // take the data from the request body
  const { title, content } = req.body;

  // validate the data
  try {
    const validatedData = validateArticle({ title, content });
    if (!validatedData) {
      return res.status(400).json({
        message: "Validation error",
        status: "error",
        error: "Invalid article data",
      });
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
      { returnDocument: "after", runValidators: true },
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

const uploadImage = async (req, res) => {
  try {
    console.log(req.file);

    if (!req.file && !req.files) {
      return res
        .status(400)
        .json({ message: "No file uploaded", status: "error" });
    }

    // extension of the file
    let fileExtension = req.file.originalname.split(".").pop();
    // check extension
    if (!["jpg", "jpeg", "png", "gif"].includes(fileExtension.toLowerCase())) {
      await fs.promises.unlink(req.file.path);
      return res
        .status(400)
        .json({ message: "Invalid file type", status: "error" });
    }

    // update the article with the image name

    let articleId = req.params.id;
    const articleUpdated = await Article.findByIdAndUpdate(
      articleId,
      { image: req.file.filename },
      { returnDocument: "after", runValidators: true },
    );

    if (!articleUpdated) {
      await fs.promises.unlink(req.file.path);
      return res
        .status(404)
        .json({ message: "Article not found", status: "error" });
    }

    return res
      .status(200)
      .json({ message: "Image uploaded successfully", file: req.file });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error uploading image", status: "error", error });
  }
};

const getImageFile = async (req, res) => {
  try {
    let fileName = req.params.file;

    let path_file = "./images/articles/" + fileName;

    await fs.promises.access(path_file);

    return res.sendFile(path.resolve(path_file));
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching image", status: "error", error });
  }
};

const searchArticle = async (req, res) => {
  try {
    let query = req.params.query;
    const foundedArticles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ date: -1 })
      .exec();
    return res.status(200).json({
      message: "Articles found",
      data: foundedArticles,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error searching articles", status: "error", error });
  }
};

export {
  createArticle,
  getArticles,
  getOneArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
  getImageFile,
  searchArticle,
};
