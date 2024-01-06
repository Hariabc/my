import React, { useState } from 'react';
import StateDistrictSelector from './Dropdown2';
const PlaintiffDetailsForm = ({ onChange, onNext }) => {
  const [plaintiffData, setPlaintiffData] = useState({
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
    taluka: '',
    village: '',
    // Add more plaintiff fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaintiffData({ ...plaintiffData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(plaintiffData);
    console.log(plaintiffData)
    onNext();
  };
  const handleStateSelect = (selectedState) => {
    setPlaintiffData({ ...plaintiffData, state: selectedState });
  };

  const handleDistrictSelect = (selectedDistrict) => {
    setPlaintiffData({ ...plaintiffData, district: selectedDistrict });
  };
  return (
    <div className="plaintiff-form" onSubmit={handleSubmit}>
      <h2 className="form-section-title">Plaintiff Details</h2>
        <form  className="form-grid">
          {/* Personal Information */}
          <div className="personal-details-section">
            <h3 className="section-title">Personal Details</h3>
            <div className="grid-half">
              <label className="form-label">
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  value={plaintiffData.fullName}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Gender:
                <select
                  name="gender"
                  value={plaintiffData.gender}
                  onChange={handleChange}
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
                  value={plaintiffData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
            </div>
            <div className="grid-half">
              {/* Remove the Nationality field here */}
              <label className="form-label">
                Caste:
                <select
                  name="caste"
                  value={plaintiffData.caste}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Caste</option>
                  {/* Add caste options here */}
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
                  value={plaintiffData.age}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Relation:
                <select
                  name="relation"
                  value={plaintiffData.relation}
                  onChange={handleChange}
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
          {/* Contact Details */}
          <div className="contact-details-section">
            <h3 className="section-title">Contact Details</h3>
            <div className="grid-half">
              <label className="form-label">
                Email:
                <input
                  type="email"
                  name="partyEmailAddresses"
                  value={plaintiffData.partyEmailAddresses}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Mobile No:
                <input
                  type="tel"
                  name="partyPhoneNumbers"
                  value={plaintiffData.partyPhoneNumbers}
                  onChange={handleChange}
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
                  value={plaintiffData.partyAddresses}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Pin Code:
                <input
                  type="text"
                  name="pinCode"
                  value={plaintiffData.pinCode}
                  onChange={handleChange}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Occupation:
                <input
                  type="text"
                  name="occupation"
                  value={plaintiffData.occupation}
                  onChange={handleChange}
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
          />
            </div>
            <div className="grid-half">
              <label className="form-label">
                Taluka:
                <select
                  name="taluka"
                  value={plaintiffData.taluka}
                  onChange={handleChange}
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
                  value={plaintiffData.village}
                  onChange={handleChange}
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
              Submit Plaintiff Details
            </button>
          </div>
        </form>
      {/* )} */}
    </div>
  );
};

export default PlaintiffDetailsForm;