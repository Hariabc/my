import React, { useState } from 'react';
import StateDistrictSelector from './Dropdown2';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const DefendantDetailsForm = ({ onChange, onNext }) => {
  const [defendantData, setDefendantData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    caste: '',
    age: '',
    relation: '',
    partyEmailAddresses: '',
    partyPhoneNumbers: '',
    partyAddresses: '',
    pinCode: '',
    occupation: '',
    state: '',
    district: '',
    taluka: ''

    // Add more defendant fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDefendantData({ ...defendantData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      showConfirmation();
    }
  };

  const validateForm = () => {
    // Perform custom validations here
    // Example: Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(defendantData.partyEmailAddresses)) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Example: Check if age is a positive number
    if (parseInt(defendantData.age) <= 0 || isNaN(parseInt(defendantData.age))) {
      alert('Please enter a valid age.');
      return false;
    }

    // Example: Check if phone number is valid
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(defendantData.partyPhoneNumbers)) {
      alert('Please enter a valid phone number (10 digits only).');
      return false;
    }

    // Example: Check if full name contains only alphabets and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(defendantData.fullName)) {
      alert('Please enter a valid full name (only alphabets and spaces).');
      return false;
    }

    // Example: Check if gender is selected
    if (!defendantData.gender) {
      alert('Please select a gender.');
      return false;
    }

    // Example: Check if party address is not empty
    if (!defendantData.partyAddresses.trim()) {
      alert('Please enter a party address.');
      return false;
    }

    // Example: Check if pin code is valid
    const pinCodeRegex = /^[0-9]{6}$/;
    if (!pinCodeRegex.test(defendantData.pinCode)) {
      alert('Please enter a valid pin code (6 digits only).');
      return false;
    }

    // Example: Check if occupation is not empty
    if (!defendantData.occupation.trim()) {
      alert('Please enter an occupation.');
      return false;
    }


    // Add more custom validations as needed

    return true;
  };

  const showConfirmation = () => {
    confirmAlert({
      title: 'Confirm Submission',
      message: 'Are you sure you want to submit the form?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            onChange(defendantData);
            onNext();
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleStateSelect = (selectedState) => {
    setDefendantData({ ...defendantData, state: selectedState });
  };

  const handleDistrictSelect = (selectedDistrict) => {
    setDefendantData({ ...defendantData, district: selectedDistrict });
  };


  return (
    <div className="defendant-form">
      <h2 className="form-section-title">Defendant Details</h2>
      {/* {isDefendantFormSubmitted ? (
        <CaseDetailsForm />
      ) : ( */}
        <form onSubmit={handleSubmit} className="form-grid">
          {/* Personal Information */}
          <div className="personal-details-section">
            <h3 className="section-title">Personal Details</h3>
            <div className="grid-half">
              <label className="form-label">
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  value={defendantData.fullName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Gender:
                <select
                  name="gender"
                  value={defendantData.gender}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="form-label">
                Date of Birth:
                <input
                  type="date"
                  name="dateOfBirth"
                  value={defendantData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
            </div>
            <div className="grid-half">
              <label className="form-label">
                Caste:
                <select
                  name="caste"
                  value={defendantData.caste}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Caste</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <label className="form-label">
                Age:
                <input
                  type="number"
                  name="age"
                  value={defendantData.age}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Relation:
                <select
                  name="relation"
                  value={defendantData.relation}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Relation</option>
                  <option value="self">Self</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="wife">Wife</option>
                  <option value="husband">Husband</option>
                  {/* Add more options as needed */}
                </select>
              </label>
            </div>
          </div>

          <div className="contact-details-section">
              <h3 className="section-title">Contact Details</h3>
              <div className="grid-half">
                <label className="form-label">
                  Email:
                  <input
                    type="email"
                    name="partyEmailAddresses"
                    value={defendantData.partyEmailAddresses}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Mobile No:
                  <input
                    type="tel"
                    name="partyPhoneNumbers"
                    value={defendantData.partyPhoneNumbers}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </label>
              </div>
              <div className="grid-half">
                <label className="form-label">
                  Address:
                  <input
                    type="text"
                    name="partyAddresses"
                    value={defendantData.partyAddresses}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Pin Code:
                  <input
                    type="text"
                    name="pinCode"
                    value={defendantData.pinCode}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Occupation:
                  <input
                    type="text"
                    name="occupation"
                    value={defendantData.occupation}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </label>
              </div>
            </div>
  
            {/* State Details */}
            <div className="state-details-section">
              <h3 className="section-title">State Details</h3>
              <div className="grid-half">
              <StateDistrictSelector
            onSelectState={handleStateSelect}
            onSelectDistrict={handleDistrictSelect}
            isRequired={true} 
          />
              </div>
              <div className="grid-half">
                <label className="form-label">
                  Taluka:
                  <select
                    name="taluka"
                    value={defendantData.taluka}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Taluka</option>
                    <option value="taluka1">Taluka 1</option>
                    <option value="taluka2">Taluka 2</option>
                    {/* Add more options as needed */}
                  </select>
                </label>
                <label className="form-label">
                  Village:
                  <select
                    name="village"
                    value={defendantData.village}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Village</option>
                    <option value="village1">Village 1</option>
                    <option value="village2">Village 2</option>
                    {/* Add more options as needed */}
                  </select>
                </label>
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="submit-section">
              <button type="submit" className="submit-button">
                Submit Defendent Details
              </button>
            </div>
          </form>
        {/* )} */}
      </div>
    );
  };

export default DefendantDetailsForm;