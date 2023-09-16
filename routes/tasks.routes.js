const router = require('express').Router();
const Task = require('../models/Task.model');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/m2-project')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));




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
  .then(newTask => {
    console.log(`A new task is created: ${newTask}!`);
    res.redirect('/tasks');
  })
  .catch(error => {
    console.error(`Error while creating a new task: ${error}`);
    next(error);
  });
});

//GET TASKS BY CATEGORY


// POST NEW TASK
router.post('/tasks', (req, res, next) => {
  const { title, description, dueDate, priority, category, checklistItems } = req.body;

  Task.create({
    title,
    description,
    dueDate,
    priority,
    category,
    checklistItems,
  })
  .then((newTask) => {
    console.log(`A new task is created: ${newTask}!`);
    res.status(201).json(newTask); 
  })
  .catch((error) => {
    console.error(`Error while creating a new task: ${error}`);
    next(error);
  });
});
module.exports = router;