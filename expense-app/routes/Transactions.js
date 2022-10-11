const express = require("express");
const router = express.Router();
const { db } = require("../config/db");

router.get("/", async (req, res) => {
  const transactions = await db.transactions.find().toArray();
  console.log(transactions);
  res.status(200).json({
    msg: "Get transactions successfully",
    data: transactions,
  });
});

router.post("/", (req, res) => {});

module.exports = router;
