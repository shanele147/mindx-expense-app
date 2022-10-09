const { response } = require("express");
const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/AuthController');


router.post('/login', async (req, res, next) => {
    console.log({ body: req.body })
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: "Missing required keys",
        });
    }
    
    try{
        const loginResponse = await AuthController.Login({username, password});
        return res.status(200).json(loginResponse);
    }
    catch(err){
        next(err);
    }
});

module.exports = router;