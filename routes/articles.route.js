import express from "express";
import multer from "multer";
import {
  createArticle,
  deleteArticle,
  getArticles,
  getOneArticle,
  updateArticle,
  uploadImage,
  getImageFile,
} from "../controllers/articles.controller.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/articles/");
  },
  filename: (req, file, cb) => {
    cb(null, "article-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage });
// use {/:last} to get the last Y  articles, if the parameter is not provided, it will return all articles
router.get("/articles{/:last}", getArticles);

router.get("/article/:id", getOneArticle);

router.get("/image/:file", getImageFile);

router.post("/create", createArticle);

router.post("/upload-image/:id", [uploads.single("image")], uploadImage);

router.put("/article/:id", updateArticle);

router.delete("/article/:id", deleteArticle);
export default router;
