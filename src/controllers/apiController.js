import os from "os";
import logger from "../logs/loggers.js";

const mainRoute = (req, res) => {
  let name = req.user.name;
  let imageUrl = req.user.imageUrl;
  return res.render("profile.ejs", { name, imageUrl });
};

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    let name = req.user.name;
    let imageUrl = req.user.imageUrl;
    return res.render("profile.ejs", { name, imageUrl });
  } else {
    logger.error("Endpoint getLogin. user not logged");
    res.render("login.ejs");
  }
};

const postLogin = (req, res) => {
  let name = req.user.name;
  let imageUrl = req.user.imageUrl;
  res.render("profile.ejs", { name, imageUrl });
};

const loginFail = (req, res) => {
  logger.error("Endpoint loginFail. Error en login");
  res.render("error-login.ejs");
};

const getSignup = (req, res) => {
  res.render("register.ejs");
};

const postSignup = async (req, res) => {
  const image = req.file;
  if (!image) {
    return res.json({ Error: "Please upload a profile picture" });
  }
  let name = req.body.name;
  let imageUrl = req.user.imageUrl;
  res.render("profile.ejs", { name, imageUrl });
};

const signupFail = (req, res) => {
  logger.error("Endpoint signupFail. Error en signup");
  res.render("error-signup.ejs");
};

const getLogout = (req, res) => {
  let name = req.user.name;
  req.logout((error) => {
    error
      ? logger.error("error en el req.logout")
      : res.render("logout.ejs", { name });
  });
};

const getInfo = (req, res) => {
  const props = {
    arguments: process.argv.slice(2),
    platform: process.platform,
    node: process.version,
    memory: process.memoryUsage(),
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
    cpus: os.cpus().length,
  };
  res.render("info.ejs", { props });
};

export {
  mainRoute,
  getLogin,
  postLogin,
  loginFail,
  getSignup,
  postSignup,
  signupFail,
  getLogout,
  getInfo,
};
