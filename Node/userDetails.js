const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    dateOfBirth: Number,
    email: {type: String, unique: true},
    phoneNumber: Number,
    address: String,
    aadharNumber: Number,
    gender : String,
},
{
    collection : "Userinfo",
}


);
mongoose.model("Userinfo", userDetailsSchema)

const AdvocateDetailsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    phoneNo: Number,
    licenseNumber: Number,
    barAssociation: String,
    jurisdiction: String,
    educationQualifications: String,
    yearsOfPractice: Number,
    practiceArea: String,
},
{
    collection : "Advocateinfo",
}


);
mongoose.model("Advocateinfo", AdvocateDetailsSchema)