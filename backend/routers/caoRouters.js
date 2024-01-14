const express = require('express');
const authMiddleware = require("../middleware/adminAuthMiddleware")

const CourtAdmin = require('../models/cao');
const Court = require("../models/court")
const jwt = require("jsonwebtoken")
const cookie=require("cookie-parser")


const router = express.Router();
router.use(cookie())
// Register a new court admin
router.post('/register', async (req, res) => {
  const { firstName,
    lastName,
    username,
    password,
    email,
    phone,
    courtAdminId,
    courtId } = req.body;

  try {
    // Check if the court admin already exists
    const existingAdmin = await CourtAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        error: 'Court admin already exists',
      });
    }

    // Find the court by ID
    const court = await Court.findById(courtId);
    if (!court) {
      return res.status(404).json({
        error: 'Court not found',
      });
    }

    // Create a new court admin
    const newAdmin = new CourtAdmin({
      firstName,
    lastName,
    username,
    password,
      email,
    courtAdminId,
    phone,
    court: courtId,
    });

    // Save the court admin to the database
    await newAdmin.save();

    res.status(201).json({
      message: 'Court admin registered successfully',
      admin: newAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const courtAdmin = await CourtAdmin.findOne({ email });

    if (!courtAdmin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the password stored in the database
    if (password !== courtAdmin.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { courtAdminId: courtAdmin._id, email: courtAdmin.email },
      'thisisthesecretkeyforthisproject'
    );
    
    res.cookie("jwtoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 78378397387
    });
    // Passwords match - successful login
      res.status(200).json({ message: 'Login successful' });
    //   res.status(200).json({message:"login sucess"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/user',authMiddleware, (req, res) => {
  try {
      const userData = req.user;
      res.status(200).json({ user: userData });
  } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Assuming you have necessary imports and setup for models and express

// Fetch filed cases for the logged-in court admin
router.get('/mycases', authMiddleware, async (req, res) => {
  try {
    const courtAdminId = req.user._id; // Retrieve court admin ID from authenticated user

    // Find the court admin by ID and populate the associated court cases
    const courtAdmin = await CourtAdmin.findById(courtAdminId).populate('courtCases');

    if (!courtAdmin) {
      return res.status(404).json({ message: 'Court admin not found' });
    }

    res.status(200).json({ courtCases: courtAdmin.courtCases });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching court cases', error: error.message });
  }
});

// module.exports = router;

module.exports = router;



// module.exports = router;