const express = require('express');
const router = require('express').Router();
const Task = require('../models/Task.model');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/m2-project')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));




//GET
//router.get('/tasks', (req, res) => res.render('tasks'));

//TASK LIST
router.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => {
      res.render('tasks', { tasks });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});


//TASK CREATION FORM
router.get('/create-task', (req, res) => {
  res.render('create-task');
});

// FORM SUBMISSION
router.post('/create-task', (req, res) => {
  const { title, description, dueDate, priority, category, checklist } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    category,
    checklist: checklist.map(item => ({ item })),
  });

  task
    .save()
    .then(newTask => {
      console.log(`A new task is created: ${newTask.title}.`);
      res.redirect('/tasks');
    })
    .catch(error => {
      console.error(`Error while creating a new task: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});


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




module.exports = router;