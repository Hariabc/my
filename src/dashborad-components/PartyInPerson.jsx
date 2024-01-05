// MultiStepForm.js
import React, { useState } from 'react';
import PlaintiffForm from '../components/plantiffform';
// import DefendantForm from '../components/defendentform';
// import CaseDetailsForm from '../components/caseandcourtform';
// import DocumentsForm from '../components/documentsform';
// import PaymentForm from '../components/paymentform';
import axios from 'axios';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plaintiff: {},
    defendant: {},
    caseDetails: {},
    documents: {},
    paymentDetails: {},
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleFormData = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post('/api/case', formData);

      // Handle the response if needed
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error sending data:', error);
    }
  };

  switch (step) {
    case 1:
      return <PlaintiffForm handleFormData={handleFormData} />;
    case 2:
      return <DefendantForm handleFormData={handleFormData} />;
    case 3:
      return <CaseDetailsForm handleFormData={handleFormData} />;
    case 4:
      return <DocumentsForm handleFormData={handleFormData} />;
    case 5:
      return <PaymentForm handleFormData={handleFormData} handleSubmit={handleSubmit} />;
    default:
      return null;
  }
};

export default MultiStepForm;
