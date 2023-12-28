import React from 'react';

const DefendantDetailsForm = ({ formData, setFormData, nextStep, prevStep }) => {
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
      <h2>Defendant Details</h2>
      {/* Your form fields for defendant details */}
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default DefendantDetailsForm;
