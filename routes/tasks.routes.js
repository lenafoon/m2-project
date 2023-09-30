//tasks.routes.js

const express = require('express');
const router = require('express').Router();
const Task = require('../models/Task.model');

//GET

//TASK LIST
router.get('/tasks', (req, res) => {


  Task.find()
    .then(tasks => {
      res.render('tasks', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
  
});


//TASK CREATION FORM
router.get('/task', (req, res) => {
  res.render('task',);
});

// FORM SUBMISSION
router.post('/task', (req, res) => {
  const { title, description, dueDate, priority, category /*, checklist */ } = req.body;

  console.log(title, description, dueDate, priority, category)
  console.log(title)
  console.log(description)


  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    category,
    // checklist: checklist.map(item => ({ item })),
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


//TASK CREATION FORM
router.delete('/task/:taskId', (req, res) => {

  const { taskId } = req.params

    Task.findByIdAndDelete(taskId).then((removedElement) => {
      res.status(200).send()
    })

});


//PATCH


router.patch('/task/:taskId', (req, res) => {
  const { taskId } = req.params;

  console.log(taskId, req.body)
  Task.findByIdAndUpdate(taskId, req.body, { new: true })
      .then(updatedTask => {
          if (!updatedTask) {
              return res.status(404).json({ message: 'Task not found.' });
          }
          res.json(updatedTask);
      })
      .catch(error => {
          console.error(`Error updating task: ${error}`);
          res.status(500).json({ message: 'Internal Server Error' });
      });
});



module.exports = router;