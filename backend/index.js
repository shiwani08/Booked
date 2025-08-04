import express from "express";
import mongoose, { mongo } from "mongoose";
import { PORT, DB_URL } from "./config.js";

const app = express();

// making this is important to ensure the server is running
// call back function to handle the root route
app.get("/", (req, res) => {
  res.status(200).send("Hello, World!!!");
  //   console.log(`Response status: ${res.status}`);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
