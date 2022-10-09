const { db } = require("../config/db");
const bcrypt = require("bcrypt");

const Create = async (user) => {
  const { username, password, email } = user;
  const existedUser = await db.users.findOne({ username });

  if (existedUser) {
    throw Error("User already exists");
  }

  // CREATE HASHPASS WORDS
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = {
    username,
    password: hashPassword,
    role: "user" /* set default role for all users is user */,
    email,
    createDate: new Date(),
  };

  console.log(newUser);
  // METHODS
  const createUser = await db.users.insertOne(newUser);

  const returnUser = {
    ...newUser,
    id: createUser.insertedId /* insertedId is the property of insertOne method of MongoDB */,
  };
};

const GetById = (id) => {};
const Update = (id, payload) => {};

module.exports = {
  Create,
  GetById,
  Update,
};
