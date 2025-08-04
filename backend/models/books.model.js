import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    publishingYear: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const Book = mongoose.model("Book", bookSchema);
export default Book;