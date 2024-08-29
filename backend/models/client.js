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
    type: Number,
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
    type: Number,
    required: true,
    unique: true
  },
  cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase'
  }],

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  password_token: {
    type: String
  },
  role: {
    type: String,
    default:"client"
  },

  scheduledConferences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JudgeConference',
  }],

}, { timestamps: true });

// Create a model based on the schema
module.exports= mongoose.model('User', clientSchema);