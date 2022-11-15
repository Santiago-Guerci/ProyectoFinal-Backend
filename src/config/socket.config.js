import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import { chatService } from "../services/chat.service";

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const chatConfig = () => {
  io.on("connection", async (socket) => {
    console.log(`Se conectó el id ${socket.id}`);

    const mensajes = await chatService.getAllMessages();

    socket.emit("server:messages", mensajes);

    socket.on("client:messages", async (messageInfo) => {
      await chatService.createMessage(messageInfo);
    });
  });
};

export default chatConfig;
