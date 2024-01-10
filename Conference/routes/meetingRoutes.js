// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

const Meeting = require('../models/meeting');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Meeting.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
    console.log('Received POST request to /api/events');
  const meeting = new Meeting({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  });

  try {
    console.log('Attempting to save new conference:', meeting);
    const newMeeting = await meeting.save();
    console.log('Conference saved successfully:', newMeeting);
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error('Error creating conference:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
