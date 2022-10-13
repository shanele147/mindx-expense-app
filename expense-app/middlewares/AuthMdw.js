const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_KEY = "token";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.headers[ACCESS_TOKEN_KEY];
  // console.log(token);

  if (!token) {
    return res.status(400).json({
      msg: "Token is required",
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  if (!decoded) {
    throw new Error("Token is not valid, no authorization.");
  }

  req.user = decoded;
  next();
};
