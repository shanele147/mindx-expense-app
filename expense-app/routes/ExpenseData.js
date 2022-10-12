const express = require("express");
const router = express.Router();
const ExpenseDataController = require("../controllers/ExpenseDataController");
const { db } = require("../config/db");

router.get("/", async (req, res) => {
  const response = await ExpenseDataController.GetTransactions();
  res.status(200).json({
    msg: "Get data successfully",
    data: response,
  });
});

router.post("/", (req, res) => {});

module.exports = router;
