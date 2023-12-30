// CaseFilingForm.js

import React, { useState } from 'react';

const CaseFilingForm = () => {
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
    supportingDocuments: '',

    // Financial Information
    income: '',
    assets: '',
    liabilities: '',

    // Declaration and Signature
    declaration: '',
    signature: '',
    date: '',
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
    <div className="case-filing-form">
      <h2>Case Filing Form</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (Previous form fields) */}

        {/* Declaration and Signature */}
        <div className="declaration-section">
          <label>
            Declaration:
            <textarea
              name="declaration"
              value={formData.declaration}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Signature:
            <input
              type="text"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CaseFilingForm;
