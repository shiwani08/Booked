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
});

// get all books and print the count of the books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// find book by specific criteria
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create a new book
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
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publisher, publishingYear } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publisher, publishingYear },
      { new: true, runValidators: true }
    );  
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,        
    });
  } catch (error) {
    console.error("Error deleting book:", error);
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
