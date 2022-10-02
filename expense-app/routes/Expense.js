const express = require("express");
const router = express.Router();

const { db } = require("../config/db");

router.get("/", async (req,res) => {
  const expense = await db.expense.find().toArray();
  console.log(expense);
  res.status(200).json({
    msh: "Get MongoDB expense successfully",
    data: expense,
  });
});

router.post("/", (req, res) => {});

module.exports = router;
