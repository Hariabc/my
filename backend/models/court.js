const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Court', courtSchema);