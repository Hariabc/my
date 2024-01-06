const express = require('express');
const Case = require("../models/partyinperson")
const router = express.Router();

const app = express();
app.use(express.json());

router.post('/case', async (req, res) => {
  try {
    const { plaintiffDetails, defendantDetails, caseDetails,documents,paymentDetails } = req.body;

    // Create a new Case document using the Case model
    const newCase = new Case({
      plaintiffDetails,
      defendantDetails,
      caseDetails,
      documents,
      paymentDetails,
    });

    // Save the new Case document to the database
    await newCase.save();

    res.status(201).json({ message: 'Case details saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving case details', error: error.message });
  }
});

module.exports = router;
