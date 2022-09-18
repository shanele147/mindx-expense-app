require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const PORT = process.env.SERVER_PORT || 7777;

app.use(express.json());
app.use(cors("*"));

app.get("/", (req, res) => {
  res.send("Welcome to Expense app API");
});

app.use("/api/v1", routes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message)
})
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});

/* Base API
**Base URL: http://localhost:7777/api/v1
Set up API endpoint
- Get all students:     GET baseURL/students
- Get a student:        GET baseURL/students/:id
- Add a new student:    POST baseURL/students (has body)
- Update student:       PUT baseURL/students/:id (has body)
- Delete student:       DELETE baseURL/students/:id (no body)

- Different between PUT and PATCH

*/