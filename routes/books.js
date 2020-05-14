const express = require('express');
const router = express.Router();

const fakerDep = require('../tools/persion');
const Book = require('../model/book');
const Author = require('../model/author');

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find({}).sort({ createdAt: 'desc' }).limit(5);

  if (req.query.title != null && req.query.title !== '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore !== '') {
    query = query.lte('publishDate', req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter !== '') {
    query = query.gte('publishDate', req.query.publishedAfter);
  }

  try {
    const books = await query.exec();
    res.render('books/index', { books2: books, searchOptions2: req.query });
  } catch (error) {
    console.log(`error: ${error}`);
    res.redirect(`/`);
  }
});

// New Book Route
router.get('/new', async (req, res) => {
  // res.send('New Book2');
  renderNewPage(res, new Book());

  // res.render('books/new', { book: new Book()})
});

// Create Book Route
router.post('/', async (req, res) => {
  // res.send('Create Book');

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
  });
  // console.log('book check: ', book);
  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    // res.redirect(`books/${newBook.id}`);
    res.redirect(`books`);
  } catch (error) {
    console.log('new a book Error2: ', error);

    renderNewPage(res, book, true);
  }
});

const renderNewPage = async (res, book, hasError = false) => {
  try {
    const authorsFound = await Author.find({});
    const params = {
      allAuthors: authorsFound,
      theBook: book,
    };
    if (hasError) params.errorMessage = 'Error Creating New Book';
    res.render('books/new', params);
  } catch (error) {
    res.redirect('/books');
  }
};

const saveCover = (book, coverEncoded) => {
  if (coverEncoded == null) return;
  if (coverEncoded == '') return;

  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64');
    book.coverImageType = cover.type;
  }
};

module.exports = router;
