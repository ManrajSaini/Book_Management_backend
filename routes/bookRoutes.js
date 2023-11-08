const express = require("express");
const bookController = require("../controllers/bookController");

bookRouter = express.Router();

bookRouter.get("/get-books", bookController.getAllBooks);
bookRouter.get("/get-book", bookController.getBookByDetails);
bookRouter.get("/get-book/:id", bookController.getBookById);


bookRouter.post("/add-book", bookController.addNewBook);

// bookRouter.patch("/update-book", bookController.updateBook);

bookRouter.delete("/delete-book", bookController.deleteBookByDetails);
bookRouter.delete("/delete-book/:id", bookController.deleteBookById);


module.exports = bookRouter;