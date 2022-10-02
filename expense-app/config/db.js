const { MongoClient } = require("mongodb");

// Connection URL
const DB_NAME = process.env.MONGO_DB_NAME;
const client = new MongoClient(process.env.MONGO_URI);

const db = {};

const clientMongoDB = async () => {
  try {
    await client.connect();
    console.log("DB connected successfully");
    const dbInstance = client.db(DB_NAME);
    db.expense = dbInstance.collection("expense");
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  clientMongoDB,
  db,
};