require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const { connectToDB } = require("./config/db");
const PORT = process.env.SERVER_PORT || 7777;

// middlewares
connectToDB();
app.use(cors("*"));
app.use(express.json({extended: false}));


app.get("/", (req, res) => {
    res.send("Welcome to Expense app API");
});

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
  });

app.listen(PORT, () => {
    console.log("Server is running at " + PORT);
});