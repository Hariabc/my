
const mongoose = require('mongoose');
// User Schema
const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  address: {
    type: String,
    required: true
  },
  adhar: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  temp_token: {
    type: String
  },
  role: {
    type: String,
    default:"client"
  }

});

// Create a model based on the schema
const User = mongoose.model('User', clientSchema);

module.exports = User;
