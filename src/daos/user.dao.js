import { User } from "../models/user.model.js";
import BaseRepository from "./baseRepository.js";

let instance;

class UserDao extends BaseRepository {
  constructor() {
    super(User);
  }

  async checkUser(email) {
    const existingUser = await User.findOne({ email });
    return existingUser;
  }

  static getInstance() {
    if (!instance) {
      instance = new UserDao();
    }
    return instance;
  }
}

export const userDao = new UserDao();
