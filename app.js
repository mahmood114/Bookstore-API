const express = require("express");
const cors = require("cors");
const bookRoutes = require("./API/book/routes");
const db = require("./db/models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CRUD routes
app.use("/books", bookRoutes);
app.use("/media", express.static("media"));

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Path Not Found middleware
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
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
