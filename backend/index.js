import express from "express";
import mongoose, { mongo } from "mongoose";
import { PORT, DB_URL } from "./config.js";
import { Book } from "./models/books.model.js";
import booksRoutes from "./routes/books.routes.js";

const app = express();
app.use(express.json());
app.use("/books", booksRoutes);

// connecting to the database and starting the server
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
