import UserDao from "../daos/user.dao.js";

const createUser = async (newUser) => {
  const createdUser = await UserDao.create(newUser);
  return createdUser;
};

const checkUser = async (email) => {
  const existingUser = await UserDao.checkUser(email);
  return existingUser;
};

const getUserById = async (id, done) => {
  const user = await UserDao.getById(id, done);
  return user;
};

export const userService = { createUser, checkUser, getUserById };
