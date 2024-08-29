import React, { useState } from 'react';
import './Register.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const practiceAreas = [
  "Civil Law", "Criminal Law", "Family Law", "Corporate Law", "Tax Law",
  "Intellectual Property Law", "Environmental Law", "Human Rights Law", "International Law", "Other"
];
const educationQualifications = [
  "Bachelor of Laws (LL.B.)", "Master of Laws (LL.M.)", "Doctor of Juridical Science (J.S.D.)", "Other"
];
const barAssociations = [
  "Bar Council of India", "State Bar Council", "High Court Bar Association",
  "Supreme Court Bar Association", "Other"
];
const jurisdictions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep",
  "Puducherry", "Other"
];
const gender=["Male","Female","Others"]


const AdvocateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    gender:'',
    email: '',
    phoneNumber: '',
    licenseNumber: '',
    barAssociation: '',
    jurisdiction: '',
    educationQualifications: '',
    yearsOfPractice: '',
    practiceArea: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    gender:'',
    email: '',
    phoneNumber: '',
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

  const validLicenseNumbers = ['ABC123', 'DEF456', 'GHI789'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validations for each field
    if (formData.firstName.trim() === '') {
      validationErrors.firstName = 'First name is required';
    } else {
      validationErrors.firstName = '';
    }
    if (formData.username.trim() === '') {
      validationErrors.username = 'username is required';
    } else {
      validationErrors.username = '';
    }

    if (formData.lastName.trim() === '') {
      validationErrors.lastName = 'Last name is required';
    } else {
      validationErrors.lastName = '';
    }

    if (formData.email.trim() === '') {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = 'Invalid email format';
    } else {
      validationErrors.email = ''
    }

    if (formData.phoneNumber.trim() === '') {
      validationErrors.phoneNumber = 'Phone number is required';
    } else if (!isValidPhone(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Invalid phone number format';
    } else {
      validationErrors.phoneNumber = '';
    }

    if (formData.licenseNumber.trim() === '') {
      validationErrors.licenseNumber = 'License number is required';
    } else if (!validLicenseNumbers.includes(formData.licenseNumber.trim().toUpperCase())) {
      validationErrors.licenseNumber = 'Invalid license number';
    } else {
      validationErrors.licenseNumber = '';
    }
    if (formData.gender.trim() === '') {
      validationErrors.gender = 'gender is required';
    } else {
      validationErrors.gender = '';
    }
    if (formData.barAssociation.trim() === '') {
      validationErrors.barAssociation = 'Bar association is required';
    } else {
      validationErrors.barAssociation = '';
    }

    if (formData.jurisdiction.trim() === '') {
      validationErrors.jurisdiction = 'Jurisdiction is required';
    } else {
      validationErrors.jurisdiction = '';
    }

    if (formData.educationQualifications.trim() === '') {
      validationErrors.educationQualifications = 'Education qualification is required';
    } else {
      validationErrors.educationQualifications = '';
    }

    if (formData.yearsOfPractice.trim() === '') {
      validationErrors.yearsOfPractice = 'Years of practice is required';
    } else if (isNaN(Number(formData.yearsOfPractice))) {
      validationErrors.yearsOfPractice = 'Years of practice must be a number';
    } else {
      validationErrors.yearsOfPractice = '';
    }

    if (formData.practiceArea.trim() === '') {
      validationErrors.practiceArea = 'Practice area is required';
    } else {
      validationErrors.practiceArea = '';
    }

    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((error) => error !== '');

    if (hasErrors) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/advocate/private/register', formData);
      const { username} = formData;
      const userResponse = await axios.post('https://api-049FF9C5-DFDC-4991-B147-D2FDFDC72C54.sendbird.com/v3/users', {
          user_id: username,
          nickname: username,
          profile_url: 'https://example.com/profile-image.jpg'
        },{headers: {
          'Content-Type': 'application/json',
          'Api-Token': '2ef385818c2c2b64c09437dfbf7f5166c539d8f9',
        },}
        );
        console.log('User Response:', userResponse.data)
      if (response.status === 201) {
        toast.success('Email has been sent to set the password');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  // Custom validation functions
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
  };


  return (
    <div className='register-main-box'>
      <ToastContainer/>
      <h3 className="user-form-title">Advocate Registration</h3>
      <form onSubmit={handleSubmit} className="user-form">
        {/* First Name */}
        <label className="form-label">
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </label>
        {/* Last Name */}
        <label className="form-label">
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </label>
        <label className="form-label">
          username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-input" />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </label>
        {/* Email */}
        <label className="form-label">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </label>
        {/* Phone No */}
        <label className="form-label">
          Phone No:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-input" />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </label>
        <label className="form-label">
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {gender.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </label>
        {/* License Number */}
        <label className="form-label">
          License Number:
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="form-input" />
          {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
        </label>
        {/* Bar Association */}
        <label className="form-label">
        Bar Association:
          <select name="barAssociation" value={formData.barAssociation} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {barAssociations.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
          {errors.barAssociation && <span className="error-message">{errors.barAssociation}</span>}
        </label>
        {/* Jurisdiction */}
        <label className="form-label">
          Jurisdiction:
          <select name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {jurisdictions.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
          {errors.jurisdiction && <span className="error-message">{errors.jurisdiction}</span>}
        </label>
        {/* Education Qualifications */}
        <label className="form-label">
          Education Qualifications:
          <select name="educationQualifications" value={formData.educationQualifications} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {educationQualifications.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
          {errors.educationQualifications && <span className="error-message">{errors.educationQualifications}</span>}
        </label>
        {/* Years of Practice */}
        <label className="form-label">
          Years of Practice:
          <input type="text" name="yearsOfPractice" value={formData.yearsOfPractice} onChange={handleChange} className="form-input" />
          {errors.yearsOfPractice && <span className="error-message">{errors.yearsOfPractice}</span>}
        </label>
        {/* Practice Area */}
        <label className="form-label">
          Practice Area:
          <select name="practiceArea" value={formData.practiceArea} onChange={handleChange} className="form-select">
            <option value="">Select an option</option>
            {practiceAreas.map((option) => (
              <option value={option} key={option}>{option}</option>
            ))}
          </select>
          {errors.practiceArea && <span className="error-message">{errors.practiceArea}</span>}
        </label>
        {/* Add other fields in a similar manner */}
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
