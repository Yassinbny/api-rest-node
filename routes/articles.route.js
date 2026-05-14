import express from "express";
import {
  createArticle,
  deleteArticle,
  getArticles,
  getOneArticle,
  updateArticle,
} from "../controllers/articles.controller.js";
const router = express.Router();

// use {/:last} to get the last Y  articles, if the parameter is not provided, it will return all articles
router.get("/articles{/:last}", getArticles);

router.get("/article/:id", getOneArticle);

router.post("/create", createArticle);

router.put("/article/:id", updateArticle);

router.delete("/article/:id", deleteArticle);
export default router;
