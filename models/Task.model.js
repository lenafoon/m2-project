const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }, 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  category: {
    type: String,
    enum: ['Personal', 'Health', 'Work', 'Home', 'Shopping', 'Education', 'Finances', 'Spoons', 'Challenges'],
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
