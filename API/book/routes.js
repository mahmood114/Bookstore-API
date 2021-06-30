const express = require("express");
const {bookFetch, bookDelete, bookCreate, bookUpdate} = require("./controllers");

const router = express.Router();

router.get("/", bookFetch);

router.delete("/:bookId", bookDelete);

router.post("/", bookCreate);

router.put("/:bookId", bookUpdate);

module.exports = router;