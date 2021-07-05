let books = require("../../data");
const slugify = require("slugify");
const {Product} = require("../../db/models");

exports.bookFetch = async (req, res) => {
    try {
        const books = await Product.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]}
        });
        res.json(books)
    } catch (error) {
        res.status(500).json(error.message);
    }
};

exports.bookDelete = (req, res) => {
    const {bookId} = req.params;
    const foundBook = books.find(book => book.id === +bookId);
    
    if (foundBook) {
        books = books.filter(book => book.id !== +bookId);
        res.json({
            message: `Book with ID ${bookId} was deleted successfully`
        })
        res.status(204).end();
    }
    else {
        res.status(404);
        res.json({
            message: "No book with this ID was found!"
        })
    }
};

exports.bookCreate = (req, res) => {
    const id = books.length + 1;
    const slug = slugify(req.body.name, {lower: true});
    const newBook = {id, slug, ...req.body};
    books.push(newBook);

    res.status(201).json(newBook);
};

exports.bookUpdate = (req, res) => {
    const {bookId} = req.params;
    const foundBook = books.find(book => book.id === +bookId);

    if (foundBook) {

        for (const key in req.body) foundBook[key] = req.body[key];
        foundBook.slug = slugify(req.body.name, {lower: true});
        res.json({
            message: `Book with ID ${bookId} was successfully updated`
        })

        res.status(204).end();
    }
    else {
        res.status(404);
        res.json({
            message: "No book with this ID was found!"
        })
    }
}