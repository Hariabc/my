// PrivateAdvocate.js

import React, { useState } from 'react';
import './privateadvocate.css';

const PrivateAdvocate = () => {
  const [formData, setFormData] = useState({
    advocateFullName: '',
    advocateRegistrationNumber: '',
    advocateContact: '',
    advocateEmail: '',
    advocateOfficeAddress: '',
    clientFullName: '',
    clientContact: '',
    clientEmail: '',
    clientAddress: '',
    courtName: '',
    courtCaseNumber: '',
    caseTitle: '',
    caseSummary: '',
    causeOfAction: '',
    reliefSought: '',
    plaintiffName: '',
    plaintiffContact: '',
    defendantName: '',
    defendantContact: '',
    otherParties: '',
    supportingDocuments: [],
    filingFeesDetails: '',
    powerOfAttorneyDocument: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      powerOfAttorneyDocument: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission, e.g., sending data to a server
    console.log('Form submitted:', formData);
  };

  return (
    <div className="private-advocate-form">
      <h2>Private Advocate Case Filing Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Advocate's Information */}
        <div className="form-section">
          <h3>Advocate's Information</h3>
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            name="advocateFullName"
            value={formData.advocateFullName}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Registration Number:</label>
          <input
            type="text"
            name="advocateRegistrationNumber"
            value={formData.advocateRegistrationNumber}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Contact:</label>
          <input
            type="text"
            name="advocateContact"
            value={formData.advocateContact}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Email:</label>
          <input
            type="email"
            name="advocateEmail"
            value={formData.advocateEmail}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Office Address:</label>
          <textarea
            name="advocateOfficeAddress"
            value={formData.advocateOfficeAddress}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Client's Information */}
        <div className="form-section">
          <h3>Client's Information</h3>
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            name="clientFullName"
            value={formData.clientFullName}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Contact:</label>
          <input
            type="text"
            name="clientContact"
            value={formData.clientContact}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Email:</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Address:</label>
          <textarea
            name="clientAddress"
            value={formData.clientAddress}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Court Details */}
        <div className="form-section">
          <h3>Court Details</h3>
          <label className="form-label">Court Name:</label>
          <input
            type="text"
            name="courtName"
            value={formData.courtName}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Case Number:</label>
          <input
            type="text"
            name="courtCaseNumber"
            value={formData.courtCaseNumber}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Case Details */}
        <div className="form-section">
          <h3>Case Details</h3>
          <label className="form-label">Case Title:</label>
          <input
            type="text"
            name="caseTitle"
            value={formData.caseTitle}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Summary:</label>
          <textarea
            name="caseSummary"
            value={formData.caseSummary}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Cause of Action:</label>
          <textarea
            name="causeOfAction"
            value={formData.causeOfAction}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Relief Sought:</label>
          <textarea
            name="reliefSought"
            value={formData.reliefSought}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Party Information */}
        <div className="form-section">
          <h3>Party Information</h3>
          <label className="form-label">Plaintiff's Name:</label>
          <input
            type="text"
            name="plaintiffName"
            value={formData.plaintiffName}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Plaintiff's Contact:</label>
          <input
            type="text"
            name="plaintiffContact"
            value={formData.plaintiffContact}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Defendant's Name:</label>
          <input
            type="text"
            name="defendantName"
            value={formData.defendantName}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Defendant's Contact:</label>
          <input
            type="text"
            name="defendantContact"
            value={formData.defendantContact}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Other Parties:</label>
          <textarea
            name="otherParties"
            value={formData.otherParties}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Supporting Documentation */}
        <div className="form-section">
          <h3>Supporting Documentation</h3>
          <label className="form-label">Upload Documents:</label>
          <input
            type="file"
            name="supportingDocuments"
            onChange={handleChange}
            multiple
            className="form-input"
          />
        </div>

        {/* Financial Information */}
        <div className="form-section">
          <h3>Financial Information</h3>
          <label className="form-label">Filing Fees Details:</label>
          <input
            type="text"
            name="filingFeesDetails"
            value={formData.filingFeesDetails}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Power of Attorney */}
        <div className="form-section">
          <h3>Power of Attorney</h3>
          <label className="form-label">Power of Attorney Document:</label>
          <input
            type="file"
            name="powerOfAttorneyDocument"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PrivateAdvocate;
