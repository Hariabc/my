const express = require('express');
const  Court= require('../models/court');
const router = express.Router();

// Create a new court
router.post('/register', async (req, res) => {
  const { state,district,name  } = req.body;

  try {
    const newCourt = new Court({
      name,
        state,
      district
    });

    await newCourt.save();

    res.status(201).json({
      message: 'Court created successfully',
      court: newCourt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

module.exports = router;