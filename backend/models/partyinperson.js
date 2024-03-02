const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({

  caseNumber: {
    type: String,
    required: true,
    unique: true
  },
  progress: {
    type: String,
    enum: ['pending', "sent to Court Admin","Approved by Court Admin","Rejected by Court Admin",'inProgress', 'closed'],
    default: 'pending',
    required: true,
  },

  
  filecasetype: {
    type: String,
    enum: ['partyinperson', 'privateAdvocate', 'publicAdvocate'],
    default: 'partyinperson',
    required:true
  },
  plaintiffDetails: {
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
  defendantDetails: {
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
  caseDetails: {
    caseType: String,
    title: String,
    caseSummary: String,
    causeOfAction: String,
    reliefSought: String,
    dateOfCauseOfAction: Date,
    state: String,
    district: String,
    taluka: String,
    village: String,
    courtType: String,
    courtType: String,
    courtState: String,
    courtDistrict: String,
    courtName: String,
    caseCategory: String,
  },
  documents: [{
    filename: String,
    url: String
  }// Store URL or file path
    // Add more document fields as needed
  ],
  paymentDetails: {
    paymentMethod: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String,
  },
});


const Case = mongoose.model('Filedcase', caseSchema);

module.exports = Case;
