import express from "express";
import session from "express-session";
import rutas from "./routes/routes.js";
import { User } from "./models/user.model.js";
import { CartDao } from "./daos/index.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cluster from "cluster";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import compression from "compression";
import MongoStore from "connect-mongo";
import config from "./config/cliConfig.js";
import sendMail from "./config/nodemailerConfig.js";
import logger from "./logs/loggers.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = config.port;
const mode = config.mode;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/public", express.static(path.join(__dirname, "../public")));
app.set("views", path.join(__dirname, "../public/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use((req, res, next) => {
  logger.info(`Route: ${req.url} - Method: ${req.method}`);
  next();
});
app.use(passport.initialize());
app.use(passport.session());

// FUNCIONES PARA ENCRIPTAR Y CHEQUEAR PASSWORD. DEBERÍAN IR EN LOS CONTROLADORES O EN LAS RUTAS ?
function encriptPw(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function verifyPw(realPw, encriptedPw) {
  return bcrypt.compareSync(realPw, encriptedPw);
}
// FIN FUNCIONES DE ENCRIPTADO.

// GENERO LA REGISTER STRATEGY
const registerStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    let { email, name, address, age, phone } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return done(null, null);
      }

      let newCart = await CartDao.createCart();

      const newUser = {
        email,
        password: encriptPw(password),
        name,
        address,
        age,
        phone,
        imageUrl: `${req.protocol}://${req.get(
          "host"
        )}/public/uploads/avatar-${email}.jpg`,
        role: "user",
        cartId: newCart,
      };

      const createdUser = await User.create(newUser);
      req.session.user = {
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        age: newUser.age,
        imageUrl: newUser.imageUrl,
        phone: newUser.phone,
        role: newUser.role,
        cartId: newUser.cartId,
      };

      const html = `
                <h1>NEW REGISTERED USER</h1>
                <div>
                    <h2>USER DATA</h2>
                    <p>e-mail: ${email}</p>
                    <p>name: ${name}</p>
                    <p>address: ${address}</p>
                    <p>age: ${age}</p>
                    <p>phone: ${phone}</p>
                </div>
            `;

      await sendMail(process.env.ADMIN_MAIL, "New user", html);
      done(null, createdUser);
    } catch (error) {
      logger.error(`Sign Up error. Info: ${error}`);
      done("Error en el registro", null);
    }
  }
);
// FIN REGISTER STRATEGY

// GENERO LA LOGIN STRATEGY
const loginStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    let { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !verifyPw(password, user.password)) {
        return done(null, null);
      }

      done(null, user);
    } catch (error) {
      logger.error(`Log In error. Info: ${error}`);
      done("Error en el login", null);
    }
  }
);
// FIN LOGIN STRATEGY

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

app.use(compression());

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

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}
