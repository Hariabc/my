const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const session = require('express-session');
require("dotenv").config();

// Initialize express session
router.use(
  session({
    secret: 'thisisasecretkeyforthisproject',
    resave: false,
    saveUninitialized: true,
  })
);

// Function to send an email with the link to set the password
const sendSetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user:"ecourtservicehelper@gmail.com",
      pass:"aryj ahqq wggy bawx"
    },
  });

  const mailOptions = {
    from:"ecourtservicehelper@gmail.com",
    to: email,
    subject: 'Set Your Password for Court Case Management Portal',
    text: `To set your password, please click on the following link: http://localhost:5173/set-password/${token}`,
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
        temp_token: token, // Store the token for setting the password
      // Add any other relevant fields
    });

    // Save the new client to the database
    await newClient.save();

    // Send an email with a link to set the password
    await sendSetPasswordEmail(email, token);

    // Start a session for the client after successful registration
    req.session.clientId = newClient._id; // Store the client ID in the session

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
    const client = await Client.findOne({ temp_token: token });

    if (!client) {
      return res.status(404).json({ error: 'Invalid token or client not found' });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update client's password and remove verification token
    client.password = hashedPassword;
    client.verificationToken = undefined;
    await client.save();

    return res.status(200).json({ message: 'Password set successfully' });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to set password', message: err.message });
  }
});
// Route for client login
router.post('/login', async (req, res) => {
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

    // Start a session for the client after successful login
    req.session.clientId = client._id; // Store the client ID in the session

    return res.status(200).json({ message: 'Login successful', client });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to log in', message: err.message });
  }
});
// Logout route
router.post('/logout', (req, res) => {
  try {
    // Destroy the session and clear the client ID
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to logout', message: err.message });
      }
      // Send a success response after destroying the session
      return res.status(200).json({ message: 'Logout successful' });
    });
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: 'Failed to logout', message: err.message });
  }
});

module.exports = router;
