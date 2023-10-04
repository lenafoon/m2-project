const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pageNumber: {
    type: Number,
  },
  dateStarted: {
    type: Date,
  },
  dateFinished: {
    type: Date,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5, 
  },
  comments: [{
    type: String,
  }],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
