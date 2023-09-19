const router = require('express').Router();
const Task = require('./../models/Task.model')


//GET
router.get('/categories', (req, res) => res.render('categories'));

router.get('/challenges', (req, res) => res.render('challenges'));

router.get('/health', (req, res) => res.render('health'));

router.get('/home', (req, res) => {

    Task.find({ category: "Home" }).then(tasks => {

        res.render('home', { tasks, amount: tasks.length })

    })

});

router.get('/personal', (req, res) => res.render('personal'));

router.get('/shopping', (req, res) => res.render('shopping'));

router.get('/work', (req, res) => res.render('work'));

router.get('/education', (req, res) => res.render('education'));

router.get('/finances', (req, res) => res.render('finances'));


module.exports = router;