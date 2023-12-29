// models/Meeting.js
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  caseNumber: { type: String, required: true },
  meetingId: { type: String, unique: true },
  // Add more fields as needed

   // New fields for video conferencing
   
  
   // Add more fields as needed
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;