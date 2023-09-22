const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge.model');
const decluttering = require('../challenges-json/decluttering-challenge.json')

// GET CHALLENGES
router.get('/challenges', async (req, res) => {
  try {
    const decluttering = await Challenge.find(); 
    res.render('challenges', { decluttering }); 
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
