  const express = require('express');
  const router = express.Router();
  const nodemailer = require('nodemailer');
  const Judge = require('../models/judge');
  const bcrypt = require("bcrypt")
  const jwt = require("jsonwebtoken")
  const authMiddleware = require("../middleware/judgeAuthMiddleware")
  const cookie = require("cookie-parser")
  const Admin = require("../models/cao")
  const Event = require('../models/event')
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

  router.post('/register',async (req, res) => {
    try {
      const { courtAdminId, email, firstname,username, lastname,gender, education, } = req.body;

      // Check if the provided email already exists for any judge
      const existingJudgeByEmail = await Judge.findOne({ email });

      if (existingJudgeByEmail) {
        return res.status(400).json({ message: 'Email already exists for another Judge.' });
      }

      const courtAdmin = await Admin.findOne({ courtAdminId });

      if (!courtAdmin) {
        return res.status(400).json({ message: 'Invalid Court Admin ID' });
      }
      const token = Math.random().toString(36).substr(2, 10);
      const newJudge = new Judge({
        courtAdmin: courtAdmin._id,
        firstname,
        lastname,
        name:`${firstname} ${lastname}`,
        gender,
        password_token:token,
        email,
        education,
        username
      });

      await newJudge.save();

      courtAdmin.judges.push(newJudge._id);
      await courtAdmin.save();
      await sendSetPasswordEmail(email, newJudge.password_token, firstname);
      res.status(201).json({ message: 'Judge registered successfully', data: newJudge });
    } catch (err) {
      res.status(500).json({ message: 'Error registering Judge', error: err.message });
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

  // Add this route in your router file (e.g., routes/client.js)
  router.get('/my-events', authMiddleware, async (req, res) => {
    try {
      const userId = req.user._id;
      const events = await Event.find({ user: userId }); // Assuming you have a createdBy field in your Event model
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });

  // Add this route in your router file (e.g., routes/client.js)
  router.post('/create', authMiddleware, async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const userId = req.user._id;

      const newEvent = new Event({
        title,
        description,
        date,
        user: userId,
      });

      await newEvent.save();

      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });
  // Add this route in your router file (e.g., routes/client.js)
  router.put('/update/:eventId', authMiddleware, async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const { eventId } = req.params;
      const userId = req.user._id;

      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId, user: userId },
        { title, description, date },
        { new: true }
      );

      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found or unauthorized' });
      }

      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Failed to update event' });
    }
  });
  // Add this route in your router file (e.g., routes/client.js)
  router.delete('/delete/:eventId', authMiddleware, async (req, res) => {
    try {
      const { eventId } = req.params;
      const userId = req.user._id;

      const deletedEvent = await Event.findOneAndDelete({ _id: eventId, user: userId });

      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found or unauthorized' });
      }

      res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Failed to delete event' });
    }
  });

  module.exports = router;