module.exports = function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated() && req.session.passport.user.access === true) {
    return next();
  }
  req.session.ErrorMessage = `you current don't have access to that page`;

  // if they aren't redirect them to the home page
  res.redirect("/dashboard");
};
