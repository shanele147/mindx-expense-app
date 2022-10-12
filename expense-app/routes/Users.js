const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const UserController = require("../controllers/UsersController");

router.get("/", async (req, res) => {
  const response = await UserController.GetUsers();
  res.status(200).json({
    msg: "Get users successfully",
    // data: users,
    data: response,
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
      msg: "Register successfully",
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
