const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Judge = require('../models/judge');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/judgeAuthMiddleware")
const cookie = require("cookie-parser")

router.use(cookie())

const sendSetPasswordEmail = async (email, token, firstName) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "ecourtservicehelper@gmail.com",
      pass: "aryj ahqq wggy bawx"
    },
  });
  const registrationLink = `http://localhost:5173/judge/register/complete/${token}`;
  const mailOptions = {
    from: "ecourtservicehelper@gmail.com",
    to: email,
    subject: 'Complete your registration',
    html: `
      <p>Hello ${firstName},</p>
      <p>You've been registered as a Judge. Please click <a href="${registrationLink}">here</a> to set your password and complete the registration.</p>
      <p>Thank you,</p>
      <p>Your Court Administration Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent for setting password');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw new Error('Failed to send email');
  }
};

router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;

    const existingJudge = await Judge.findOne({email});

    if (existingJudge) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const token = Math.random().toString(36).substr(2, 10);

    const { firstname, lastname, gender, education, courtAdminId } = req.body;
    const judge = new Judge({
      firstname,
      lastname,
      name: `${firstname} ${lastname}`,
      email,
      gender,
      education,
      courtAdminId
    });
    judge.password_token = token;
    await judge.save();

    await sendSetPasswordEmail(judge.email, token,judge.firstname);

    res.status(200).json({
      message: 'Judge registered by court admin successfully. Please check your email to complete the registration.',
    });
  } catch (error) {
    res.status(500).json({
      error
    })
  }
});

router.post('/register/complete/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { email,password } = req.body;

    // Find the client by the verification token
    const judge = await Judge.findOne({ password_token: token });

    if (!judge) {
      return res.status(404).json({ error: 'Invalid token or judge not found' });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update client's password and remove verification token
    judge.email = email;
    judge.password = hashedPassword;
    judge.password_token = undefined;
    await judge.save();

    return res.status(200).json({ message: 'Registration completed successfully.' });
  } catch (err) {
    console.log(err)
    // Handle errors
    return res.status(500).json({ error: 'An error occurred while completing the registration.', message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the advocate by email in the database
    const judge = await Judge.findOne({ email });

    if (!judge) {
      return res.status(404).json({ error: 'Judge not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, judge.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { JudgeId: judge._id, email: judge.email },
      'thisisthesecretkeyforthisproject'
    );
    
    res.cookie("jwtoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 500000
    });

    return res.status(200).json({ message: 'Login successful', judge });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to log in', message: err.message });
  }
});

router.get('/user', authMiddleware, (req, res) => {
  try {
      const userData = req.user;
      res.status(200).json({ user: userData });
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

module.exports = router;