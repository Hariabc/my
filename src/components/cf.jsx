import React from 'react';

const ClientDetailsForm = ({ formData, setFormData, nextStep, prevStep }) => {
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
      <h2>Client Details</h2>
      {/* Your form fields for client details */}
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ClientDetailsForm;
