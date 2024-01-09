// PublicAdvocate.js

import React, { useState } from 'react';
import './publicadvocate.css';

const PublicAdvocate = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    contactInformation: '',

    // Court Details
    courtName: '',
    courtLocation: '',
    courtCaseNumber: '',
    filingFee: '',
    filingMethod: '',

    // Case Details
    title: '',
    summary: '',
    causeOfAction: '',
    reliefSought: '',

    // Party Information
    plaintiffs: '',
    defendants: '',
    otherParties: '',

    // Case Type and Category
    caseType: '',
    caseCategory: '',

    // Preferred Advocate
    preferredAdvocate: '',

    // Supporting Documentation
    supportingDocuments: [],

    // Financial Information
    income: '',
    assets: '',
    liabilities: '',

    // Declaration and Signature
    declaration: '',
    clientSignature: '',
    date: '',
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
      supportingDocuments: [...prevData.supportingDocuments, e.target.files[0]],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission, e.g., sending data to a server
    console.log('Form submitted:', formData);
  };

  return (
    <div className="public-advocate-form">
      <h2>Public Advocate Case Filing Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Date of Birth:</label>
          <input
            type="text"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Nationality:</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Contact Information:</label>
          <input
            type="text"
            name="contactInformation"
            value={formData.contactInformation}
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

          <label className="form-label">Court Location:</label>
          <input
            type="text"
            name="courtLocation"
            value={formData.courtLocation}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Court Case Number:</label>
          <input
            type="text"
            name="courtCaseNumber"
            value={formData.courtCaseNumber}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Filing Fee:</label>
          <input
            type="text"
            name="filingFee"
            value={formData.filingFee}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Filing Method:</label>
          <input
            type="text"
            name="filingMethod"
            value={formData.filingMethod}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Case Details */}
        <div className="form-section">
          <h3>Case Details</h3>
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Summary:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Cause of Action:</label>
          <input
            type="text"
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
          <label className="form-label">Plaintiffs:</label>
          <input
            type="text"
            name="plaintiffs"
            value={formData.plaintiffs}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Defendants:</label>
          <input
            type="text"
            name="defendants"
            value={formData.defendants}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Other Parties:</label>
          <input
            type="text"
            name="otherParties"
            value={formData.otherParties}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Case Type and Category */}
        <div className="form-section">
          <h3>Case Type and Category</h3>
          <label className="form-label">Case Type:</label>
          <input
            type="text"
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Case Category:</label>
          <input
            type="text"
            name="caseCategory"
            value={formData.caseCategory}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Preferred Advocate */}
        <div className="form-section">
          <h3>Preferred Advocate</h3>
          <label className="form-label">Preferred Advocate:</label>
          <input
            type="text"
            name="preferredAdvocate"
            value={formData.preferredAdvocate}
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
            onChange={handleFileChange}
            multiple
            className="form-input"
          />
        </div>

        {/* Financial Information */}
        <div className="form-section">
          <h3>Financial Information</h3>
          <label className="form-label">Income:</label>
          <input
            type="text"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Assets:</label>
          <input
            type="text"
            name="assets"
            value={formData.assets}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Liabilities:</label>
          <input
            type="text"
            name="liabilities"
            value={formData.liabilities}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        {/* Declaration and Signature */}
        <div className="form-section">
          <h3>Declaration and Signature</h3>
          <label className="form-label">Declaration:</label>
          <textarea
            name="declaration"
            value={formData.declaration}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Client's Signature:</label>
          <input
            type="text"
            name="clientSignature"
            value={formData.clientSignature}
            onChange={handleChange}
            className="form-input"
          />

          <label className="form-label">Date:</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
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

export default PublicAdvocate;
