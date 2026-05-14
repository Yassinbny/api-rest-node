import express from "express";
import {
  createArticle,
  getArticles,
} from "../controllers/articles.controller.js";
const router = express.Router();

router.get("/articles", getArticles);

router.post("/create", createArticle);

export default router;
