const express = require('express');
const router = express.Router();
const JudgeConference = require('../models/meeting');

// Get all conferences
router.get('/conferences', async (req, res) => {
  try {
    const conferences = await JudgeConference.find();
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific conference
router.get('/conferences/:id', getConference, (req, res) => {
  res.json(res.conference);
});

// Create a conference
router.post('/conferences', async (req, res) => {
  const conference = new JudgeConference({
    caseNumber: req.body.caseNumber,
    plaintiffName: req.body.plaintiffName,
    defendantName: req.body.defendantName,
    advocateName: req.body.advocateName,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    meetingID: req.body.meetingID,
  });

  try {
    const newConference = await conference.save();
    res.status(201).json(newConference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a conference
router.put('/conferences/:id', getConference, async (req, res) => {
  if (req.body.title != null) {
    res.conference.title = req.body.title;
  }
  if (req.body.description != null) {
    res.conference.description = req.body.description;
  }
  if (req.body.date != null) {
    res.conference.date = req.body.date;
  }

  try {
    const updatedConference = await res.conference.save();
    res.json(updatedConference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a conference
router.delete('/conferences/:id', getConference, async (req, res) => {
  try {
    await res.conference.remove();
    res.json({ message: 'Conference deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a conference by ID
async function getConference(req, res, next) {
  let conference;
  try {
    conference = await JudgeConference.findById(req.params.id);
    if (conference == null) {
      return res.status(404).json({ message: 'Conference not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.conference = conference;
  next();
}

module.exports = router;
