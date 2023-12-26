
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Advocate = require('../models/privateAdvocate');
require('dotenv').config();
const bcrypt = require("bcrypt");
const session = require('express-session');
router.use(
  session({
    secret: 'thisisasecretkeyforthisproject',
    resave: false,
    saveUninitialized: true,
  })
);


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

router.post('/set-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the advocate by the verification token
    const advocate = await Advocate.findOne({ temp_token: token });

    if (!advocate) {
      return res.status(404).json({ error: 'Invalid token or advocate not found' });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update advocate's password and remove verification token
    advocate.password = hashedPassword;
    advocate.temp_token = undefined; // Update this to the field storing the verification token
    await advocate.save();

    return res.status(200).json({ message: 'Password set successfully' });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to set password', message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the advocate by email in the database
    const advocate = await Advocate.findOne({ email });

    if (!advocate) {
      return res.status(404).json({ error: 'Advocate not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, advocate.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Start a session for the advocate after successful login
    req.session.advocateId = advocate._id; // Store the advocate ID in the session

    return res.status(200).json({ message: 'Login successful', advocate });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to log in', message: err.message });
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
    text: `Here is the link to set your password: http://localhost:5173/Advocate/set-password/${token}`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = router;
