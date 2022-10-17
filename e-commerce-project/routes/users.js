const express = require("express");
const UserController = require("../controllers/UserController");
const { hashPassword } = require("../utils/Password");
const router = express.Router();

/* Public method */
router.post("/", async (req, res, next) => {
  const { fullName, password, email } = req.body;
  console.log("Go");
  // validation
  if (!fullName || !password || !email) {
    return res.status(400).json({
      msg: "Missing required keys",
    });
  }

  try {
    const user = await UserController.findOne({ email });

    if (user) {
      return res.status(400).json({
        msg: "User existed",
      });
    }
    console.log("User:", user);

    const newUser = {
      fullName,
      password: await hashPassword(password),
      email,
    };

    await UserController.create(newUser);

    return res.status(201).json({
      msg: "User created successfully",
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/", (req, res) => {
  console.log("Get users");
  res.status(200);
});

module.exports = router;
