// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const authMiddleware = require('../middleware/clientAuthMiddleware');
// const authenticateToken = require('./clientAuthMiddleware');

// // Routes that require authentication
// router.use(authenticateToken);



// Get all events
router.get('/my-events' , authMiddleware, async (req, res) => {
  console.log('Request to /my-events received');
  try {
    const userId = req.user._id;

    const events = await Event.find({ user: userId });

    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});


// Create a new event
router.post('/create',authMiddleware,  async (req, res) => {
  try{
    const {title , description , date}  = req.body;
    const user = req.user._id;
  
  const event = new Event({
    title,
    description,
    date,
    user,
    
  });

  await event.save();
  res.status(201).json({event});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:"Server Error" });
  }
});


// Update an event
router.put('/update/:id', authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, date } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date },
      { new: true }
    );

    res.status(200).json({ event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});



// Delete an event
router.delete('/delete/:id',authMiddleware,  async (req, res) => {
  try {
    const eventId = req.params.id;

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
