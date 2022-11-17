import express from "express";
import session from "express-session";
import rutas from "./routes/routes.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cluster from "cluster";
import passport from "passport";
import passportConfig from "./config/passport.config.js";
import compression from "compression";
import MongoStore from "connect-mongo";
import config from "./config/cli.config.js";
import logger from "./config/logger.config.js";
import dotenv from "dotenv";
import os from "os";
import mongoConnection from "./config/db.config.js";
import { chatConfig, app, httpServer, deleteMessages } from "./config/socket.config.js";
dotenv.config();

//Me conecto a la base de datos
mongoConnection();

//Seteo del servidor, comandos de linea, configuracion del dirname y el uso de las plantillas.
const port = config.port;
const mode = config.mode;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/public", express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../public/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Seteo las cookies y la session de usuario.
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB,
      mongoOptions,
    }),
    secret: process.env.SECRET_KEY,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 120000,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
);

//Inicializo passport para las sesiones de usuarios.
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

//Ejecuto el socket.io para el chat, y limpio los mensajes cada 24 horas.
chatConfig();
const delay = 1000 * 60 * 60 * 24; //Son 24 horas.
setInterval(deleteMessages, delay);

app.use(compression());

//Seteo el logger como middleware para todas las rutas
app.use((req, res, next) => {
  logger.info(`Route: ${req.url} - Method: ${req.method}`);
  next();
});

//Logica de seleccion de modo cluster o modo fork
if (mode == "cluster" && cluster.isPrimary) {
  os.cpus().map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died. Creating new one..`);
    cluster.fork();
  });
} else {
  app.use("/", rutas);

  httpServer.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}
