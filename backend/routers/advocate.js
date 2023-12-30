
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Advocate = require('../models/advocate');
require('dotenv').config();
const bcrypt = require("bcrypt");
const session = require('express-session');
// router.use(
//   session({
//     secret: 'thisisasecretkeyforthisproject',
//     resave: false,
//     saveUninitialized: true,
//   })
// );


router.post('/private/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      gender,
      phoneNumber,
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
      username,
      gender,
      phoneNumber,
      licenseNumber,
      barAssociation,
      jurisdiction,
      educationQualifications,
      yearsOfPractice,
      practiceArea,
      password_token: token,
      isAppointedByCourtAdmin: false,
      isPrivateAdvocate:true
    });

    await newAdvocate.save();

    await sendSetPasswordEmail(email, token);

    return res.status(201).json({ message: 'Advocate registered successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to register advocate', message: err.message });
  }
});

const sendSetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "ecourtservicehelper@gmail.com",
      pass: "aryj ahqq wggy bawx"
    },
  });

  const mailOptions = {
    from: "ecourtservicehelper@gmail.com",
    to: email,
    subject: 'Complete your registration',
    text: `Click on the following link to complete your registration:  http://localhost:5173/advocate/public-registration/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent for setting password');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Route for public advocate registration
router.post('/public/register', async (req, res) => {
  try {
    const { email } = req.body;

    const existingAdvocate = await Advocate.findOne({ email });

    if (existingAdvocate) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const token = Math.random().toString(36).substr(2, 10);

    const publicAdvocate = new Advocate({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      licenseNumber: req.body.licenseNumber,
      educationQualifications: req.body.educationQualifications,
      jurisdiction: req.body.jurisdiction,
      barAssociation: req.body.barAssociation,
      yearsOfPractice: req.body.yearsOfPractice,
      practiceArea: req.body.practiceArea,
      courtAdminId:req.body.courtAdminId,
      isPrivateAdvocate: false,
      isAppointedByCourtAdmin: true,
    });
    publicAdvocate.password_token = token;
    await publicAdvocate.save();

    await sendSetPasswordEmail(publicAdvocate.email, token);

    res.status(200).json({
      message: 'Public advocate registered by court admin successfully. Please check your email to complete the registration.',
    });
  } catch (error) {
    res.status(500).json({
      error
    });
  }
});





// Complete the registration for a public advocate
router.post('/register/complete', async (req, res) => {
  try {
    const { email, password } = req.body;
    // const { token } = req.params;

    // Find the advocate with the given email and token
    const publicAdvocate = await Advocate.findOne({email});
    

    if (!publicAdvocate) {
      return res.status(400).json({ error: 'Invalid token or email.' });
    }

    // Update the advocate's email and password
    publicAdvocate.email = email;
    publicAdvocate.password = await bcrypt.hash(password, 10);
    publicAdvocate.password_token = undefined;
    await publicAdvocate.save();

    res.status(200).json({ message: 'Registration completed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while completing the registration.' });
  }
});


router.post('/set-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the advocate by the verification token
    const advocate = await Advocate.findOne({ password_token: token });

    if (!advocate) {
      return res.status(404).json({ error: 'Invalid token or advocate not found' });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update advocate's password and remove verification token
    advocate.password = hashedPassword;
    advocate.password_token = undefined; // Update this to the field storing the verification token
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
    // req.session.advocateId = advocate._id; // Store the advocate ID in the session

    return res.status(200).json({ message: 'Login successful', advocate });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to log in', message: err.message });
  }
});




module.exports = router;
