// use express
const express = require("express");

// create instance of express
const app = express();
const PORT = 3005;

// ROUTING IN SERVER SIDE RENDERING
app.get("/", (req, res) => {
    res.send("Hello, welcome to myAPI");
});

app.get("/products", (req, res) => {
    res.send("<h2>Welcome to my first server</h2>");
});


// app will be inherit all methods of object express
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
