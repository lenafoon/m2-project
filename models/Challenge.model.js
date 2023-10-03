const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }, 
  category: {
    type: String,
    required: true,
  },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;

// one minor change
