const mongoose = require('mongoose');
const express = require('express');
const Case = require('../models/partyinperson'); 
const router = express.Router();
router.use(express.json());
const User = require("../models/client")
const Court = require('../models/court')
const CourtAdmin=require('../models/cao')

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

// router.post('/case', async (req, res) => {
//   try {
//     const { plaintiffDetails, defendantDetails, caseDetails, documents, paymentDetails,id  } = req.body;
//       const newCase = new Case({
//       caseNumber: generateCaseNumber(), 
//       plaintiffDetails,
//       defendantDetails,
//       caseDetails,
//       documents,
//       paymentDetails,
//     });

//     await newCase.save();

//     const user = await User.findById(id); // Assuming userId is passed in the request body
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.cases.push(newCase._id); 
//     await user.save(); 

//     res.status(201).json({ message: 'Case details saved successfully', caseNumber: newCase.caseNumber });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving case details', error: error.message });
//   }
// });


router.post('/case', async (req, res) => {
  // console.log(req.body.caseDetails.courtName)

  try {
    const { plaintiffDetails, defendantDetails, caseDetails, documents, paymentDetails,id } = req.body;

    const courtName=req.body.caseDetails.courtName; // Assuming courtName and userId are present in caseDetails

    const court = await Court.findOne({ name: courtName });
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    const newCase = new Case({
            caseNumber: generateCaseNumber(), 
            plaintiffDetails,
            defendantDetails,
            caseDetails,
            documents,
            paymentDetails,
          });
    await newCase.save();

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cases.push(newCase._id);
    await user.save();

    const courtAdmin = await CourtAdmin.findOne({ court: court._id });
    if (!courtAdmin) {
      return res.status(404).json({ message: 'Court admin not found' });
    }

    courtAdmin.courtCases.push(newCase._id);
    await courtAdmin.save();

    res.status(201).json({ message: 'Case details saved successfully', caseNumber: newCase.caseNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error saving case details', error: error.message });
  }
});



module.exports = router;
