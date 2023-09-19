const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge.model');

// GET CHALLENGES
router.get('/challs', async (req, res) => {
  try {
    const challenges = await Challenge.find(); 
    res.render('challenges', { challenges }); 
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving challenges' });
  }
});

// POST NEW CHALLENGE
router.post('/challs', async (req, res) => {
  try {
    const newChallenge = new Challenge(req.body);
    const savedChallenge = await newChallenge.save();
    res.status(201).json(savedChallenge);
  } catch (error) {
    res.status(400).json({ error: 'Error creating challenge' });
  }
});

// Define routes for updating and deleting 

module.exports = router;
