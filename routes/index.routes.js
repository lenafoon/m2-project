const express = require('express');
const { categories } = require('../public/js/categories');
const router = express.Router();
const Task = require('./../models/Task.model')

/* GET home page */
router.get("/", (req, res, next) => {
  const categoriesArray=[...categories]
  categoriesArray.forEach(categories=>{
    Task.find({category: categories.name})
    .then(tasks=>{
      categories.length=tasks.length
      if (req.session.currentUser){
        categories.isLoggedIn  = true
      }
        else{
          categories.isLoggedIn = false
      }
    })
    .catch(error=>{
      console.log("error while finding task",error)
    })
  })

  res.render("index", { categories:categoriesArray});

});

module.exports = router;
