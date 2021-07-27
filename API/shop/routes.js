const express = require("express");
const {
  shopFetch,
  shopCreate,
  fetchShop,
  bookCreate,
} = require("./controllers");
const multer = require("multer");
const passport = require("passport");

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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);

// Create book
router.post(
  "/:shopId/books",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bookCreate
);

module.exports = router;
