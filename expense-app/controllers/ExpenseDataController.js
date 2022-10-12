const { db } = require("../config/db");

const GetTransactions = async () => {
  const data = await db.appData.find().toArray();
  return data;
  // console.log(data);
};

module.exports = {
  GetTransactions,
};
