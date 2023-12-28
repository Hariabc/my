import React from 'react';

const CourtCaseDetailsForm = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    // Validation logic if needed
    nextStep();
  };

  const handlePrev = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <div>
      <h2>Court Case Details</h2>
      {/* Your form fields for court case details */}
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default CourtCaseDetailsForm;
