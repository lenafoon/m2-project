const express = require('express');
const router = express.Router();



router.get('/books', async (req, res) => {
  try { 
    res.render('books'); 
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving books' });
  }
});


module.exports = router;