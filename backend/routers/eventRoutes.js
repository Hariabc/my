// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const authenticateToken = require('../middleware/adminAuthMiddleware');



// Get all events
router.get('/' , authenticateToken, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new event
router.post('/',authenticateToken,  async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    createdBy: req.user._id,
    
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ message: error.message });
  }
});


// Update an event
router.put('/:eventId', authenticateToken, async (req, res) => {
  const { eventId } = req.params;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        createdBy: req.user._id,
        
      },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete an event
router.delete('/:eventId',authenticateToken,  async (req, res) => {
  const { eventId } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
