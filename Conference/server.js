const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Enable CORS
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pre-trail-Judge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Check if the database connection is successful
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


const Meeting = require('./models/meeting');

// Create Event Schema
const meetingSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  meetingID: String,
});

// Create Meeting model
const MeetingModel = mongoose.model('Meeting', meetingSchema);

// API Endpoint to Create a Meeting
app.post('/api/conferences', async (req, res) => {
  try {
    // Generate meetingID
    const generatedMeetingID = generateMeetingID();
    
    // Create a new meeting with meetingID
    const newMeeting = await Meeting.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      meetingID: generatedMeetingID,
    });

    res.status(201).json(newMeeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});







// API Endpoint to Get All Events
app.get('/api/conferences', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API Endpoint to Update an Event
app.put('/api/conferences/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        
      },
      { new: true }
    );

    res.json(updatedMeeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// API Endpoint to Delete an Event
app.delete('/api/conferences/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Conference not found' });
    }

    res.json({ message: 'Conference deleted successfully', deletedMeeting });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});








