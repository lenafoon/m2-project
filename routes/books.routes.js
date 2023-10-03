const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model');

// ADD NEW BOOK
router.post('/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET BOOKS PAGE
router.get('/books', async (req, res) => {
  try {
    res.render('books');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE BOOK
router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE BOOK
router.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// UPDATE READING PROGRESS
router.put('/books/:id/progress', async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { progress }, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE PAGE NUMBER
router.put('/books/:id/page', async (req, res) => {
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
router.put('/books/:id/comments', async (req, res) => {
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
router.put('/books/:id/rating', async (req, res) => {
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
