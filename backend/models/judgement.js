const mongoose = require('mongoose');
const {Case} = require('./courtcase');
const judgementSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },

  judgementId: {
    type: String,
    unique: true,
    required: true
  },
  courtName: {
    type: String,
    required: true,
  },
  judgeName: {
    type: String,
    required: true,
  },
  dateOfJudgment: {
    type: Date,
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
        required:true,
    },
  factualBackground: {
    type: String,
    required: true,
  },
  legalIssues: {
    type: String,
    required: true,
  },
    plaintiffArg: {
      type: String,
      required: true,
    },
    defendantArg: {
      type: String,
      required: true,
    },
  analysisAndDecision: {
    type: String,
    required: true,
  },
  ordersAndRelief: {
    type: String,
    required: true,
  },
  disposition: {
    type: String,
    required: true,
  },
  conclusion: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge',
    required: true,
  },
});

judgementSchema.pre('save', async function (next) {
    try {
      // Find the corresponding Case based on caseNumber
      const existingCase = await Case.findOne({ caseNumber: this.caseNumber });
  
      if (existingCase) {
        // Push the ObjectId of this Order to the orders field of the Case
        existingCase.judgements.push(this._id);
        await existingCase.save();
      }
      next();
    } catch (error) {
      next(error);
    }
  });

const Judgement = mongoose.model('Judgement', judgementSchema);

module.exports = Judgement;
