const mongooes = require('mongoose');
const path = require('path');

const converImageBasePath = 'uploads/bookCovers';

const bookSchema = new mongooes.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImageName: {
    type: String,
    required: true,
  },
  author: {
    type: mongooes.Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
});

bookSchema.virtual('coverImagePath').get(function () {
  if (this.coverImageName != null) {
    return path.join('/', converImageBasePath, this.coverImageName);
  }
});

module.exports = mongooes.model('Book', bookSchema);
module.exports.converImageBasePath = converImageBasePath;
