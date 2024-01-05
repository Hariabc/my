// models/Form.js
const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  plaintiffData: Object,
  defendantData: Object,
  caseDetailsData: Object,
  documentsData: Object,
  paymentData: Object,
});

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;
