const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  plaintiffDetails: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    caste: String,
    age: Number,
    relation: String,
    partyEmailAddresses: [String],
    partyPhoneNumbers: [String],
    partyAddresses: [String],
    pinCode: String,
    occupation: String,
    state: String,
    district: String,
    taluka: String,
    village: String,
  },
  defendantDetails: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    caste: String,
    age: Number,
    relation: String,
    partyEmailAddresses: [String],
    partyPhoneNumbers: [String],
    partyAddresses: [String],
    pinCode: String,
    occupation: String,
    state: String,
    district: String,
    taluka: String,
    village: String,
  },
  caseDetails: {
    caseNumber: String,
    caseType: String,
    courtName: String,
    hearingDate: Date,
    // Add other case-related fields
  },
  documents: [
    {
      title: String,
      fileUrl: String,
      // Add other document-related fields
    },
  ],
  paymentDetails: {
    amount: Number,
    paymentMethod: String,
    // Add other payment-related fields
  },
});

const Case = mongoose.model('filedcase', caseSchema);

module.exports = Case;
