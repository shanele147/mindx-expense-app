const express = require("express");
const router = express.Router();

router.post('/users', (req, res) => {
    console.log({body: req.body});
    const {username, password } = req.body;
    });

module.exports = router;