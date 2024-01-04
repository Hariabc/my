const mongoose = require('mongoose');

const caseDetailsSchema = new mongoose.Schema({
  // Plaintiff Details
  plaintiff: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    caste: String,
    age: Number,
    relation: String,
    partyName: String,
    partyAddresses: String,
    partyPhoneNumbers: String,
    partyEmailAddresses: String,
    occupation: String,
    state: String,
    district: String,
    taluka: String,
    village: String,
  },

  // Defendant Details
  defendant: {
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    caste: String,
    age: Number,
    relation: String,
    partyName: String,
    partyAddresses: String,
    partyPhoneNumbers: String,
    partyEmailAddresses: String,
    occupation: String,
    state: String,
    district: String,
    taluka: String,
    village: String,
  },

    // Case Details
    CaseDetails: {
        caseType: String,
        title: String,
        caseSummary: String,
        causeOfAction: String,
        reliefSought: String,
        dateOfCauseOfAction: Date,
        courtType: String,
        courtState: String,
        courtDistrict: String,
        courtName: String,
        caseCategory: String
    },

  // Documents
  documents: [
    {
      documentName: String,
      documentURL: String,
    },
  ],

    paymentDetails: {
        paymentMethod: String,
        cardNumber: String,
        expiryDate: String,
        cvv: String,
    }

});

const CaseDetails = mongoose.model('CaseDetails', caseDetailsSchema);

module.exports = CaseDetails;
