import connection from "./database/connection.js";
import express from "express";
import cors from "cors";
connection();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
