const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // res.send('hello, commonJS module');
  res.render('index');
});

module.exports = router;
