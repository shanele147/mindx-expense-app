const UserModel = require("../models/userModel");

/* Methods */

const getById = (id) => {
  return UserModel.findById(id);
};

const findOne = (params) => {
  return UserModel.findOne(params);
};

const create = (user) => {
  const newUser = new UserModel(user);
  return newUser.save();
};

const UserController = {
  getById,
  findOne,
  create,
};

module.exports = UserController;
