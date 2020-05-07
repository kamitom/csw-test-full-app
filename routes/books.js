const express = require('express');
const router = express.Router();

const multer = require('multer');

const fakerDep = require('../tools/persion');
const Book = require('../model/book');
const Author = require('../model/author');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join('Public', Book.converImageBasePath);
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];
const upload = multer({
  dest: uploadPath,
});

// All Books Route
router.get('/', async (req, res) => {
  // res.send('All Books');

  res.render('books/index');
});

// New Book Route
router.get('/new', async (req, res) => {
  // res.send('New Book2');
  renderNewPage(res, new Book());

  // res.render('books/new', { book: new Book()})
});

// Create Book Route
router.post('/', upload.single('cover'), async (req, res) => {
  // res.send('Create Book');
  const fileName = req.file != null ? req.file.filename : null;

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description,
  });

  try {
    const newBook = await book.save();
    // res.redirect(`books/${newBook.id}`);
    res.redirect(`books`);
  } catch (error) {
    console.log('new book error: ', error);
    if (book.coverImageName != null) {
      removeBookCover(book.coverImageName);
    }
    renderNewPage(res, book, true);
  }
});

const removeBookCover = (fileName) => {
  console.log(`book cover file name is : ${fileName}`)
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    if (err) console.error(`remove book cover error: ${err}`);
  });
};

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

module.exports = router;
