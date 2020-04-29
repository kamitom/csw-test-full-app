const express = require('express');
const router = express.Router();

const fakerDep = require('../tools/persion')

router.get('/', (req, res) => {
  // res.send('hello, commonJS module');
  res.render('index3', {
    title: 'EJS template ' + fakerDep(200).dep,
    description: 'mongodb shell: db.inventory.find()',
  });
});

module.exports = router;
