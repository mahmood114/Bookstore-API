const express = require("express");
const cors = require("cors");
const bookRoutes = require("./API/book/routes");

const app = express();

app.use(cors())
app.use(express.json());

app.use("/books", bookRoutes);
app.listen(8000);