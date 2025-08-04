import { Book } from "../models/books.model.js";

const getAllBooks = async (req, res) => {
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
};

const getBookById = async (req, res) => {
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
};

const createBook = async (req, res) => {
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
};

const updateBook = async (req, res) => {
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
};

const deleteBook = async (req, res) => {
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
};
