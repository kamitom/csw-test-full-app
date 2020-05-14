const mongooes = require('mongoose');
const Book = require('./book')

const authorSchema = new mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
});

authorSchema.pre('remove', function(next) {
  Book.find({ author: this.id}, (err, books) => {
    if (err) {
      next(err)
    } else if (books.length > 0) {
      next(new Error('this author has books still'))
    } else {
      next()
    }
  })
})

module.exports = mongooes.model('Author', authorSchema);
