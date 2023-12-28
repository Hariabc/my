import React, { useState } from 'react';
import CourtDetailsForm from './cd';
import ClientDetailsForm from './cf';
import DefendantDetailsForm from './df';
import CourtCaseDetailsForm from './cf';

const CaseFilingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Your form data structure
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <CourtDetailsForm
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <ClientDetailsForm
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <DefendantDetailsForm
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <CourtCaseDetailsForm
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    default:
      return null;
  }
};

export default CaseFilingForm;
