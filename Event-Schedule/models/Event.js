// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  createdBy: { type: String, enum: ['Client', 'Advocate', 'CAO', 'Judge'] },
  visibleToOthers: Boolean,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
