// Assuming you have a model/schema for Advocate in your backend (Advocate.js)
const mongoose = require('mongoose');

const advocateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  barAssociation: {
    type: String,
    required: true,
  },
  jurisdiction: {
    type: String,
    required: true,
  },
  educationQualifications: {
    type: String,
    required: true,
  },
  yearsOfPractice: {
    type: String,
    required: true,
  },
  practiceArea: {
    type: String,
    required: true,
  },
  password: {
    type:String
  },
  temp_token: {
    type: String,
  },
}
);

module.exports = mongoose.model('privateAdvocate', advocateSchema);
