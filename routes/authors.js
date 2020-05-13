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
    res.render('authors/index', {
      authors2: authors,
      searchOptions2: req.query,
    });
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
    res.redirect(`authors/${newAuthor.id}`);
    // res.redirect(`authors`);
  } catch (error) {
    res.render('authors/new', {
      author: oneNewAuthor,
      errorMessage: 'error on create new author test',
    });
  }
});

router.get('/:id', (req, res) => {
  res.send(`show Author2 ${req.params.id}`);
});
router.get('/:id/edit', async (req, res) => {
  // res.send(`Edit Author ${req.params.id}`)

  try {
    const authorById = await Author.findById(req.params.id);
    res.render('authors/edit', { author: authorById });
  } catch (error) {
    res.redirect('/authors');
  }
});
router.put('/:id', async (req, res) => {
  // res.send(`Update Author2 ${req.params.id}`)

  let oneNewAuthor;

  try {
    oneNewAuthor = await Author.findById(req.params.id);
    oneNewAuthor.name = req.body.name
    await oneNewAuthor.save();
    res.redirect(`/authors/${newAuthor.id}`);
  } catch (error) {
    if (oneNewAuthor == null) {
      res.redirect('/');
    } else {
      res.render('authors/edit', {
        author: oneNewAuthor,
        errorMessage: 'error updating Author',
      });
    }
  }
});
router.delete('/:id', async (req, res) => {
  // res.send(`Delete Author ${req.params.id}`);

  let oneNewAuthor;

  try {
    oneNewAuthor = await Author.findById(req.params.id);
    
    await oneNewAuthor.remove();

    res.redirect(`/authors/`);
  } catch (error) {
    if (oneNewAuthor == null) {
      res.redirect('/');
    } else {
      res.render(`/authors/${oneNewAuthor.id}`);
    }
  }
});

module.exports = router;
