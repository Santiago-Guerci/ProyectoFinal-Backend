import { Router } from "express";
import {
  mainRoute,
  getLogin,
  postLogin,
  loginFail,
  getSignup,
  postSignup,
  signupFail,
  getLogout,
  getInfo,
} from "../controllers/apiController.js";
import { authCheck } from "../middlewares/loginMW.js";
import passport from "passport";
import multer from "multer";

//VER SI PUEDO MOVER EL STORAGE DE MULTER A OTRO ARCHIVO
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
//FIN MULTER

const router = Router();

router.get("/", authCheck, mainRoute);
router.get("/login", getLogin);
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  postLogin
);
router.get("/faillogin", loginFail);
router.get("/register", getSignup);
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  upload.single("profilePic"),
  postSignup
);
router.get("/failsignup", signupFail);
router.get("/logout", authCheck, getLogout);
router.get("/info", getInfo);

export default router;
