const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectToDB = () => {
  mongoose.connect(
    MONGO_URI,
    {
      maxPoolSize: 50,
    },
    (error) => {
      if (error) {
        throw Error("Connection error: " + JSON.stringify(error));
      }
      console.log("DB connected successfully!");
    }
  );
};

module.exports = {
  connectToDB,
};
