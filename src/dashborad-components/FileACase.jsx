// CaseFilingForm.jsx
import React, { useState } from 'react';
import './fileacase.css'; // Import the CSS file

const CaseFilingForm = () => {
  const [formData, setFormData] = useState({
    district: '',
    establishment: '',
    caseType: '',
    reliefSought: '',
    partyDetails: {
      defendantName: '',
      defendantMobile: '',
    },
  });

  const districts = ["District A", "District B", "District C"];
  const establishments = ["Establishment X", "Establishment Y", "Establishment Z"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePartyDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      partyDetails: {
        ...prevData.partyDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleReset = () => {
    setFormData({
      district: '',
      establishment: '',
      caseType: '',
      reliefSought: '',
      partyDetails: {
        defendantName: '',
        defendantMobile: '',
      },
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {/* District Dropdown */}
        <div className="form-box">
          <label htmlFor="district">Select District:</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Establishment Dropdown */}
        <div className="form-box">
          <label htmlFor="establishment">Select Establishment:</label>
          <select
            id="establishment"
            name="establishment"
            value={formData.establishment}
            onChange={handleInputChange}
          >
            <option value="">Select Establishment</option>
            {establishments.map((establishment) => (
              <option key={establishment} value={establishment}>
                {establishment}
              </option>
            ))}
          </select>
        </div>

        {/* Case Information */}
        <div className="form-section">
          <h2 className="form-section-title">Case Information</h2>
          <div className="form-box">
            <label htmlFor="caseType">Case Type:</label>
            <select
              id="caseType"
              name="caseType"
              value={formData.caseType}
              onChange={handleInputChange}
            >
              <option value="">Select Case Type</option>
              <option value="civil">Civil</option>
              <option value="criminal">Criminal</option>
            </select>
          </div>
          <div className="form-box">
            <label htmlFor="reliefSought">Relief Sought:</label>
            <input
              type="text"
              id="reliefSought"
              name="reliefSought"
              value={formData.reliefSought}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Party Details */}
        <div className="form-section">
          <h2 className="form-section-title">Party Details</h2>
          <div className="form-box">
            <label htmlFor="defendantName">Defendant Name:</label>
            <input
              type="text"
              id="defendantName"
              name="defendantName"
              value={formData.partyDetails.defendantName}
              onChange={handlePartyDetailsChange}
            />
          </div>
          <div className="form-box">
            <label htmlFor="defendantMobile">Defendant Mobile No:</label>
            <input
              type="text"
              id="defendantMobile"
              name="defendantMobile"
              value={formData.partyDetails.defendantMobile}
              onChange={handlePartyDetailsChange}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="reset" className="reset-button">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseFilingForm;
