const express = require('express');
const router = express.Router();

const fakerDep = require('../tools/persion');
const Author = require('../model/author');

// all authors route
router.get('/', (req, res) => {
  res.render('authors/index');
});

// new author route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// create author route
router.post('/', (req, res) => {
  res.send('Create');
});

module.exports = router;
