// app.js (or server.js)
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const meetingRoutes = require('./routes/meetingRoutes');
const db = require('./db'); // Make sure to update the path

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/meetings', meetingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
