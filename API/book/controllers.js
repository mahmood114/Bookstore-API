const { Product } = require("../../db/models");

exports.fetchBook = async (bookId, next) => {
  try {
    const book = await Product.findByPk(bookId);
    return book;
  } catch (error) {
    next(error);
  }
};

exports.bookFetch = async (req, res, next) => {
  try {
    const books = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.bookDelete = async (req, res, next) => {
  try {
    const foundBook = req.book;

    await foundBook.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.bookUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;

    const foundBook = req.book;

    await foundBook.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
