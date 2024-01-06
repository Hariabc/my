import React, { useState } from 'react';
import PlaintiffDetailsForm from '../components/PlaintiffDetailsForm';
import DefendantDetailsForm from '../components/DefendantDetailsForm';
import CaseAndCourtDetailsForm from '../components/CaseandCourtDetailsForm';
import DocumentUploadForm from '../components/DocumentUploadForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import axios from 'axios';

const CaseFilingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [plaintiffDetails, setPlaintiffDetails] = useState({});
  const [defendantDetails, setDefendantDetails] = useState({});
  const [caseDetails, setCaseAndCourtDetails] = useState({});
  const [documents, setDocumentDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});

  const handlePlaintiffChange = (data) => {
    setPlaintiffDetails(data);
    setCurrentStep(2);
  };

  const handleDefendantChange = (data) => {
    setDefendantDetails(data);
    setCurrentStep(3);
  };

  const handleCaseAndCourtChange = (data) => {
    setCaseAndCourtDetails(data);
    setCurrentStep(4);
  };

  const handleDocumentUpload = (data) => {
    setDocumentDetails(data);
    setCurrentStep(5);
  };

  const handlePaymentChange = (data) => {
    setPaymentDetails(data);
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const allFormData = {
        plaintiffDetails,
        defendantDetails,
        caseDetails,
        documents,
        paymentDetails,
      };

      await axios.post('http://localhost:5000/file/case', allFormData);
      console.log('Data sent successfully!');
      // Optionally reset form state or navigate somewhere else
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="case-filing-form">
      {currentStep === 1 && (
        <PlaintiffDetailsForm onChange={handlePlaintiffChange} />
      )}
      {currentStep === 2 && (
        <DefendantDetailsForm onChange={handleDefendantChange} />
      )}
      {currentStep === 3 && (
        <CaseAndCourtDetailsForm onChange={handleCaseAndCourtChange} />
      )}
      {currentStep === 4 && (
        <DocumentUploadForm onChange={handleDocumentUpload} />
      )}
      {currentStep === 5 && (
        <PaymentDetailsForm onChange={handlePaymentChange} />
      )}
    </div>
  );
};

export default CaseFilingForm;
