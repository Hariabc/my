import React, { useState } from 'react';
import './Register.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const practiceAreas = ["Civil Law", "Criminal Law", "Family Law", "Corporate Law", "Tax Law", "Intellectual Property Law", "Environmental Law", "Human Rights Law", "International Law", "Other"];
const educationQualifications = ["Bachelor of Laws (LL.B.)", "Master of Laws (LL.M.)", "Doctor of Juridical Science (J.S.D.)", "Other"];
const barAssociations = ["Bar Council of India", "State Bar Council", "High Court Bar Association", "Supreme Court Bar Association", "Other"];
const jurisdictions = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry", "Other"];

const AdvocateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    licenseNumber: '',
    barAssociation: '',
    jurisdiction: '',
    educationQualifications: '',
    yearsOfPractice: '',
    practiceArea: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/privateadvocate/register', formData);

      if (response.status === 201) {
        toast.success('Email has been sent to set the password');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='register-main-box'>
      <ToastContainer/>
      <h3 className="user-form-title">Advocate Registration</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <label className="form-label">
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Phone No:
          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          License Number:
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Bar Association:
          <select name="barAssociation" value={formData.barAssociation} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {barAssociations.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Jurisdiction:
          <select name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {jurisdictions.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Education Qualifications:
          <select name="educationQualifications" value={formData.educationQualifications} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {educationQualifications.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Years of Practice:
          <input type="text" name="yearsOfPractice" value={formData.yearsOfPractice} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Practice Area:
          <select name="practiceArea" value={formData.practiceArea} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {practiceAreas.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
        </label>
        <div className="register">
          <button type="submit" className="form-button">
            Register as Advocate
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvocateForm;