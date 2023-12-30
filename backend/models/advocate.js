const mongoose = require('mongoose');

const advocateSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  educationQualification: {
    type: String,
    required: true
  },
  jurisdiction: {
    type: String,
    required: true
  },
  barAssociation: {
    type: String,
    required: true
  },
  yearsOfPractice: {
    type: Number,
    required: true
  },
  practiceArea: {
    type: String,
    required: true
  },
  isPrivateAdvocate: {
    type: Boolean,
    required: true
  },
  isAppointedByCourtAdmin: {
    type: Boolean,
    required: true
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court'
  },
  cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case'
  }],
  // additional fields you may consider adding
  // ...
}, { timestamps: true });

module.exports= mongoose.model('Advocate', advocateSchema);
