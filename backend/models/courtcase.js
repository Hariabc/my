const mongoose = require('mongoose');
const { Schema } = mongoose;

const caseSchema = new Schema({
  category: { type: String, required: true },
  type: { type: String, required: true },
  judge: { type: Schema.Types.ObjectId, ref: 'Judge' },
  client: { type: Schema.Types.ObjectId, ref: 'Client' }, // Reference to the client who filed the case
  advocate: { type: Schema.Types.ObjectId, ref: 'Advocate' },
  hearingDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'adjourned', 'resolved', 'cancelled'],
    default: 'pending',
  },
  hearingLocation: { type: String },
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
  caseHistory: [
    {
      event: { type: String, required: true },
      date: { type: Date, default: Date.now },
      details: { type: String },
    },
  ],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  respondents: [
    {
      respondentType: { type: String, required: true },
      name: { type: String, required: true },
      contact: {
        phone: { type: String },
        email: { type: String },
        address: { type: String },
      },
    },
  ],
});

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;
