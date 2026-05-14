import connection from "./database/connection.js";
import express from "express";
import cors from "cors";
import articlesRoutes from "./routes/articles.route.js";

connection();

const app = express();

app.use(cors());

app.use(express.json()); // to parse JSON bodies content-type 'application/json'

app.use(express.urlencoded({ extended: true })); // to parse URL-encoded bodies content-type 'application/x-www-form-urlencoded'

app.use("/api", articlesRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
