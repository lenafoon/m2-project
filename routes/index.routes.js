const express = require('express');
const { categories } = require('../public/js/categories');
const { isLoggedIn, isLoggedOut } = require ('../middleware/route-guard.js')
const router = express.Router();
const Task = require('./../models/Task.model')

/* GET home page */
router.get("/", isLoggedIn, async (req, res, next) => {
   const categoriesArray = [...categories]

      const userId = req.session.currentUser._id
       
      const tasks = await Task.find({ userId: userId })



      // now we have all tasks, we should find a way to place them in the corresponding categories

      // Change the categories array to contain specific tasks
      categoriesArray.map(category => {

        // Filter the tasks array for each of the categories
        category.tasks = tasks.filter(task => {
          return task.category == category.name
        })
 
      })
      

      //  res.render("index");
       res.render("index", { categories: categoriesArray, userInSession: req.session.currentUser });

     })
 

module.exports = router;
