const mongooes = require('mongoose');

const authorSchema = new mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongooes.model('Author', authorSchema);
