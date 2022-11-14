import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.model.js";
import { cartService } from "../services/cart.service.js";
import { encriptPw, verifyPw } from "./bcrypt.config.js";
import logger from "./logger.config.js";
import dotenv from "dotenv";
import sendMail from "./nodemailer.config.js";
dotenv.config();

// GENERO LA REGISTER STRATEGY
const registerStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: "email" },
  async (req, username, password, done) => {
    let { email, name, address, age, phone, repeatPassword } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return done(null, null);
      }

      if(password !== repeatPassword) {
        return done("Las contraseñas no coinciden", null);
      }

      let newCart = await cartService.createCart();

      const newUser = {
        email,
        password: encriptPw(password),
        name,
        address,
        age,
        phone,
        imageUrl: `${req.protocol}://${req.get("host")}/public/uploads/avatar-${email}.jpg`,
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

const passportConfig = () => {
  passport.use("register", registerStrategy);
  passport.use("login", loginStrategy);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });
};

export default passportConfig;
