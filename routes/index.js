const express = require('express');
const router = express.Router();
const Book = require('../model/book');

const fakerDep = require('../tools/persion');

router.get('/', async (req, res) => {
  let books;
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec();

  } catch (error) {
    books = [];
    console.error('find books error:', error);
  }
  res.render('index3', { books2: books });
});

module.exports = router;
