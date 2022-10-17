const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("user", userSchema);
