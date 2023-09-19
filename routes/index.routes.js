const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {

  // We need access to the User, the 
  res.render("index", { isLoggedIn: true });

});

module.exports = router;
