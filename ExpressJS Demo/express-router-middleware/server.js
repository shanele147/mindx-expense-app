const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const whitelist= ['google.com'];

const PORT = 7777;
const app = express();
app.use(express.json());
app.use(cors("*"));

// console.log(users);

// Routes
app.get("/", (req, res) => {
    res.send("Hello welcome to our API");
  });

app.use("/api/v1", routes);

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
