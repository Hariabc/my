const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Judge = require('../models/judge');

// Register a judge
router.post('/register', async (req, res) => {
  try {
    // Create a new judge object
    const { firstname, lastname, email, gender, education, courtAdminId } = req.body;
    const judge = new Judge({
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
      email,
      gender,
      education,
      courtAdminId
    });

    // Save the judge to the database
    await judge.save();

    // Send registration email to judge
    const transporter = nodemailer.createTransport({
      // Configure your SMTP settings here
    });

    const mailOptions = {
      from: "ecourtservicehelper@gmail.com",
      to: email,
      subject: 'Complete Your Judge Registration',
      text: 'Please click the following link to complete your registration and set your password: [LINK]'
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Judge registered successfully. Please check your email to complete the registration.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the judge.' });
  }
});

// Complete registration and set password
router.post('/complete-registration', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Update the judge with the provided email
    const judge = await Judge.findOneAndUpdate({ email }, { password }, { new: true });

    if (!judge) {
      return res.status(404).json({ message: 'Judge not found.' });
    }

    res.status(200).json({ message: 'Registration completed successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while completing the registration.' });
  }
});

module.exports = router;