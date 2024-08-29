const mongoose = require('mongoose');


const courtAdminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  courtAdminId: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: 'Court Administrative Officer',
  },
 
  courtCases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  }],

  AllCases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  }],

  rejectedCases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  }],

  judgeapprovedcases:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  }],
  
  judgeAssignedCases:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  }],

  publicadvocateapprovedcases:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  }],

  publicadvocateassignedcases:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filedcase',
  }],
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true,
  },

  judges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge'
  }],
  
  Publicadvocates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advocate'
 }],
 scheduledConferences: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'JudgeConference',
}],
 
});

module.exports= mongoose.model('CourtAdmin', courtAdminSchema);