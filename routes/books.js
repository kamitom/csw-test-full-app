const express = require('express');
const router = express.Router();

const fakerDep = require('../tools/persion');
const Book = require('../model/book');

// All Books Route
router.get('/', async (req, res) => {
  res.send('All Books');
});

// New Book Route
router.get('/new', (req, res) => {
  res.send('New Book2');
});

// Create Book Route
router.post('/', async (req, res) => {
  res.send('Create Book');
});

module.exports = router;
