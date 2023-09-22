const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge.model');
const { challenges } = require('../challenges-json');

// GET CHALLENGES
router.get('/', async (req, res) => {
  try {
    const decluttering = await Challenge.find(); 
    res.render('challenges', { decluttering, challenges}); 
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving challenges' });
  }
});



module.exports = router;
