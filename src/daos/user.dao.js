import { User } from "../models/user.model.js";

const createUser = async (newUser) => {
  const createdUser = await User.create(newUser);
  return createdUser;
};

const checkUser = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser;
};

const getUserById = async (id, done) => {
  const user = await User.findById(id, done);
  return user;
};

export const userDao = { createUser, checkUser, getUserById };
