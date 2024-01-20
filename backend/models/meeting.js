const mongoose = require('mongoose');

const judgeConferenceSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
  },
  plaintiffName: {
    type: String,
    required: true,
  },
  defendantName: {
    type: String,
    required: true,
  },
  advocateName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  meetingID: {
    type: String,
    required: true,
  },

  hearingMode: {
    type: String,
    default:"virtual",
    required:true
  },
  hearingStatus: {
        type: String,
        enum: ['scheduled', 'inProgress', 'completed', 'adjourned', 'cancelled'],
        // required: true
      },

  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge',
    required: true,
  },
});

const JudgeConference = mongoose.model('JudgeConference', judgeConferenceSchema);

module.exports = JudgeConference;