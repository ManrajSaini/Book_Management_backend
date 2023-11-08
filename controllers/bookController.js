const Book = require("../models/book");
const generateISBN = require("../utils/isbnGenerator");

const addNewBook = async (req,res) => {
    const bookTitle = req.body.title;
    const bookAuthor = req.body.author;
    const bookSummary = req.body.summary;

    if(!bookTitle || !bookAuthor || !bookSummary){
        return res.send({
            "success": false,
            "error_code": 200,
            "message": "Add book title, author and summary",
            "data": null
        });
    }

    try {
        const alreadyExists = await Book.findOne({
            title: bookTitle,
            author: bookAuthor
        });

        if(alreadyExists){
            return res.send({
                "success": false,
                "error_code": 200,
                "message": "Book already exists, cannot create again!",
                "data": null
            });
        }

        const bookISBN = generateISBN();
        const isbnExists = await Book.findOne({
            ISBN: bookISBN
        });

        if(isbnExists){
            return res.send({
                "success": false,
                "error_code": 200,
                "message": "ISBN already exists for some other book, try creating again",
                "data": null
            });
        }

        const newBook = new Book({
            title: bookTitle,
            author: bookAuthor,
            summary: bookSummary,
            ISBN: bookISBN
        });

        await Book.create(newBook);

        return res.send({
            "success": true,
            "error_code": null,
            "message": "Successfully added a new Book",
            "data": newBook
        });
        
    } catch (err) {
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};

const getAllBooks = async (req,res) => {

};

const getSingleBook = async (req,res) => {

};

const updateBook = async (req,res) => {

};

const deleteBook = async (req,res) => {

};


module.exports = {
    getAllBooks,
    getSingleBook,
    addNewBook,
    updateBook,
    deleteBook
}