import os from "os";

const mainRoute = (req, res) => {
  let user = req.session.email;
  let username = user.name;
  console.log(`el user en mainRoute es: ${user}`);
  res.render("index.ejs", { username });
};

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("user logged");
    let username = req.user.username;
    console.log(username);
    return res.render("index.ejs", { username }); //modificar plantilla index para q muestre el mail
  } else {
    console.log("Endpoint getLogin. user not logged");
    res.render("login.ejs");
  }
};

const postLogin = (req, res) => {
  req.session.user = req.body.username;
  let username = req.user.username;
  res.render("index.ejs", { username });
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
  console.log(image);
  if (!image) {
    return res.json({ Error: "Please upload a profile picture" });
  }
  let name = req.body.name;
  res.render("index.ejs", { name, image });
};

const signupFail = (req, res) => {
  console.log("Endpoint signupFail. Error en signup");
  res.render("error-signup.ejs");
};

const getLogout = (req, res) => {
  console.log(`Entre a logout y el username es ${username}`);
  let username = req.user.username;
  req.logout();
  console.log(`Hice el req.logout()`);
  res.render("logout.ejs", { username });
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
