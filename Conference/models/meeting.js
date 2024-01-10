// models/meeting.js

const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  meetingID: String,
});

const Meeting= mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
