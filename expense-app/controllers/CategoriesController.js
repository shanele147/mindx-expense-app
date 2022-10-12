const { db } = require("../config/db");

const CreateTransaction = async (transaction) => {
  const { id, date, amount, category, description, type, wallet } = transaction;
const expenseTransaction = await db.categories.find({ "expense": "transactions"});

};
