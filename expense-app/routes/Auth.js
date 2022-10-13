const { response } = require("express");
const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
const AuthController = require("../controllers/AuthController");
const UsersController = require("../controllers/UsersController");
const authMdw = require("../middlewares/AuthMdw");

// AUTHORIZE THE USER EVERY LOGGING
router.post("/login", async (req, res, next) => {
  console.log({ body: req.body });
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      msg: "Missing required keys",
    });
  }
  try {
    const loginResponse = await AuthController.Login({ username, password });
    console.log(loginResponse);
    return res.status(200).json(loginResponse);
  } catch (err) {
    next(err);
  }
});

// CHECK IF TOKEN IS NOT EXPIRED = RETURN USER'S INFO TO CLIENT SIDE EVERY WEB APP ACTIVATED OR RELOAD
router.get("/", authMdw, async (req, res, next) => {
  const user = req.user;
  // console.log(user);
  try {
    const userInfo = await UsersController.GetById(user._id);
    return res.status(200).json({
      msg: "Token is still valid!",
      user: userInfo,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
