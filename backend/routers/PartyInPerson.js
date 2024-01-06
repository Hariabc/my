const express = require('express');
const Case = require("../models/partyinperson")
const router = express.Router();

const app = express();
app.use(express.json());

function generateUniqueCNR() {
  const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let caseNumber = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = crypto.randomInt(0, alphanumeric.length);
    caseNumber += alphanumeric.charAt(randomIndex);
  }

  return caseNumber;
}

router.post('/case', async (req, res) => {
  try {
    const { plaintiffDetails, defendantDetails, caseDetails, documents, paymentDetails } = req.body;

    // Assume courtName is retrieved from somewhere (e.g., user input, stored value, etc.)
    // const courtName = 'YourCourtName'; // Replace with your court name

    // Generate CNR number based on court name and date
    const cnrNumber = generateUniqueCNR();

    // Create a new Case document using the Case model and CNR number
    const newCase = new Case({
      plaintiffDetails,
      defendantDetails,
      caseDetails,
      documents,
      paymentDetails,
      caseNumber:cnrNumber, // Add CNR number to the Case document
    });

    // Save the new Case document to the database
    await newCase.save();

    // Send the CNR number in the response
    res.status(201).json({ message: 'Case details saved successfully', cnrNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error saving case details', error: error.message });
  }
});

module.exports = router;
