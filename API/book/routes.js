const express = require("express");
const {
  bookFetch,
  bookDelete,
  bookCreate,
  bookUpdate,
  fetchBook,
} = require("./controllers");
const multer = require("multer");

const router = express.Router();

router.param("bookId", async (req, res, next, bookId) => {
  const book = await fetchBook(bookId, next);

  if (book) {
    req.book = book;
    next();
  } else {
    const error = new Error("Book Not Found");
    error.status = 404;
    next(error);
  }
});

// Multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/", bookFetch);

router.delete("/:bookId", bookDelete);

router.put("/:bookId", upload.single("image"), bookUpdate);

module.exports = router;
