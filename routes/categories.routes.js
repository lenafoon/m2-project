const router = require('express').Router();
const Task = require('./../models/Task.model')


//GET

router.get('/home', (req, res) => {

    Task.find({ category: "Home" }).then(tasks => {

        res.render('home', { tasks, amount: tasks.length })

    })

});

router.get('/personal', (req, res) => {
    Task.find({ category: "personal"})
    .then(tasks => {
      res.render('personal', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/work', (req, res) => {
    Task.find({ category: "work"})
    .then(tasks => {
      res.render('work', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/shopping', (req, res) => {
    Task.find({ category: "shopping"})
    .then(tasks => {
      res.render('shopping', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/health', (req, res) => {
    Task.find({ category: "health"})
    .then(tasks => {
      res.render('health', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/categories', (req, res) => {
    Task.find({ category: "categories"})
    .then(tasks => {
      res.render('categories', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});
router.get('/challenges', (req, res) => {
    Task.find({ category: "challenges"})
    .then(tasks => {
      res.render('challenges', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/education', (req, res) => {
    Task.find({ category: "education"})
    .then(tasks => {
      res.render('education', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/finances', (req, res) => {
    Task.find({ category: "finances"})
    .then(tasks => {
      res.render('finances', { tasks, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching tasks: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/spoons', (req, res) => {
  Task.find({ category: "spoons"})
  .then(tasks => {
    res.render('spoons', { tasks, isLoggedIn: true });
  })
  .catch(error => {
    console.error(`Error fetching tasks: ${error}`);
    res.status(500).send('Internal Server Error');
  });
});


module.exports = router;