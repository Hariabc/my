// PartyInPersonForm.js

import React, { useState } from 'react';
import './PartyInPerson.css';

const PartyInPersonForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    caseTitle: '',
    caseSummary: '',
    causeOfAction: '',
    reliefSought: '',
    partyNames: '',
    partyAddresses: '',
    partyPhoneNumbers: '',
    partyEmailAddresses: '',
    contracts: '',
    receipts: '',
    evidence: '',
    courtDivision: '',
    caseCategory: '',
    filingFee: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission, e.g., sending data to a server
    console.log('Form submitted:', formData);
  };

  return (
    <div className="party-in-person-form">
      <h2 className="form-section-title">Party in Person Case Filing Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <h3 className="section-title">Personal Information</h3>
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
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Email Address:
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        {/* Case Details */}
        <div className="form-section">
          <h3 className="section-title">Case Details</h3>
          <label className="form-label">
            Case Title:
            <input
              type="text"
              name="caseTitle"
              value={formData.caseTitle}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Case Summary:
            <textarea
              name="caseSummary"
              value={formData.caseSummary}
              onChange={handleChange}
              className="form-input"
            ></textarea>
          </label>
          <label className="form-label">
            Cause of Action:
            <input
              type="text"
              name="causeOfAction"
              value={formData.causeOfAction}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Relief Sought:
            <input
              type="text"
              name="reliefSought"
              value={formData.reliefSought}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        {/* Parties Involved */}
        <div className="form-section">
          <h3 className="section-title">Parties Involved</h3>
          <label className="form-label">
            Party Names:
            <input
              type="text"
              name="partyNames"
              value={formData.partyNames}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Party Addresses:
            <input
              type="text"
              name="partyAddresses"
              value={formData.partyAddresses}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Party Phone Numbers:
            <input
              type="tel"
              name="partyPhoneNumbers"
              value={formData.partyPhoneNumbers}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Party Email Addresses:
            <input
              type="email"
              name="partyEmailAddresses"
              value={formData.partyEmailAddresses}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        {/* Supporting Documents */}
        <div className="form-section">
          <h3 className="section-title">Supporting Documents</h3>
          <label className="form-label">
            Contracts:
            <input
              type="text"
              name="contracts"
              value={formData.contracts}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Receipts:
            <input
              type="text"
              name="receipts"
              value={formData.receipts}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Evidence:
            <input
              type="text"
              name="evidence"
              value={formData.evidence}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        {/* Court Division and Case Category */}
        <div className="form-section">
          <h3 className="section-title">Court Division and Case Category</h3>
          {/* ... (previous form fields) */}
          <label className="form-label">
            Court Division:
            <input
              type="text"
              name="courtDivision"
              value={formData.courtDivision}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">Case Category:</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="caseCategory"
                value="Civil"
                checked={formData.caseCategory === 'Civil'}
                onChange={handleChange}
              />
              Civil
            </label>
            <label>
              <input
                type="radio"
                name="caseCategory"
                value="Criminal"
                checked={formData.caseCategory === 'Criminal'}
                onChange={handleChange}
              />
              Criminal
            </label>
            <label>
              <input
                type="radio"
                name="caseCategory"
                value="Family"
                checked={formData.caseCategory === 'Family'}
                onChange={handleChange}
              />
              Family
            </label>
          </div>
        </div>

        {/* Case Filing Fee */}
        <div className="form-section">
          <h3 className="section-title">Case Filing Fee</h3>
          <label className="form-label">
            Filing Fee:
            <input
              type="text"
              name="filingFee"
              value={formData.filingFee}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PartyInPersonForm;
