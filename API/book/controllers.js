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

exports.bookCreate = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
    // const id = books.length + 1;
    // const slug = slugify(req.body.name, {lower: true});
    // const newBook = {id, slug, ...req.body};
    // books.push(newBook);

    // res.status(201).json(newBook);
};

exports.bookDelete = async (req, res) => {
    
    try {
        const {bookId} = req.params;
        const foundBook = await Product.findByPk(bookId)

        if (foundBook) {
            await foundBook.destroy();
            res.status(204).end();
        }
        else {
            res.status(404).json({msg: `The product with ID ${bookId} does not exist`});
        }

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

exports.bookUpdate = async (req, res) => {

    try {
        const {bookId} = req.params;
        const foundBook = await Product.findByPk(bookId);

        if (foundBook) {
            foundBook.update(req.body);
            res.status(204).end();
        }
        else res.status(404).json({msg: `The product with ID ${bookId} does not exist`});

    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}