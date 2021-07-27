// Middleware
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Routes
const bookRoutes = require("./API/book/routes");
const shopRoutes = require("./API/shop/routes");
const userRoutes = require("./API/user/routes");
const orderRoutes = require("./API/order/routes");

// Database
const db = require("./db/models/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// CRUD routes
app.use("/books", bookRoutes);
app.use("/shops", shopRoutes);
app.use(userRoutes);
app.use(orderRoutes);
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
    app.listen(8000, () => console.log("App is running on port 8000"));
  } catch (error) {
    console.log(error);
  }
};

run();
