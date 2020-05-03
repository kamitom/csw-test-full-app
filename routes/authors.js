const express = require('express');
const router = express.Router();

const fakerDep = require('../tools/persion');
const Author = require('../model/author');

// all authors route
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name3 != null && req.query.name3 !== '') {
    searchOptions.name = new RegExp(req.query.name3, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('authors/index', { authors2: authors, searchOptions2: req.query });
  } catch (error) {
    console.log(`error: ${error}`);
    res.redirect(`/`);
  }
});

// new author route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// create author route
router.post('/', async (req, res) => {
  const oneNewAuthor = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await oneNewAuthor.save();
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch (error) {
    res.render('authors/new', {
      author: oneNewAuthor,
      errorMessage: 'error on create new author test',
    });
  }
});

module.exports = router;
