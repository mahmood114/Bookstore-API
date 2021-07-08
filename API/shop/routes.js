const express = require("express");
const {
  shopFetch,
  shopCreate,
  fetchShop,
  bookCreate,
} = require("./controllers");
const multer = require("multer");

const router = express.Router();

// Multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// shopId Param
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);

  if (shop) {
    req.shop = shop;
    next();
  } else {
    const error = new Error("Shop Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", shopFetch);

// Create shop
router.post("/", upload.single("image"), shopCreate);

// Create book
router.post("/:shopId/books", upload.single("image"), bookCreate);

module.exports = router;
