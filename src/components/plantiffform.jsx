import React, { useState } from 'react';

const PlaintiffForm = ({ formData, onChange, onNext }) => {
  const [plaintiffData, setPlaintiffData] = useState(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(plaintiffData);
    // Optionally, you can reset the form data after submission
    setPlaintiffData({
      fullName: '',
      gender: '',
      dateOfBirth: '',
      caste: '',
      age: '',
      relation: '',
      partyName: '',
      partyAddresses: '',
      partyPhoneNumbers: '',
      partyEmailAddresses: '',
      occupation: '',
      state: '',
      district: '',
      taluka: '',
      village: '',
      // Add more fields here
      // field1: '',
      // field2: '',
      // field3: '',
      // ...
    });
    // Proceed to the next step
    onNext();
  };

  return (
    <div className="plaintiff-form">
      <h2 className="form-section-title">Plaintiff Details</h2>
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
                value={plaintiffData.fullName}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, fullName: e.target.value })}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Gender:
              <select
                name="gender"
                value={plaintiffData.gender}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, gender: e.target.value })}
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
                onChange={(e) => setPlaintiffData({ ...plaintiffData, dateOfBirth: e.target.value })}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Caste:
              <select
                name="caste"
                value={plaintiffData.caste}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, caste: e.target.value })}
                className="form-input"
              >
                <option value="">Select Caste</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </label>
            <label className="form-label">
              Age:
              <input
                type="number"
                name="age"
                value={plaintiffData.age}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, age: e.target.value })}
                className="form-input"
              />
            </label>
            {/* Add more fields */}
          </div>
          <div className="grid-half">
            <label className="form-label">
              Relation:
              <select
                name="relation"
                value={plaintiffData.relation}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, relation: e.target.value })}
                className="form-input"
              >
                <option value="">Select Relation</option>
                <option value="self">Self</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="wife">Wife</option>
                <option value="husband">Husband</option>
              </select>
            </label>
            <label className="form-label">
              Party Name:
              <input
                type="text"
                name="partyName"
                value={plaintiffData.partyName}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, partyName: e.target.value })}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Party Addresses:
              <input
                type="text"
                name="partyAddresses"
                value={plaintiffData.partyAddresses}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, partyAddresses: e.target.value })}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Party Phone Numbers:
              <input
                type="text"
                name="partyPhoneNumbers"
                value={plaintiffData.partyPhoneNumbers}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, partyPhoneNumbers: e.target.value })}
                className="form-input"
              />
            </label>
            {/* Add more fields */}
          </div>
        </div>
        {/* Contact Details */}
        <div className="contact-details-section">
          <h3 className="section-title">Contact Details</h3>
          <div className="grid-half">
            <label className="form-label">
              Party Email Addresses:
              <input
                type="email"
                name="partyEmailAddresses"
                value={plaintiffData.partyEmailAddresses}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, partyEmailAddresses: e.target.value })}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Occupation:
              <input
                type="text"
                name="occupation"
                value={plaintiffData.occupation}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, occupation: e.target.value })}
                className="form-input"
              />
            </label>
            {/* Add more fields */}
          </div>
          <div className="grid-half">
            {/* Add more fields */}
          </div>
        </div>
        {/* State Details */}
        <div className="state-details-section">
          <h3 className="section-title">State Details</h3>
          <div className="grid-half">
            <label className="form-label">
              State:
              <select
                name="state"
                value={plaintiffData.state}
                onChange={(e) => setPlaintiffData({ ...plaintiffData, state: e.target.value })}
                className="form-input"
              >
                <option value="">Select State</option>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
              </select>
            </label>
            {/* Add more fields */}
          </div>
          <div className="grid-half">
            {/* Add more fields */}
          </div>
        </div>
        {/* Submit Button */}
        <div className="submit-section">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
    </div>
  );
};

export default PlaintiffForm;