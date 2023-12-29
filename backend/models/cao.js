const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  country: String,
  // Other court details can be added as needed
});

const Court = mongoose.model('Court', courtSchema);

const courtAdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Court Administrative Officer',
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court', // Reference to the Court model
    // required: true,
  },
  department: String,
  experienceYears: Number,
  // Add more fields as needed
});

const CourtAdmin = mongoose.model('CourtAdmin', courtAdminSchema);

module.exports = { Court, CourtAdmin };
