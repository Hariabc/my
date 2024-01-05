import React, { useState } from 'react';
import axios from 'axios';
import PlaintiffForm from "../components/plantiffform"

const CaseFilingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    plaintiffDetails: {},
    defendantDetails: {},
    caseDetails: {},
    documents: {},
    paymentDetails: {},
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...data },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/case', formData);
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <PlaintiffForm
            formData={formData.plaintiffDetails}
            onChange={(data) => handleChange('plaintiffDetails', data)}
            onNext={handleNext}
          />
        );
      // case 2:
      //   return (
      //     <DefendantForm
      //       formData={formData.defendantDetails}
      //       onChange={(data) => handleChange('defendantDetails', data)}
      //       onNext={handleNext}
      //       onBack={handleBack}
      //     />
      //   );
      // // Placeholder for additional steps
      // case 3:
      //   return (
      //     <CaseDetailsForm
      //       formData={formData.caseDetails}
      //       onChange={(data) => handleChange('caseDetails', data)}
      //       onNext={handleNext}
      //       onBack={handleBack}
      //     />
      //   );
      // case 4:
      //   return (
      //     <DocumentsForm
      //       formData={formData.documents}
      //       onChange={(data) => handleChange('documents', data)}
      //       onNext={handleNext}
      //       onBack={handleBack}
      //     />
      //   );
      // case 5:
      //   return (
      //     <PaymentForm
      //       formData={formData.paymentDetails}
      //       onChange={(data) => handleChange('paymentDetails', data)}
      //       onNext={handleNext}
      //       onBack={handleBack}
      //     />
      //   );
      // default:
        return null;
    }
  };

  return (
    <div className="case-filing-form">
      <h2>Case Filing Form - Step {currentStep}</h2>
      {renderForm()}
      {currentStep > 1 && (
        <button onClick={handleBack}>Back</button>
      )}
      {currentStep < 5 && (
        <button onClick={handleNext}>Next</button>
      )}
      {currentStep === 5 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default CaseFilingForm;