const { db } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRED_TIME = process.env.JWT_EXPIRED_TIME;
const UsersController = require("../controllers/UsersController");

const Login = async ({ username, password }) => {
  const existedUser = await db.users.findOne({ username });

  if (existedUser) {
    const { email, _id } = existedUser;
    const isMatchPass = await bcrypt.compare(password, existedUser.password);

    if (isMatchPass) {
      const token = jwt.sign(
        {
          username,
          email,
          _id,
        },
        JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRED_TIME }
      );

      console.log(username + " login successfully");

      // RETURN THE USER'S INFO AFTER 1st LOGIN
      const userInfo = await UsersController.GetById(_id);
      return {
        msg: "Login successfully!",
        token,
        isAuthenticated: true,
        user: userInfo,
      };
    }
  }

  throw Error("Password or username is not correct, please try again.");
};

module.exports = {
  Login,
};
