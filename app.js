const express = require("express");
const cors = require("cors");
const bookRoutes = require("./API/book/routes");
const db = require("./db/models");

const app = express();

app.use(cors())
app.use(express.json());

app.use("/books", bookRoutes);

const run = async () => {
    try {
        await db.sequelize.sync();
        app.listen(8000);
    } catch (error) {
        console.log(error);
    }
}

run();