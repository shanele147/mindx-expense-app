const { db } = require("../config/db");

const GetTransactions = async () => {
  const data = await db.appData.find().toArray();
  // console.log("data:", data);
  return data;
};

module.exports = {
  GetTransactions,
};
