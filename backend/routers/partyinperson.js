const express = require('express');
const router = express.Router();
const CaseDetails = require('../models/partyinperson'); // Import the CaseDetails model

// Route to handle storing case details
router.post('/case', async (req, res) => {
  try {
    const {
      plaintiff,
      defendant,
      CaseDetails,
      documents,
      paymentDetails
    } = req.body; // Assuming you receive these fields from the frontend

    // Create a new instance of CaseDetails model with received data
    const newCase = new CaseDetails({
      plaintiff,
      defendant,
      CaseDetails,
      documents,
      paymentDetails
    });

    // Save the new case details to the database
    const savedCase = await newCase.save();

    res.status(201).json({ success: true, data: savedCase });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Other routes for getting, updating, deleting case details, etc.

module.exports = router;
