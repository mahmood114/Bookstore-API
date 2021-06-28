const express = require("express");
const data = require("./data.js");
const cors = require("cors");

const app = express();

// app.use(cors())

app.get("/", (req, res) => {
    res.json(data)
});

app.listen(8000, () => {
    console.log("hoy")
});