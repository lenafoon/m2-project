const router = require('express').Router();
const Task = require('../models/Task.model');

//GET
router.get('/tasks', (req, res) => res.render('tasks'));


//POST
router.post('/tasks', (req, res, next) => {
    const { title, description, dueDate, priority, category } = req.body;

    const task = new Task({
    title,
    description,
    dueDate,
    priority,
    category,
  });
    task
    .save()
    .then(() => {

      res.redirect('/tasks');
    })
    .catch((error) => {
      next(error); 
    });
});




module.exports = router;