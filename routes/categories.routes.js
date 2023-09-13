const router = require('express').Router();


//GET
router.get('/categories', (req, res) => res.render('categories'));

router.get('/challenges', (req, res) => res.render('challenges'));

router.get('/health', (req, res) => res.render('health'));

router.get('/home', (req, res) => res.render('home'));

router.get('/personal', (req, res) => res.render('personal'));

router.get('/shopping', (req, res) => res.render('shopping'));

router.get('/work', (req, res) => res.render('work'));

module.exports = router;