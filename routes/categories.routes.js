const router = require('express').Router();
const { categories } = require('../public/js/categories');
const Task = require('./../models/Task.model')


//GET


router.get('/categories/:category', (req, res) => {
  const metadata = categories.find(c => c.id === req.params.category)

  if (!metadata) {
    res.status(404).send("Not Found :-(");
    return
  }

  Task.find({ category: metadata.name})
  .then(tasks => {
    res.render('categoryView', { tasks, isLoggedIn: true, metadata ,userInSession: req.session.currentUser});
  })
  .catch(error => {
    console.error(`Error fetching tasks: ${error}`);
    res.status(500).send('Internal Server Error');
  });

})


router.get('/categories', (req, res) => {
    Task.find({ category: "categories"})
    .then(tasks => {
      res.render('categories', { tasks, isLoggedIn: true, categories,userInSession: req.session.currentUser });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});



router.get('/spoons', (req, res) => {
  Task.find({ category: "spoons"})
  .then(tasks => {
    res.render('spoons', { tasks, isLoggedIn: true,userInSession: req.session.currentUser });
  })
  .catch(error => {
    console.error(`Error fetching tasks: ${error}`);
    res.status(500).send('Internal Server Error');
  });
});


module.exports = router;