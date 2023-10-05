const router = require('express').Router();
const { categories } = require('../public/js/categories');
const Task = require('./../models/Task.model')
const {
  isLoggedIn,
  isLoggedOut
} = require('../middleware/route-guard')

//GET


router.get('/categories/:category', isLoggedIn,(req, res) => {
  const metadata = categories.find(c => c.id === req.params.category)

  if (!metadata) {
    res.status(404).send("Not Found :-(");
    return
  }
  const userId = req.session.currentUser._id

  Task.find({$and: [{ category: metadata.name}, {userId: userId }]})
  .then(tasks => {
    res.render('categoryView', { tasks, isLoggedIn: true, metadata });
  })
  .catch(error => {
    console.error(`Error fetching tasks: ${error}`);
    res.status(500).send('Internal Server Error');
  });

})


router.get('/categories', isLoggedIn, (req, res) => {
    Task.find({ category: "categories"})
    .then(tasks => {
      res.render('categories', { tasks, isLoggedIn: true, categories });
    })
    .catch(error => {
      console.error(`Error fetching categories: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});





module.exports = router;