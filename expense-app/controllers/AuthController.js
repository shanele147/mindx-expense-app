const { db } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRED_TIME = process.env.JWT_EXPIRED_TIME;

const Login = async ({ username, password }) => {
  const existedUser = await db.users.findOne({ username });

  if (existedUser) {
    const { email } = existedUser;
    const isMatchPass = await bcrypt.compare(password, existedUser.password);

    if (isMatchPass) {
      const token = jwt.sign(
        {
          username,
          email,
        },
        JWT_SECRET_KEY,
        { expiresIn: JWT_EXPIRED_TIME }
      );
      console.log(username + " login successfully");
      return {
        msg: "Login successfully!",
        token,
        isAuthenticated: true,
        user: username,
      };
    }
  }

  throw new Error("Password or username is not correct, please try again.");
  /* return {
    msg: "Password or username is not correct, please try again.",
  }; */
};

const verifyToken = async () => {};

module.exports = {
  Login,
  verifyToken,
};
