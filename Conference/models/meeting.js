// models/meeting.js

const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  meetingID: String, // Added meetingID field
});

module.exports = mongoose.model('Meeting', meetingSchema);
