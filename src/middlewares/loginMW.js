const authCheck = (req, res, next) => {
  if (req.isAuthenticated() || req.session.user) {
    next;
  } else {
    return res.redirect("/login");
  }
};

export { authCheck };
