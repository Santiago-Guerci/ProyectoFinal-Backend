import { userDao } from "../daos/user.dao.js";

const createUser = async (newUser) => {
  const createdUser = await userDao.createUser(newUser);
  return createdUser;
};

const checkUser = async (email) => {
  const existingUser = await userDao.checkUser(email);
  return existingUser;
};

const getUserById = async (id, done) => {
  const user = await userDao.getUserById(id, done);
  return user;
};

export const userService = { createUser, checkUser, getUserById };
