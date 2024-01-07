const mongoose = require('mongoose');
const express = require('express');
const Case = require('../models/PartyInPerson'); 
const router = express.Router();
router.use(express.json());
const User= require("../models/client")

function generateCaseNumber() {
  const timestamp = Date.now().toString(); // Current timestamp
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Alphanumeric characters
  let caseNumber = timestamp; // Initialize with timestamp

  // Append random alphanumeric characters until the case number length reaches 16
  while (caseNumber.length < 16) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
    caseNumber += alphanumeric.charAt(randomIndex);
  }

  return caseNumber.slice(0, 16); // Return only the first 16 characters
}

router.post('/case', async (req, res) => {
  try {
    const { plaintiffDetails, defendantDetails, caseDetails, documents, paymentDetails,id  } = req.body;
      const newCase = new Case({
      caseNumber: generateCaseNumber(), 
      plaintiffDetails,
      defendantDetails,
      caseDetails,
      documents,
      paymentDetails,
    });

    await newCase.save();

    const user = await User.findById(id); // Assuming userId is passed in the request body
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cases.push(newCase._id); // Add the new case ID to the user's 'cases' array
    await user.save(); // Save the updated user with the new case

    res.status(201).json({ message: 'Case details saved successfully', caseNumber: newCase.caseNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error saving case details', error: error.message });
  }
});




module.exports = router;
