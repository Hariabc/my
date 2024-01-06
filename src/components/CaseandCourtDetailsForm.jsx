import React, { useState } from 'react';

const CaseAndCourtDetailsForm = ({ onChange, onBack }) => {
  const [caseDetails, setCaseDetails] = useState({
    caseNumber: '',
    caseType: '',
    courtName: '',
    // Add other case details
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseDetails({ ...caseDetails, [name]: value });
  };

  const handleNext = () => {
    onChange(caseDetails);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="case-and-court-details-form">
      <h2>Case and Court Details</h2>
      <form>
        <label>
          Case Number:
          <input
            type="text"
            name="caseNumber"
            value={caseDetails.caseNumber}
            onChange={handleChange}
          />
        </label>
        {/* Other input fields for case and court details */}
        <button type="button" onClick={handleBack}>
          Back
        </button>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default CaseAndCourtDetailsForm;
