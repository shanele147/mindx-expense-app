const express = require("express");
const router = express.Router();

const { db } = require("../config/db");

router.get("/", async (req,res) => {
  // const categories = await db.categories.find().toArray();
  const categories = await db.categories.find({expense: {transaction: 1}}).toArray();
  console.log(categories);
  return res.status(200).json({
    msg: "Get MongoDB categories successfully",
    data: categories,
  });
});

router.post("/", (req, res) => {});

module.exports = router;
