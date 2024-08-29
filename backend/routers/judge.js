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
  const Filedcase=require('../models/partyinperson')
  const { Case, Hearing, Order } = require("../models/courtcase"); // Import the Case model
  const Judge = require('../models/judge');
  const Judgement = require('../models/judgement');

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

  router.post('/case-tracking', async (req, res) => {
    try {
      const { searchValue } = req.body;
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      // First, check the Case model with the associated documents
      let caseDetails = await Case.findOne({ caseNumber:searchValue })
        .populate('caseDetails') // Assuming 'caseDetails' is the reference to Filedcase schema
        .populate('hearings')
        .populate('orders')
        .exec();
  
      if (!caseDetails) {
        // If not found in the first case, check the second case model
        caseDetails = await Filedcase.findOne({ caseNumber:searchValue }).exec();
  
        if (!caseDetails) {
          return res.status(404).json({ error: 'Case not found' });
        }
  
        return res.status(200).json({ caseDetails });
      }
  
      return res.status(200).json({ caseDetails });
    } catch (error) {
      console.error('Error tracking case:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
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

  router.get('/mycases', authMiddleware, async (req, res) => {
    const judgeId = req.user._id; // Use req.user._id to get the authenticated judge's ID
    // console.log(judgeId);
    try {
      const judge = await Judge.findById(judgeId).populate('cases');
  
      if (!judge) {
        return res.status(404).json({ message: 'Judge not found' });
      }
  
      res.json(judge.cases);
    } catch (error) {
      console.error('Error fetching judge cases:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  router.post('/close-case/:caseId', authMiddleware,async (req, res) => {
    const { caseId } = req.params;
    
    try {
      // Find the case in the database by its ID
      const existingCase = await Filedcase.findById(caseId);
  
      if (!existingCase) {
        return res.status(404).json({ message: 'Case not found' });
      }

      
  
      // Update the case status to 'Closed'
      existingCase.progress = 'closed';
      await existingCase.save();
  
      // Find the judge and update disposedCases
      const judgeId = req.user.id; // Adjust as per your authentication logic
      const judge = await Judge.findById(judgeId);
  
      if (!judge) {
        return res.status(404).json({ message: 'Judge not found' });
      }
  
      // Remove closed case from cases and add to disposedCases
      judge.cases = judge.cases.filter(caseItem => caseItem.toString() !== caseId);
      judge.disposedCases.push(existingCase);
  
      await judge.save();
  
      res.json({ message: `Case ${caseId} closed successfully`, closedCase: existingCase });
    } catch (error) {
      console.error(`Error closing case ${caseId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.get('/disposedcases', authMiddleware, async (req, res) => {
    try {
      const judgeId = req.user._id; // Retrieve court admin ID from authenticated user
      // console.log(courtAdminId)
      // console.log(judgeId);
      // Find the court admin by ID and populate the associated court cases
      const judge = await Judge.findById(judgeId).populate('disposedCases');
      // console.log(judge.disposedCases)
      if (!judge) {
        return res.status(404).json({ message: 'Judge not found' });
      }
      
      res.status(200).json({ disposedCases: judge.disposedCases });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching court cases', error: error.message });
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
        const { caseNumber, plaintiffName, plaintiffEmail, defendantName, defendantEmail, advocateName, title, description, date, meetingID } = req.body;
        const userId = req.user._id;

        // Create a new conference
        const newConference = new JudgeConference({
            caseNumber,
            plaintiffName,
            plaintiffEmail,
            defendantName,
            defendantEmail,
            advocateName,
            title,
            description,
            date,
            meetingID,
            hearingMode: "virtual",
            hearingStatus: 'scheduled',
            judge: userId,
        });

        // Save the new conference
        await newConference.save();

        // Update the case status to "preTrialconferenceScheduled"
        await Case.findOneAndUpdate(
            { caseNumber: req.body.caseNumber },
            {
                $push: { hearings: newConference._id },
                $set: { caseStatus: 'preTrialconferenceScheduled' },
            }
        );

        // Send email to plaintiff
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ecourtservicehelper@gmail.com',
                pass: 'aryj ahqq wggy bawx', 
            },
        });

        const mailOptions = {
          from: 'your_email@gmail.com', // replace with your Gmail email
          to: plaintiffEmail,
          subject: 'Conference Scheduled',
          html: `
              <p style="font-size: 16px; color: #333;">Dear ${plaintiffName},</p>
              <p style="font-size: 14px;">Your conference has been scheduled. Details:</p>
              <ul>
                  <li style="font-size: 14px;"><strong>Title:</strong> ${title}</li>
                  <li style="font-size: 14px;"><strong>Date:</strong> ${date}</li>
                  <li style="font-size: 14px;"><strong>Meeting ID:</strong> ${meetingID}</li>
                  <li style="font-size: 14px;"><strong>Hearing Mode:</strong> ${newConference.hearingMode}</li>
                  <li style="font-size: 14px;"><strong>Hearing Status:</strong> ${newConference.hearingStatus}</li>
              </ul>
              <p style="font-size: 14px;">The Court Management Team</p>
          `,
      };
      
      

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).json({ message: 'Conference created successfully and email sent', data: newConference });
            }
        });
    } catch (error) {
        console.error('Error creating conference:', error);
        res.status(500).json({ error: 'Failed to create conference' });
    }
});
  
  
  // Delete a conference
  router.delete('/delete-conference/:conferenceId', authMiddleware, async (req, res) => {
    try {
      const { conferenceId } = req.params;
      const userId = req.user._id;
  
      const deletedConference = await JudgeConference.findOneAndDelete({ _id: conferenceId , judge: userId});
  
      if (!deletedConference) {
        return res.status(404).json({ error: 'Conference not found' });
      }
  
      res.status(200).json({ message: 'Conference deleted successfully' });
    } catch (error) {
      console.error('Error deleting conference:', error);
      res.status(500).json({ error: 'Failed to delete conference' });
    }
  });

  router.put('/update-conference/:updateconferenceId', authMiddleware, async (req, res) => {
    try {
      const { caseNumber,plaintiffName,plaintiffEmail,defendantName,defendantEmail,advocateName,title, description, date } = req.body;
      const { updateconferenceId } = req.params;
      const userId = req.user._id;

      const updatedConference = await JudgeConference.findOneAndUpdate(
        { _id: updateconferenceId, judge: userId },
        {caseNumber,plaintiffName,plaintiffEmail,defendantName,defendantEmail,advocateName, title, description, date },
        { new: true }
      );

      if (!updatedConference) {
        return res.status(404).json({ error: 'Event not found or unauthorized' });
      }

      res.status(200).json(updatedConference);
    } catch (error) {
      console.error('Error updating conference:', error);
      res.status(500).json({ error: 'Failed to update conference' });
    }
  });

  router.post('/orders',authMiddleware, async (req, res) => {
    try {
      const {caseNumber, orderId,orderType, orderContent, orderDate } = req.body;
      const userId = req.user._id;
  
      const newOrder = new Order({
        caseNumber,
        orderId,
        orderType,
        orderContent,
        orderDate,
        judge: userId,
      });
  
      const savedOrder = await newOrder.save();
  
      res.status(200).json({ orderId: savedOrder._id, message: 'Order created successfully' });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/get-orders', authMiddleware, async (req, res) => {
    try {
      const judgeId = req.user._id;
  
      // Assuming you have a judge field in your Conference model
      const orders = await Order.find({ judge: judgeId });
  
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  router.post('/submit-judgment', authMiddleware, async (req, res) => {
    try {
      // Extract relevant data from the request body
      const {
        caseNumber,
        judgementId,
        courtName,
        judgeName,
        dateOfJudgment,
        plaintiffName,
        defendantName,
        advocateName,
        factualBackground,
        legalIssues,
        plaintiffArg,
        defendantArg,
        analysisAndDecision,
        ordersAndRelief,
        disposition,
        conclusion,
        signature,
      } = req.body;
      const userId = req.user._id;
  
      // Create a new Judgment instance
      const judgment = new Judgement({
        caseNumber,
        judgementId,
        courtName,
        judgeName,
        dateOfJudgment,
        plaintiffName,
        defendantName,
        advocateName,
        factualBackground,
        legalIssues,
        plaintiffArg,
        defendantArg,
        analysisAndDecision,
        ordersAndRelief,
        disposition,
        conclusion,
        signature,
        judge: userId // Assuming you have authentication middleware setting req.user
      });
  
      // Save the judgment to the database
      await judgment.save();
  
      // Respond with the saved judgment
      res.status(201).json(judgment);
    } catch (error) {
      console.error('Error submitting judgment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/get-judgements', authMiddleware, async (req, res) => {
    try {
      const judgeId = req.user._id;
  
      // Assuming you have a judge field in your Conference model
      const judgements = await Judgement.find({ judge: judgeId });
  
      res.json(judgements);
    } catch (error) {
      console.error('Error fetching judgements:', error);
      res.status(500).json({ error: 'Failed to fetch judgements' });
    }
  });

  module.exports = router;