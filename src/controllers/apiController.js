import os from "os";

const mainRoute = (req, res) => {
  let name = req.user.name;
  let imageUrl = req.user.imageUrl;
  return res.render("profile.ejs", { name, imageUrl });
};

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("user logged");
    let name = req.user.name;
    let imageUrl = req.user.imageUrl;
    return res.render("profile.ejs", { name, imageUrl });
  } else {
    console.log("Endpoint getLogin. user not logged");
    res.render("login.ejs");
  }
};

const postLogin = (req, res) => {
  console.log("Se ejecutó post login");
  let name = req.user.name;
  let imageUrl = req.user.imageUrl;
  console.log(req.user.imageUrl);
  res.render("profile.ejs", { name, imageUrl });
};

const loginFail = (req, res) => {
  console.log("Endpoint loginFail. Error en login");
  res.render("error-login.ejs");
};

const getSignup = (req, res) => {
  console.log("Estoy en signup");
  res.render("register.ejs");
};

const postSignup = async (req, res) => {
  console.log("Se ejecutó post signup");
  const image = req.file;
  if (!image) {
    return res.json({ Error: "Please upload a profile picture" });
  }
  let name = req.body.name;
  let imageUrl = req.user.imageUrl;
  res.render("profile.ejs", { name, imageUrl });
};

const signupFail = (req, res) => {
  console.log("Endpoint signupFail. Error en signup");
  res.render("error-signup.ejs");
};

const getLogout = (req, res) => {
  let name = req.user.name;
  console.log(`Entre a logout y el nombre es ${name}`);
  req.logout((error) => {
    error
      ? res.json("error en el req.logout")
      : res.render("logout.ejs", { name });
  });
};

const getInfo = (req, res) => {
  console.log("Entre a getInfo");
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
  console.log(props);
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
