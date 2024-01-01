// meetingRoutes.js

const express = require('express');
const router = express.Router();
const Meeting = require('../models/meeting');

// Get all meetings
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Schedule a new meeting
router.post('/', async (req, res) => {
  const meeting = new Meeting({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
  });

  try {
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a meeting
router.patch('/:id', async (req, res) => {
  // Implement update logic here
});

// Delete a meeting
router.delete('/:id', async (req, res) => {
  // Implement delete logic here
});

module.exports = router;
