const router = require('express').Router();


//GET
router.get('/categories', (req, res) => res.render('categories'));


module.exports = router;