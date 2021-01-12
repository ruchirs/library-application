const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = Schema({
  
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  status: {
    type: String,  
    enum:['Available', 'Borrowed'], default:'Available'},
});

module.exports = mongoose.model("Book", bookSchema);
