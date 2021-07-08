const express = require("express");
const cors = require("cors");
const bookRoutes = require("./API/book/routes");
const shopRoutes = require("./API/shop/routes");

const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CRUD routes
app.use("/books", bookRoutes);
app.use("/shops", shopRoutes);
app.use("/media", express.static("media"));

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Path Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    app.listen(8000);
  } catch (error) {
    console.log(error);
  }
};

run();
