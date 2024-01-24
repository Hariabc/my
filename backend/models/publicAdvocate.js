const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  progress: {
    type: String,
    enum: ['pending', "sent to Court Admin", "Approved by Court Admin", "Rejected by Court Admin", 'inProgress', 'completed'],
    default: 'pending',
    required: true,
  },
  filecasetype: {
    type: String,
    enum: ['partyinperson', 'privateAdvocate', 'publicAdvocate'],
    default: 'partyinperson',
    required: true,
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
    courtState: String,
    courtDistrict: String,
    courtName: String,
    caseCategory: String,
  },
  documents: [{
    filename: String,
    url: String,
  }],
  paymentDetails: {
    paymentMethod: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String,
  },
    publicAdvocateFormDetails: {
        reason: {
            type: String,
            required:true
        },
        IncomeCertificate: [{
            filename: String,
            url:String
          }
        ],
        IdentificationDocument: [{
            filename: String,
            url:String
          }
          ],
    }
});

const Case = mongoose.model('Publicadvocatecase', caseSchema);

module.exports = Case;
