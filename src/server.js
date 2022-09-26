import express from "express";
import session from "express-session";
import rutas from "./routes/routes.js";
import productsRoutes from "./routes/productos.js";
import cartsRoutes from "./routes/carritos.js";
import { User } from "../models/userModel.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cluster from "cluster";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import compression from "compression";
import MongoStore from "connect-mongo";
import config from "./cliConfig.js";

const app = express();
const port = config.port;
const mode = config.mode;
const __dirname = dirname(fileURLToPath(import.meta.url));

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
      maxAge: 20000,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
);

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
  { passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return done(null, null);
      }
      console.log(req.body.profilePic);

      const newUser = {
        email,
        password: encriptPw(password),
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.phone,
        imageUrl: req.body.profilePic,
      };
      const createdUser = await User.create(newUser);

      done(null, createdUser);
    } catch (error) {
      console.log(`Sign Up error. Info: ${error}`);
      done("Error en el registro", null); //En vez del error, debería poner "null" y hacer un failRedirect('/failsignup')
    }
  }
);
// FIN REGISTER STRATEGY

// GENERO LA LOGIN STRATEGY
const loginStrategy = new LocalStrategy(async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !verifyPw(password, user.password)) {
      return done(null, null);
    }

    done(null, user);
  } catch (error) {
    console.log(`Log In error. Info: ${error}`);
    done("Error en el login", null); //En vez del error, debería poner "null" y hacer un failRedirect('/faillogin')
  }
});
// FIN LOGIN STRATEGY

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

app.use("*", compression());

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
  app.use("/api/productos", productsRoutes);
  app.use("/api/carrito", cartsRoutes);
  app.get("*", (req, res) => {
    console.log("Ruta no establecida");
    res.render("error-route.ejs");
  });

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}
