const express = require('express');
const { categories } = require('../public/js/categories');
const router = express.Router();
const Task = require('./../models/Task.model')
const categoriesArray=[...categories]

/* GET home page */
router.get("/", (req, res, next) => {
  categoriesArray.forEach(categories=>{
    Task.find({category: categories.name})
    .then(tasks=>{
      categories.length=tasks.length
    })
    .catch(error=>{
      console.log("error while finding task",error)
    })
  })

  console.log(categoriesArray)
  res.render("index", { isLoggedIn: true , categories:categoriesArray});




});

module.exports = router;