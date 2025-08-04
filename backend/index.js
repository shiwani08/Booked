import express from "express";
import mongoose, { mongo } from "mongoose";
import { PORT, DB_URL } from "./config.js";
import booksRoutes from "./routes/books.routes.js";

const app = express();

// middleware
app.use(express.json());
app.use("/books", booksRoutes);

app.get("/", (req, res) => {
  console.log("Welcome to the Book API");
  res.send("Hello from index.js");
});
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
