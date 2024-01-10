// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
    console.log('Received POST request to /api/events');
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    createdBy: req.body.createdBy,
    visibleToOthers: req.body.visibleToOthers,
  });

  try {
    console.log('Attempting to save new event:', event);
    const newEvent = await event.save();
    console.log('Event saved successfully:', newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
