const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const session = require('express-session');
require("dotenv").config();
const jwt = require("jsonwebtoken")
const cookie = require('cookie-parser')
const User=require("../models/client")
const authMiddleware = require("../middleware/clientAuthMiddleware")
const Case= require('../models/partyinperson')
const Event = require('../models/event')
router.use(cookie());
// router.use(
//   session({
//     secret: 'thisisasecretkeyforthisproject',
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Function to send an email with the link to set the password
const sendSetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user:"ecourtservicehelper@gmail.com",
      pass:"aryj ahqq wggy bawx"
    },
  });
  const registrationLink = `http://localhost:5173/client/set-password/${token}`;


  const mailOptions = {
    from:"ecourtservicehelper@gmail.com",
    to: email,
    subject: 'Set Your Password for Court Case Management Portal',
    html: `
    <html>
      <head>
        <title>Set Your Password</title>
      </head>
      <body>
        <p>Hello,</p>
        <p>To set your password, please click on the following link:</p>
        <p><a href="${registrationLink}">Set Password</a></p>
        <p>If the above link doesn't work, you can copy and paste this URL in your browser:</p>
        <p>${registrationLink}</p>
        <p>Thank you!</p>
      </body>
    </html>
  `,
};

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent for setting password');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Route for client registration/signup
router.post('/register', async (req, res) => {
  try {
    // Extract client details from request body
    const { firstName,lastName, email, phone, address,dob,gender,username,adhar  } = req.body;

    // Check if the email is already registered
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Generate a random token for setting the password
    const token = Math.random().toString(36).substr(2, 10);

    // Create a new client using the Client model without a password
    const newClient = new Client({
        firstName,
        lastName,
        email,
        dob,
        gender,
        phone,
        username,
        adhar,
        address,
        password_token: token, // Store the token for setting the password
      // Add any other relevant fields
    });

    // Save the new client to the database
    await newClient.save();

    // Send an email with a link to set the password
    await sendSetPasswordEmail(email, token);

    // Start a session for the client after successful registration
    // req.session.clientId = newClient._id; // Store the client ID in the session

    return res.status(201).json({ message: 'Client registered successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to register client', message: err.message });
  }
});

// Route to handle setting the password from the form submission
router.post('/set-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the client by the verification token
    const client = await Client.findOne({ password_token: token });

    if (!client) {
      return res.status(404).json({ error: 'Invalid token or client not found' });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update client's password and remove verification token
    client.password = hashedPassword;
    client.password_token = undefined;
    await client.save();

    return res.status(200).json({ message: 'Password set successfully' });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to set password', message: err.message });
  }
});
// Route for client login
// Other necessary imports and configurations

router.post('/login',async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the client by email in the database
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, client.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { clientId: client._id, email: client.email },
      'thisisthesecretkeyforthisproject'
    );
    
    res.cookie("jwtoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 500000
    });
    
    return res.status(200).json({ message: 'Login successful'});
    
    // console.log(token)
    // res.send(req.rootUser)
    return res.status(200).json({ message: 'Login successful'});
    
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

// Backend route example (using Express.js and Mongoose)

// Define a route to fetch cases for the logged-in user
router.get('/mycases', authMiddleware,async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have the logged-in user's ID in req.user.id
    const user = await User.findById(userId).populate('cases'); // Populate the 'cases' field for the user

    res.json({ cases: user.cases }); // Send the populated cases data to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cases' });
  }
});

router.get('/mycases/:caseId',authMiddleware, async (req, res) => {
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

    const deletedEvent = await Event.findOneAndDelete({ _id: eventId, createdBy: userId });

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