const express = require('express');
const { categories } = require('../public/js/categories');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { isLoggedIn: true , categories});
});

module.exports = router;
