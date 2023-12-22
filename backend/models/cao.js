const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true, unique: true },
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminPassword: { type: String, required: true }
  });
  
  // Create the model for court administrative officer
  const Admin = mongoose.model('Admin', adminSchema);