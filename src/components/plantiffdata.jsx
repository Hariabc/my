import React, { useState } from 'react';

const PlaintiffForm = ({ formData, onChange, onNext }) => {
  const [isPlaintiffFormSubmitted, setIsPlaintiffFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handlePlaintiffData = (e) => {
    e.preventDefault();
    setIsPlaintiffFormSubmitted(true);
    onNext();
  };

  return (
    <div className="plaintiff-form">
      <h2 className="form-section-title">..</h2>
      {isPlaintiffFormSubmitted ? (
        <div>
          {/* Show submitted message or next form */}
          <p>Plaintiff Form Submitted!</p>
        </div>
      ) : (
        <form onSubmit={handlePlaintiffData} className="form-grid">
        {/* Personal Information */}
        <div className="personal-details-section">
          <h3 className="section-title">Personal Details</h3>
          <div className="grid-half">
            <label className="form-label">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Gender:
              <select
                name="gender"
                value={formData.gender}
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
                value={formData.dateOfBirth}
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
                value={formData.caste}
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
                value={formData.age}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Relation:
              <select
                name="relation"
                value={formData.relation}
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
                value={formData.partyEmailAddresses}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Mobile No:
              <input
                type="tel"
                name="partyPhoneNumbers"
                value={formData.partyPhoneNumbers}
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
                value={formData.partyAddresses}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Pin Code:
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Occupation:
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
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
            <label className="form-label">
              State:
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select State</option>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label className="form-label">
              District:
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select District</option>
                <option value="district1">District 1</option>
                <option value="district2">District 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
          <div className="grid-half">
            <label className="form-label">
              Taluka:
              <select
                name="taluka"
                value={formData.taluka}
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
                value={formData.village}
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
    )}
  </div>
);
};

export default PlaintiffForm;