const express = require("express");
let books = require("./data.js");
const cors = require("cors");

const app = express();

app.use(cors())

app.get("/books", (req, res) => {
    res.json(books)
});

app.delete("/books/:bookId", (req, res) => {
    const {bookId} = req.params;
    const foundBook = books.find(book => book.id === +bookId);
    
    if (foundBook) {
        books = books.filter(book => book.id !== +bookId);
        res.json({
            message: `Book with ID ${bookId} was deleted successfully`
        })
        res.status(204).end();

        console.log(books);
    }
    else {
        res.status(404);
        res.json({
            message: "No book with this ID was found!"
        })

    }
    

})

app.listen(8000);