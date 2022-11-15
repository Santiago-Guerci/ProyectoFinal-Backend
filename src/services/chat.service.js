import { chatDao } from "../daos/chat.dao";

const createMessage = async (message) => {
  if (typeof message.email !== "string") throw "Email must be a string";
  if (typeof message.body !== "string") throw "Message must be a string";
  if (!message.body) throw "You must write something in the body to send it";

  const createdMessage = await chatDao.create(message);
  return createdMessage;
};

const getAllMessages = async () => {
  const messages = await chatDao.getAll();
  return messages;
};

export const chatService = { createMessage, getAllMessages };
