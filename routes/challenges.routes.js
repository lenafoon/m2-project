const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge.model');
const { challenges } = require('../challenges-json');

// GET CHALLENGES
router.get('/challenges', async (req, res) => {
  try {
    const decluttering = await Challenge.find(); 
    res.render('challenges', { decluttering, challenges,userInSession: req.session.currentUser}); 
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving challenges' });
  }
});


// GET all decluttering challenge tasks
router.get('/challenges/decluttering', async (req, res) => {
  try {
    res.render('challenge', { decluttering,userInSession: req.session.currentUser });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving challenge tasks' });
  }
});


module.exports = router;
