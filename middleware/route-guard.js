const isAuthenticated=(req, res, next) => {
  res.locals.isAuthenticated = !!req.session.currentUser;
  next();
};

//ISLOGGEDIN
const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/login');
  }
    next();
};


//ISLOGGEDOUT
const isLoggedOut = (req, res, next) => {

  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAuthenticated
};