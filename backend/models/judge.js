// Define the judge schema
const mongoose = require("mongoose");
const judgeSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
  },
   name: {
    type: String,
    required: true
    },
    username: {
      type: String,
    //   required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
    //   required: true
    },
    password_token: {
        type: String
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    education: {
      type: String,
      required: true
    },
    court: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Court'
    },
  courtAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'CourtAdmin'
    },
    cases: [
      {
        case: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Case'
        }
      }
    ]
}, { timestamps: true });
  
module.exports = mongoose.model('Judge', judgeSchema);
