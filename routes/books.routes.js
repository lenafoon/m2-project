const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model');


//BOOK LIST
router.get('/books', (req, res) => {


  Book.find()
    .then(books => {
      res.render('books', { books, isLoggedIn: true });
    })
    .catch(error => {
      console.error(`Error fetching books: ${error}`);
      res.status(500).send('Internal Server Error');
    });
  
});


//ADD NEW BOOK
router.post('/books', (req, res) => {
  const { title, author, pageNumber, dateStarted, dateFinished, rating, comments } = req.body;

  if (!req.session.currentUser || !req.session.currentUser._id) {
    return res.status(401).send('User not authenticated');
  }

  const userId = req.session.currentUser._id

  const books = new Book({
    userId,
    title, 
    author, 
    pageNumber, 
    dateStarted, 
    dateFinished, 
    rating, 
    comments,
  });

  books
    .save()
    .then(newBook => {
      console.log(`A new book is created: ${newBook.title}.`);
      res.redirect('/books');
    })
    .catch(error => {
      console.error(`Error while creating a new book: ${error}`);
      res.status(500).send('Internal Server Error');
    });
});


//PATCH
router.patch('/books/:bookId', (req, res) => {
  const { bookId } = req.params;

  console.log(bookId, req.body)
  Book.findByIdAndUpdate(bookId, req.body, { new: true })
      .then(updatedBook => {
          if (!updatedBook) {
              return res.status(404).json({ message: 'Book not found.' });
          }
          res.json(updatedBook);
      })
      .catch(error => {
          console.error(`Error updating book: ${error}`);
          res.status(500).json({ message: 'Internal Server Error' });
      });
});


// DELETE BOOK
router.delete('/books/:bookId', async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.bookId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// UPDATE PAGE NUMBER
router.put('/books/:bookId/page', async (req, res) => {
  try {
    const { id } = req.params;
    const { pageNumber } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { pageNumber }, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ADD COMMENT
router.put('/books/:bookId/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE RATING
router.put('/books/:bookId/rating', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { rating }, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
