const { db } = require("../config/db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const Create = async (user) => {
  const { username, password, email } = user;
  const existedUser = await db.users.findOne({ username });

  if (existedUser) {
    throw Error("User already existed. Please try another username.");
  }

  // CREATE HASH PASSWORDS
  const salt = await bcrypt.genSalt(10);
  // console.log(salt);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = {
    username,
    password: hashPassword,
    role: "user" /* set default role for all users is user */,
    email,
    createDate: new Date(),
  };

  // console.log(newUser);
  // METHODS
  const createdUser = await db.users.insertOne(newUser);

  const returnUser = {
    ...newUser,
    id: createdUser.insertedId /* insertedId is the property of insertOne method of MongoDB */,
  };
};

const GetUsers = async () => {
  const users = await db.users.find().toArray();
  return users;
  // console.log(users);
};

const GetById = async (id) => {
  const user = await db.users.findOne({ _id: ObjectId(id) });
  // using destructuring to remove password of user
  const { password, ...restInfo } = user;
  return restInfo;
};

const Update = (id, payload) => {};

module.exports = {
  Create,
  GetUsers,
  GetById,
  Update,
};
