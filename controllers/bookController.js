const Book = require("../models/book");
const generateISBN = require("../utils/isbnGenerator");

const addNewBook = async (req,res) => {
    const bookTitle = req.body.title;
    const bookAuthor = req.body.author;
    const bookSummary = req.body.summary;

    if(!bookTitle || !bookAuthor || !bookSummary){
        return res.send({
            "success": false,
            "error_code": 400,
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
                "error_code": 400,
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
                "error_code": 400,
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
    try{
        const allBooks = await Book.find();

        if(allBooks.length === 0){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "No books found, add some books first",
                "data": []
            });
        }

        return res.send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched all Books",
            "data": allBooks
        });

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        });
    }
};

const getBookByDetails = async (req,res) => {
    const bookTitle = req.body.title || null;
    const bookAuthor = req.body.author || null;

    const bookISBN = req.body.ISBN || null;

    try {
        if(!bookISBN){
            if(!bookTitle || !bookAuthor){
                return res.send({
                    "success": false,
                    "error_code": 400,
                    "message": "Unable to fetch, Either give Book ISBN or Book author & title",
                    "data": null
                });
            }

            const singleBook = await Book.findOne({
                title: bookTitle,
                author: bookAuthor
            });

            if(!singleBook){
                return res.send({
                    "success": false,
                    "error_code": 400,
                    "message": "Book Does not exist",
                    "data": null
                });
            }

            return res.send({
                "success": true,
                "error_code": 200,
                "message": "Successfully fetched the book by title & author",
                "data": singleBook
            });
        }

        if(bookISBN.length !== 13){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "Invalid ISBN, ISBN should be of 13 digits and start with 978..",
                "data": null
            });
        }

        const singleBook = await Book.findOne({
            ISBN: bookISBN
        });

        if(!singleBook){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "Book Does not exist",
                "data": null
            });
        }

        return res.send({
            "success": true,
            "error_code": 200,
            "message": "Successfully fetched the book by ISBN",
            "data": singleBook
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

const getBookById = async (req,res) => {
    const bookId = req.params.id;

    try {
        const singleBook = await Book.findById(bookId);

        if(!singleBook){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "Book does not Exist, Inalid Book Id",
                "data": null
            });
        }

        return res.send({
            "success": true,
            "error_code": 200,
            "message": "Successfully fetched the book by Id",
            "data": singleBook
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

const updateBook = async (req,res) => {

};

const deleteBookByDetails = async (req,res) => {
    const bookTitle = req.body.title || null;
    const bookAuthor = req.body.author || null;

    const bookISBN = req.body.ISBN || null;

    try {
        if(!bookISBN){
            if(!bookTitle || !bookAuthor){
                return res.send({
                    "success": false,
                    "error_code": 400,
                    "message": "Unable to delete, Either give Book ISBN or Book author & title",
                    "data": null
                });
            }

            const toDeleteBook = await Book.findOne({
                title: bookTitle,
                author: bookAuthor
            });

            if(!toDeleteBook){
                return res.send({
                    "success": false,
                    "error_code": 400,
                    "message": "Book Does not exist",
                    "data": null
                });
            }

            await Book.deleteOne(toDeleteBook);

            return res.send({
                "success": true,
                "error_code": 200,
                "message": "Successfully deleted the book by title & author",
                "data": toDeleteBook
            });
        }

        if(bookISBN.length !== 13){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "Invalid ISBN, ISBN should be of 13 digits and start with 978..",
                "data": null
            });
        }

        const toDeleteBook = await Book.findOne({
            ISBN: bookISBN
        });

        if(!toDeleteBook){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "Book Does not exist",
                "data": null
            });
        }

        await Book.deleteOne(toDeleteBook);

        return res.send({
            "success": true,
            "error_code": 200,
            "message": "Successfully deleted the book by ISBN",
            "data": toDeleteBook
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

const deleteBookById = async (req,res) => {
    const bookId = req.params.id;

    try {
        const toDeleteBook = await Book.findById(bookId);

        if(!toDeleteBook){
            return res.send({
                "success": false,
                "error_code": 400,
                "message": "Book to delete does not exist",
                "data": null
            });
        }

        await Book.deleteOne(toDeleteBook);

        return res.send({
            "success": true,
            "error_code": 200,
            "message": "Successfully deleted the book",
            "data": toDeleteBook
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


module.exports = {
    getAllBooks,
    getBookByDetails,
    getBookById,
    addNewBook,
    updateBook,
    deleteBookById,
    deleteBookByDetails
}