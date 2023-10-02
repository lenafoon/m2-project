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
  genre: {
    type: String,
  },
  pageNumber: {
    type: Number,
  },
  source: {
    type: String,
  },
  dateStarted: {
    type: Date,
  },
  dateFinished: {
    type: Date,
  },
  rating: {
    type: String,
    enum: ['★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'],
    default: '★★★☆☆', 
  },
  comments: [{
    type: String,
  }],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
