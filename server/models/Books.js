var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  rating: { type: Number, min: 1, max: 5, default: 1 },
  status: Boolean,
  date: { type: Date, default: Date.now },
  file: String
});

mongoose.model('Book', BookSchema);

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;