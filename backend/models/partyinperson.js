const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({

  caseNumber: {
    type: String,
    required: true,
    unique: true
  },
  progress: {
    type: String,
    // required: true,
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
  plaintiffAdvocate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advocate',
    required: function () {
      return ['privateAdvocate', 'publicAdvocate'].includes(this.filecasetype);
    }
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
  defendantAdvocate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advocate',
    required: function () {
      return ['privateAdvocate', 'publicAdvocate'].includes(this.filecasetype);
    }
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
    document1: String, // Store URL or file path
    document2: String,
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
