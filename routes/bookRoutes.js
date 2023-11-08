const express = require("express");
const bookController = require("../controllers/bookController");

bookRouter = express.Router();

bookRouter.get("/get-books", bookController.getAllBooks);
bookRouter.get("/get-book/:id", bookController.getSingleBook);

bookRouter.post("/add-book", bookController.addNewBook);

bookRouter.patch("/update-book", bookController.updateBook);

bookRouter.delete("/delete-book", bookController.deleteBook);

module.exports = bookRouter;