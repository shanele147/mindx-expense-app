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

const update = async (id) => {};

const remove = (id) => {};

const UserController = {
  getById,
  findOne,
  create,
  update,
  remove,
};

module.exports = UserController;
