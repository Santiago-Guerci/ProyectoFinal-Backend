import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { chatService } from "../services/chat.service.js";
import logger from "./logger.config.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const chatConfig = () => {
  io.on("connection", async (socket) => {
    logger.info(`Se conectó el id ${socket.id}`);

    const mensajes = await chatService.getAllMessages();

    socket.emit("server:messages", mensajes);

    socket.on("client:messages", async (messageInfo) => {
      await chatService.createMessage(messageInfo);
      const newMessages = await chatService.getAllMessages();
      io.emit("server:messages", newMessages);
    });
  });
};

const deleteMessages = async () => {
  await chatService.deleteAllMessages();
};

export { chatConfig, app, httpServer, deleteMessages };
