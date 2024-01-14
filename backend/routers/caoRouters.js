const express = require('express');
const authMiddleware = require("../middleware/adminAuthMiddleware")
const Judge = require('../models/judge');
const CourtAdmin = require('../models/cao');
const Court = require("../models/court")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const Filedcase=require('../models/partyinperson')
const { Case, Hearing, Order } = require('../models/courtcase');

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

router.get('/mycases', authMiddleware, async (req, res) => {
  try {
    const courtAdminId = req.user._id; // Retrieve court admin ID from authenticated user
    // console.log(courtAdminId)
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

// Assuming you have a route like '/approve-for-assigning-judge'
router.post('/approve-case/:adminId/:caseId/:approvalType', async (req, res) => {
  try {
    const { adminId, caseId, approvalType } = req.params;

    // Find the CourtAdmin by ID
    const courtAdmin = await CourtAdmin.findById(adminId);

    if (!courtAdmin) {
      return res.status(404).json({ error: 'CourtAdmin not found' });
    }

    // Find the Filedcase by ID
    const filedCase = await Filedcase.findById(caseId);

    if (!filedCase) {
      return res.status(404).json({ error: 'Filedcase not found' });
    }

    // Update the appropriate array based on the approval type
    if (approvalType === 'judge') {
      courtAdmin.judgeapprovedcases.push(filedCase);
    } else if (approvalType === 'advocate') {
      courtAdmin.publicadvocateapprovedcases.push(filedCase);
    } else {
      return res.status(400).json({ error: 'Invalid approval type' });
    }

    // Remove the case from the original array (courtCases)
    const index = courtAdmin.courtCases.indexOf(caseId);
    courtAdmin.courtCases.splice(index, 1);

    // Save the changes
    await courtAdmin.save();

    return res.status(200).json({ message: 'Case approved successfully' });
  } catch (error) {
    console.error('Error approving case:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/judgeapproved-cases', authMiddleware,async (req, res) => {
  try {
    // Assuming you have a middleware to authenticate the court admin and attach user data to req.user
    const courtAdminId = req.user._id;

    // Find the court admin by ID and populate the judge-approved cases
    const courtAdmin = await CourtAdmin.findById(courtAdminId).populate('judgeapprovedcases');

    if (!courtAdmin) {
      return res.status(404).json({ message: 'Court Admin not found' });
    }

    // Extract the judge-approved cases
    const judgeApprovedCases = courtAdmin.judgeapprovedcases;

    res.json({ judgeApprovedCases });
  } catch (error) {
    console.error('Error fetching judge-approved cases:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/cases', authMiddleware, async (req, res) => {
  try {
    const { caseId, approvalType } = req.body;
    const courtAdminId = req.user._id;

    // Find the filed case by ID
    const filedCase = await Filedcase.findById(caseId);

    if (!filedCase) {
      return res.status(404).json({ success: false, message: 'Filedcase not found' });
    }

    const assignJudgePromise = (async () => {
      if (approvalType === 'judge') {
        const newCase = new Case({
          caseNumber: filedCase.caseNumber,
          caseType: filedCase.filecasetype,
          caseStatus: 'approvedByCourtAdminForAssigningJudge',
          caseDetails: filedCase._id,
          courtAdmin: courtAdminId,
        });
        await newCase.save();
        return { success: true, message: 'Case approved for assigning judge', case: newCase };
      }
    })();

    const assignAdvocatePromise = (async () => {
      if (approvalType === 'advocate') {
        const newCase = new Case({
          caseNumber: filedCase.caseNumber,
          caseType: filedCase.filecasetype,
          caseStatus: 'approvedByCourtAdminForAssigningPublicAdvocate',
          caseDetails: filedCase._id,
          courtAdmin: courtAdminId,
        });
        await newCase.save();
        return { success: true, message: 'Case approved for assigning Public Advocate', case: newCase };
      }
    })();

    const [assignJudgeResult, assignAdvocateResult] = await Promise.all([assignJudgePromise, assignAdvocatePromise]);

    // Respond with a success message and updated case details
    res.json({ success: true, message: `Case assigned for ${approvalType}`, assignJudgeResult, assignAdvocateResult });
  } catch (error) {
    console.error('Error assigning case:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/registered-judges', authMiddleware,async (req, res) => {
  try {
    // Assuming you have a middleware to authenticate the admin and attach user data to req.user
    const adminId = req.user._id;

    // Find the court admin by ID
    const admin = await CourtAdmin.findById(adminId).populate('judges');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Access the list of registered judges directly from the admin object
    const registeredJudges = admin.judges;

    res.json({ registeredJudges });
  } catch (error) {
    console.error('Error fetching registered judges:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/assign-judge/:judgeId/:filedcaseId', async (req, res) => {
  try {
    // Extract judgeId, filedcaseId, and courtCaseId from request parameters
    const { judgeId, filedcaseId } = req.params;

    // Find the judge, filedcase, and courtCase based on their IDs
    const judge = await Judge.findById(judgeId);
    const filedcase = await Filedcase.findById(filedcaseId);
    const courtCase = await Case.findOne({ caseDetails: filedcase._id });

    // Check if the judge, filedcase, or courtCase is not found
    if (!judge || !filedcase || !courtCase) {
      return res.status(404).json({ message: 'Judge, Filedcase, or CourtCase not found' });
    }

    // Check if the case is already assigned to a judge
    if (courtCase.judge) {
      return res.status(400).json({ message: 'Case is already assigned to a judge' });
    }

    // Add the filedcase to the judge's cases array
    judge.cases.push(filedcase);
    await judge.save();

    // Associate the judge with the CourtCase
    courtCase.judge = judge;
    await courtCase.save();

    // Respond with a success message
    res.json({ message: 'Judge assigned to Filedcase and associated with CourtCase successfully' });
  } catch (error) {
    // Handle errors and respond with an internal server error
    console.error('Error assigning judge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;