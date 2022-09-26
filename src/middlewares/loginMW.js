const authCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    next;
  } else {
    return res.redirect("/login");
  }
};

export { authCheck };
