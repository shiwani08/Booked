import express from "express";
import mongoose, { mongo } from "mongoose";
import { PORT, DB_URL } from "./config.js";
import { Book } from "./models/books.model.js";

const app = express();
app.use(express.json());

// making this is important to ensure the server is running
// call back function to handle the root route
app.get("/", (req, res) => {
  res.status(200).send("Hello, World!!!");
  //   console.log(`Response status: ${res.status}`);
});

// adding route for the books model
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publisher, publishingYear } = req.body;
    const newBook = new Book({
      title,
      author,
      publisher,
      publishingYear,
    });
    await newBook.save();
    res.status(201).json({
      message: "Book created successfully",
      book: newBook
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
