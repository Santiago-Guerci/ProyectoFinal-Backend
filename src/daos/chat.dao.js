import { Chat } from "../models/chat.model";
import BaseRepository from "./baseRepository";

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
