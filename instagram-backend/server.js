import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8081;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello Instagram Clone");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
