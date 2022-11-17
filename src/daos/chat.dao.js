import { Chat } from "../models/chat.model.js";
import BaseRepository from "./baseRepository.js";

let instance;
class ChatDao extends BaseRepository {
  constructor() {
    super(Chat);
  }

  getInstance() {
    if (!instance) {
      instance = new ChatDao();
    }
    return instance;
  }
}

export const chatDao = new ChatDao();
