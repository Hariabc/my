// routes/meetingRoutes.js
const express = require('express');
const router = express.Router();
const Meeting = require('../models/meeting');

// Create a meeting
router.post('/schedule-meeting', async (req, res) => {
  try {
    const newMeeting = await Meeting.create(req.body);
    res.json(newMeeting);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all meetings
router.get('/get-meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Cancel Meeting
router.delete('/cancel-meeting/:meetingId', async (req, res) => {
  try {
    // Get the meeting ID from the request parameters
    const { meetingId } = req.params;

    // Perform the cancellation logic in your database
    // Adjust this based on your database model
    const canceledMeeting = await Meeting.findOneAndDelete({ _id: meetingId });

    if (!canceledMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.json({ success: true, canceledMeeting });
  } catch (error) {
    console.error('Error canceling meeting:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



 
 

module.exports = router;
