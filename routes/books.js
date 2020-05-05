const express = require('express');
const router = express.Router();

const multer = require('multer');

const fakerDep = require('../tools/persion');
const Book = require('../model/book');
const Author = require('../model/author');

// All Books Route
router.get('/', async (req, res) => {
  // res.send('All Books');

  res.render('books/index');
});

// New Book Route
router.get('/new', async (req, res) => {
  // res.send('New Book2');

  try {
    const authorsFound = await Author.find({});
    const aNewBook = new Book();
    res.render('books/new', {
      allAuthors: authorsFound,
      theBook: aNewBook,
    });
  } catch (error) {
    res.redirect('books');
  }

  // res.render('books/new', { book: new Book()})
});

// Create Book Route
router.post('/', async (req, res) => {
  // res.send('Create Book');

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pateCount: req.body.pageCount,
    description: req.body.description,
  });
});

module.exports = router;
