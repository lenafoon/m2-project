const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge.model');
const { challenges } = require('../challenges-json');

// GET CHALLENGES
router.get('/challenges', async (req, res) => {
  try {
    const decluttering = await Challenge.find(); 
    res.render('challenges', { challenges,userInSession: req.session.currentUser}); 
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving challenges' });
  }
});


// GET CHALLENGE PAGE
router.get('/challenge/:challengeName', async (req, res) => {
  const { challengeName } = req.params;

  const challenge = challenges.find(challenge => challenge.name === challengeName);

  if (!challenge) {
    return res.status(404).json({ error: 'Challenge not found' });
  }

  res.render('challenge', { challenge, userInSession: req.session.currentUser });
});


module.exports = router;
