const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    unique: true,
    required: true
  },
  caseType: {
    type: String,
    enum: ['partyinperson', 'publicAdvocate', 'privateAdvocate'],
    required: true
  },
  caseStatus: {
    type: String,
    enum: [
      'pending',
      'sentToCourtAdmin',
      'approvedByCourtAdminForAssigningJudge',
      'approvedByCourtAdminForAssigningPublicAdvocate',
      'rejectedByCourtAdmin',
      'preTrial',
      'inProgress',
      'completed'
    ],
    required: true
  },
  caseDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  },
 
  courtAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourtAdmin',
    // required: true
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge',
    // required: true
  },

  hearings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hearing'
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

const hearingSchema = new mongoose.Schema({
  hearingId: {
    type: Number,
    unique: true,
    required: true
  },
  hearingDate: {
    type: Date,
    required: true
  },
  hearingTime: {
    type: String,
    required: true
  },
  hearingMode: {
    type: String,
    enum: ['physical', 'virtual'],
    required: true
  },
  hearingStatus: {
    type: String,
    enum: ['scheduled', 'inProgress', 'completed', 'adjourned', 'cancelled'],
    required: true
  },
  hearingNotes: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
    required: true
  },
  orderType: {
    type: String,
    enum: ['courtDecision', 'ruling', 'judgment', 'dismissal', 'settlement'],
    required: true
  },
  orderContent: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const Case = mongoose.model('Case', caseSchema);
const Hearing = mongoose.model('Hearing', hearingSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Case, Hearing, Order };