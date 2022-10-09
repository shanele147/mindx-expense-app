const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const UserController = require("../controllers/UsersController");

router.get("/", async (req, res) => {
  const users = await db.users.find().toArray();
  console.log(users);
  res.status(200).json({
    msg: "Get MongoDB users successfully",
    data: users,
  });
});

router.post("/", async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      msg: "Missing required keys",
    });
  }

  const user = { username, password, email };
  try {
    const response = await UserController.Create(user);
    return res.status(201).json({
      msg: "Create user successfully",
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
