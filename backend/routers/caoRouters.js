const express = require('express');
const authMiddleware = require("../middleware/adminAuthMiddleware")
const Judge = require('../models/judge');
const CourtAdmin = require('../models/cao');
const Court = require("../models/court")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const Filedcase=require('../models/partyinperson')
const { Case, Hearing, Order } = require('../models/courtcase');
const court = require('../models/court');
const Event = require('../models/event')
const Advocate=require('../models/advocate')


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
    // gender,
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
      maxAge: 1000000
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

router.get('/allcases', authMiddleware, async (req, res) => {
  try {
    const courtAdminId = req.user._id; // Retrieve court admin ID from authenticated user
    // console.log(courtAdminId)
    // Find the court admin by ID and populate the associated court cases
    const courtAdmin = await CourtAdmin.findById(courtAdminId).populate('AllCases');

    if (!courtAdmin) {
      return res.status(404).json({ message: 'Court admin not found' });
    }

    res.status(200).json({ courtCases: courtAdmin.AllCases });
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

router.get('/publicadvocateapproved-cases', authMiddleware,async (req, res) => {
  try {
    // Assuming you have a middleware to authenticate the court admin and attach user data to req.user
    const courtAdminId = req.user._id;

    // Find the court admin by ID and populate the judge-approved cases
    const courtAdmin = await CourtAdmin.findById(courtAdminId).populate('publicadvocateapprovedcases');

    if (!courtAdmin) {
      return res.status(404).json({ message: 'Court Admin not found' });
    }

    // Extract the judge-approved cases
    const publicadvocateapprovedcases = courtAdmin.publicadvocateapprovedcases;

    res.json({ publicadvocateapprovedcases });
  } catch (error) {
    console.error('Error fetching judge-approved cases:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/cases', authMiddleware, async (req, res) => {
  try {
    const { caseId, approvalType } = req.body;
    const courtAdminId = req.user._id;

    // Find the filed case by ID and populate caseDetails
    const filedCase = await Filedcase.findById(caseId).populate('caseDetails');

    if (!filedCase) {
      return res.status(404).json({ success: false, message: 'Filedcase not found' });
    }

    // Access courtName after populating caseDetails
    const courtName = filedCase.caseDetails.courtName;

    const assignJudgePromise = (async () => {
      if (approvalType === 'judge') {
        const newCase = new Case({
          caseNumber: filedCase.caseNumber,
          caseType: filedCase.filecasetype,
          caseStatus: 'approvedByCourtAdminForAssigningJudge',
          caseDetails: filedCase._id,
          courtAdmin: courtAdminId,
          courtName: courtName
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
          courtName: courtName
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

router.get('/registered-publicAdvocates', authMiddleware,async (req, res) => {
  try {
    // Assuming you have a middleware to authenticate the admin and attach user data to req.user
    const adminId = req.user._id;

    // Find the court admin by ID
    const admin = await CourtAdmin.findById(adminId).populate('Publicadvocates');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Access the list of registered judges directly from the admin object
    const registeredPublicadvocates = admin.Publicadvocates;

    res.json({ registeredPublicadvocates });
  } catch (error) {
    console.error('Error fetching registered judges:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/assign-judge/:judgeId/:filedcaseId', authMiddleware, async (req, res) => {
  try {
    // Extract judgeId, filedcaseId from request parameters
    const { judgeId, filedcaseId } = req.params;
    const adminId = req.user._id;

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

    // Ensure that the judge object has a 'cases' property (initialize it if not present)
    if (!judge.cases) {
      judge.cases = [];
    }

    // Add the filedcase to the judge's cases array
    judge.cases.push(filedcase._id);
    await judge.save();

    // Remove the filedcase from judgeapprovedcases array
    // Add the filedcase to judgeAssignedCases array
    await CourtAdmin.findByIdAndUpdate(adminId, {
      $pull: { judgeapprovedcases: filedcaseId },
      $push: { judgeAssignedCases: filedcaseId },
    });

    // Associate the judge with the CourtCase
    courtCase.judge = judge;
    courtCase.caseStatus = 'caseAssignedToAJudge';
    await courtCase.save();

    // Respond with a success message
    res.json({ message: 'Judge assigned to Filedcase and associated with CourtCase successfully' });
  } catch (error) {
    // Handle errors and respond with an internal server error
    console.error('Error assigning judge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/assign-publicAdvocate/:publicadvocateId/:filedcaseId', authMiddleware, async (req, res) => {
  try {
    // Extract judgeId, filedcaseId from request parameters
    const { publicadvocateId, filedcaseId } = req.params;
    const adminId = req.user._id;

    // Find the judge, filedcase, and courtCase based on their IDs
    const publicadvocate = await Advocate.findById(publicadvocateId);
    const filedcase = await Filedcase.findById(filedcaseId);
    const courtCase = await Case.findOne({ caseDetails: filedcase._id });

    // Check if the judge, filedcase, or courtCase is not found
    if (!publicadvocate || !filedcase || !courtCase) {
      return res.status(404).json({ message: 'publicadvocate, Filedcase, or CourtCase not found' });
    }

    // Check if the case is already assigned to a judge
    if (courtCase.publicadvocate) {
      return res.status(400).json({ message: 'Case is already assigned to a Public Advocate' });
    }

    // Ensure that the judge object has a 'cases' property (initialize it if not present)
    if (!publicadvocate.cases) {
      publicadvocate.cases = [];
    }

    // Add the filedcase to the judge's cases array
    publicadvocate.cases.push(filedcase._id);
    await publicadvocate.save();

    // Remove the filedcase from judgeapprovedcases array
    // Add the filedcase to judgeAssignedCases array
    await CourtAdmin.findByIdAndUpdate(adminId, {
      $pull: { publicadvocateapprovedcases: filedcaseId },
      $push: { publicadvocateassignedcases: filedcaseId },
    });

    // Associate the judge with the CourtCase
    courtCase.publicadvocate = publicadvocate;
    courtCase.caseStatus = 'caseAssignedToAPublicAdvocate';
    await courtCase.save();

    // Respond with a success message
    res.json({ message: 'Public Advocate assigned to Filedcase and associated with CourtCase successfully' });
  } catch (error) {
    // Handle errors and respond with an internal server error
    console.error('Error assigning Public Advocate:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

router.post('/reject-case/:caseId', authMiddleware, async (req, res) => {
  const { caseId } = req.params;

  try {
    // Find the case by ID and update its status to "Rejected by Court Admin"
    const rejectedCase = await Filedcase.findByIdAndUpdate(
      caseId,
      { $set: { progress: 'Rejected by Court Admin' } },
      { new: true }
    );

    // Remove the case from courtCases and add it to rejectedCases
    const adminId = req.user._id;
    await CourtAdmin.findByIdAndUpdate(
      adminId,
      { $pull: { courtCases: rejectedCase._id } },
      { new: true }
    );

    await CourtAdmin.findByIdAndUpdate(
      adminId,
      { $push: { rejectedCases: rejectedCase._id } },
      { new: true }
    );

    res.status(200).json({ message: 'Case rejected by Court Admin successfully' });
  } catch (error) {
    console.error('Error rejecting case by Court Admin:', error);
    res.status(500).json({ error: 'Internal server error' });
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

router.get('/scheduledConferences',authMiddleware, async (req, res) => {
  try {
    const clientId = req.user._id;

    // Find the client by ID with populated scheduledConferences
    const conferences = await CourtAdmin.findById(clientId).populate('scheduledConferences');
    if (!conferences) {
      return res.status(404).json({ error: 'User not found' });
    }


   // Return the scheduledConferences to the frontend
   res.json({ scheduledConferences: conferences.scheduledConferences });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






module.exports = router;