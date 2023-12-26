
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Advocate = require('../models/privateAdvocate');
require('dotenv').config();

router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      licenseNumber,
      barAssociation,
      jurisdiction,
      educationQualifications,
      yearsOfPractice,
      practiceArea,
    } = req.body;

    const existingAdvocate = await Advocate.findOne({ email });
    if (existingAdvocate) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const token = Math.random().toString(36).substr(2, 10);

    const newAdvocate = new Advocate({
      firstName,
      lastName,
      email,
      phoneNo,
      licenseNumber,
      barAssociation,
      jurisdiction,
      educationQualifications,
      yearsOfPractice,
      practiceArea,
      temp_token: token,
    });

    await newAdvocate.save();

    await sendSetPasswordEmail(email, token);

    return res.status(201).json({ message: 'Advocate registered successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to register advocate', message: err.message });
  }
});

async function sendSetPasswordEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ecourtservicehelper@gmail.com",
      pass: "aryj ahqq wggy bawx"
    },
  });

  const mailOptions = {
    from: "ecourtservicehelper@gmail.com",
    to: email,
    subject: 'Set your password',
    text: `Here is the link to set your password: http://localhost:5173/set-password/${token}`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = router;
