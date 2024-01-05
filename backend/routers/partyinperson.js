// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Form = require('../models/partyinperson');

// POST route to save form data
router.use(bodyParser.json()); // Use body-parser middleware to parse JSON bodies
router.use(bodyParser.urlencoded({ extended: true })); 
router.post('/case', async (req, res) => {
  try {
    const formData = req.body;
    const newForm = new Form(formData);
    await newForm.save();
    res.status(201).json({ message: 'Form data saved successfully', formData });
  } catch (error) {
    res.status(500).json({ error: 'Could not save form data' });
  }
});

module.exports = router;

