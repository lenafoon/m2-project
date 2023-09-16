const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: String,
  dueDate: Date,
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;