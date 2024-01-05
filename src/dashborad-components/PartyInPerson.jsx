import React, { useState } from 'react';
import PlaintiffForm from '../PlaintiffForm';
import DefendantForm from './DefendantForm';
import CaseDetailsForm from './CaseDetailsForm';
import DocumentsForm from './DocumentsForm';
import CourtFeePaymentForm from './CourtFeePaymentForm';
import axios from 'axios';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    plaintiff: {},
    defendant: {},
    caseDetails: {},
    documents: {},
    paymentDetails: {},
  });

  const handlePlaintiffData = (data) => {
    setFormData({ ...formData, plaintiff: data });
  };

  const handleDefendantData = (data) => {
    setFormData({ ...formData, defendant: data });
  };

  const handleCaseDetailsData = (data) => {
    setFormData({ ...formData, caseDetails: data });
  };

  const handleDocumentsData = (data) => {
    setFormData({ ...formData, documents: data });
  };

  const handlePaymentDetailsData = (data) => {
    setFormData({ ...formData, paymentDetails: data });
    // Make a POST request with formData to the backend
    submitFormDataToBackend();
  };

  const submitFormDataToBackend = async () => {
    try {
      const response = await axios.post('/api/formdata', formData);
      console.log('Form submitted:', response.data);
      // Handle success: show success message, reset form, etc.
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error: show error message, handle retries, etc.
    }
  };

  return (
    <div>
      <PlaintiffForm onNext={handlePlaintiffData} />
      <DefendantForm onNext={handleDefendantData} />
      <CaseDetailsForm onNext={handleCaseDetailsData} />
      <DocumentsForm onNext={handleDocumentsData} />
      <CourtFeePaymentForm onSubmit={handlePaymentDetailsData} />
    </div>
  );
};

export default MultiStepForm;
