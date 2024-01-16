  const express = require('express');
  const router = express.Router();
  const nodemailer = require('nodemailer');
  
  const bcrypt = require("bcrypt")
  const jwt = require("jsonwebtoken")
  const authMiddleware = require("../middleware/judgeAuthMiddleware")
  const cookie = require("cookie-parser")
  const Admin = require("../models/cao")
  const Event = require('../models/event')
  const JudgeConference = require('../models/meeting');
  const { Case, Hearing, Order } = require("./models/courtcase"); // Import the Case model
  const Judge = require('../models/judge');

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

  router.post('/logout', (req, res) => {
    try {
      // Clear the JWT token from the cookie
      res.clearCookie('jwtoken', { httpOnly: true, secure: true });
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/my-conferences', authMiddleware, async (req, res) => {
    try {
      const judgeId = req.user._id;
  
      // Assuming you have a judge field in your Conference model
      const conferences = await JudgeConference.find({ judge: judgeId });
  
      res.json(conferences);
    } catch (error) {
      console.error('Error fetching conferences:', error);
      res.status(500).json({ error: 'Failed to fetch conferences' });
    }
  });

  router.post('/create-conference', authMiddleware, async (req, res) => {
    try {
      const { caseNumber, plaintiffName, defendantName, advocateName, title, description, date } = req.body;
      const newConference = new JudgeConference({
        caseNumber,
        plaintiffName,
        defendantName,
        advocateName,
        title,
        description,
        date,
      });
  
      await newConference.save();
  
      res.status(201).json({ message: 'Conference created successfully', data: newConference });
    } catch (error) {
      console.error('Error creating conference:', error);
      res.status(500).json({ error: 'Failed to create conference' });
    }
  });
  
  // Update an existing conference
  router.put('/update-conference/:conferenceId', authMiddleware, async (req, res) => {
    try {
      const { caseNumber, plaintiffName, defendantName, advocateName, title, description, date } = req.body;
      const { conferenceId } = req.params;
  
      const updatedConference = await JudgeConference.findOneAndUpdate(
        { _id: conferenceId },
        { caseNumber, plaintiffName, defendantName, advocateName, title, description, date },
        { new: true }
      );
  
      if (!updatedConference) {
        return res.status(404).json({ error: 'Conference not found' });
      }
  
      res.status(200).json({ message: 'Conference updated successfully', data: updatedConference });
    } catch (error) {
      console.error('Error updating conference:', error);
      res.status(500).json({ error: 'Failed to update conference' });
    }
  });
  
  // Delete a conference
  router.delete('/delete-conference/:conferenceId', authMiddleware, async (req, res) => {
    try {
      const { conferenceId } = req.params;
  
      const deletedConference = await JudgeConference.findOneAndDelete({ _id: conferenceId });
  
      if (!deletedConference) {
        return res.status(404).json({ error: 'Conference not found' });
      }
  
      res.status(200).json({ message: 'Conference deleted successfully' });
    } catch (error) {
      console.error('Error deleting conference:', error);
      res.status(500).json({ error: 'Failed to delete conference' });
    }
  });
  

  router.get('/my-cases', authMiddleware, async (req, res) => {
    try {
      const judgeId = req.user._id; // Assuming you have the logged-in user's ID in req.user.id
      const judge = await Judge.findById(judgeId).populate('cases'); // Populate the 'cases' field for the user
  
      res.json({ cases: judge.cases }); // Send the populated cases data to the frontend
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cases' });
    }
});

router.get('/my-cases/:caseId',authMiddleware, async (req, res) => {
  try {
    const caseId = req.params.caseId;
    // Fetch case details from the database based on the caseId
    const caseDetails = await Case.findById(caseId); // Replace with your database model and query logic
    if (!caseDetails) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.status(200).json({ caseDetails });
  } catch (error) {
    console.error('Error fetching case details:', error);
    res.status(500).json({ message: 'Error fetching case details', error: error.message });
  }
});
  


  module.exports = router;