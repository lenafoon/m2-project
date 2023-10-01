const express = require('express');
const { categories } = require('../public/js/categories');
const router = express.Router();
const Task = require('./../models/Task.model')

/* GET home page */
router.get("/", async (req, res, next) => {
   const categoriesArray = [...categories]

    await Promise.all(categoriesArray.map(async (category, i) => {
     await Task.find({ category: category.name })
        .then(tasks => {
          // console.log(category.name, tasks)
          category.tasks = tasks
        })
        .catch(error => {
          console.log("error while finding task", error)
        })
    }))

      //  res.render("index");
       res.render("index", { categories: categoriesArray, userInSession: req.session.currentUser });

     }
 );

module.exports = router;
