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
import upload from "../multer.js";

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
  upload.single("profilePic"),
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  postSignup
);
router.get("/failsignup", signupFail);
router.get("/logout", authCheck, getLogout);
router.get("/info", getInfo);

export default router;
