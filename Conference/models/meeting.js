// models/meeting.js

const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});

const Meeting= mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
