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

judgeConferenceSchema.pre('save', async function (next) {
 
  try {
    console.log("Middleware triggered!");
    // Find the User with the matching firstName and lastName for plaintiffName
    const plaintiffUser = await mongoose.model('User').findOne({
      firstName: this.plaintiffName.split(' ')[0],
      lastName: this.plaintiffName.split(' ')[1],
    });

    // If found, update the scheduledConferences array
    if (plaintiffUser) {
      plaintiffUser.scheduledConferences.push(this._id);
      await plaintiffUser.save();
    }

    // Find the User with the matching firstName and lastName for defendantName
    const defendantUser = await mongoose.model('User').findOne({
      firstName: this.defendantName.split(' ')[0],
      lastName: this.defendantName.split(' ')[1],
    });

    // If found, update the scheduledConferences array
    if (defendantUser) {
      defendantUser.scheduledConferences.push(this._id);
      await defendantUser.save();
    }

    next();
  } catch (error) {
    console.error("Error in middleware:", error);
    next(error);
  }
});


const JudgeConference = mongoose.model('JudgeConference', judgeConferenceSchema);

module.exports = JudgeConference;