const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const USERNAME = process.env.BASIC_USERNAME;
const PASSWORD = process.env.BASIC_PASSWORD;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRED_TIME = process.env.JWT_EXPIRED_TIME;

router.post('/login', (req, res) => {
    console.log({ body: req.body })
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: "Missing required keys",
        });
    }
    if (username === USERNAME && password === PASSWORD) {
        const token = jwt.sign({
            fullname: "Shane Le",
            role: "admin"
        },
            JWT_SECRET_KEY,
            { expiresIn: JWT_EXPIRED_TIME }
        );
        return res.status(200).json({
            msg: "Login successfully!",
            token,
        });
    }

    return res.json({
        msg: "Password or username is not correct, please try again."
    });
});
router.post("/register", (req, res) => { });
module.exports = router;