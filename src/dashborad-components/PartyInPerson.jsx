import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import PlaintiffForm from '../components/plantiffdetails';
import DefendantForm from '../components/defendentdetails';
import CaseDetailsForm from '../components/caseandcourtdetails'
import DocumentsForm from '../components/documents';
import CourtFeePaymentForm from '../components/payment';
import "./partyInPerson.css"
const TOTAL_STEPS = 5; 
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
   step1: {
      fullName: '',
      gender: '',
      dateOfBirth: '',
      caste: '',
      age: '',
      relation: '',
      partyEmailAddresses: '',
      partyPhoneNumbers: '',
      partyAddresses: '',
      pinCode: '',
      occupation: '',
      state: '',
      district: '',
      taluka: '',
      village: ''
      // Add other plaintiff fields here
    },

    // Step 2: Defendant Details
    step2: {
      fullName: '',
      gender: '',
      dateOfBirth: '',
      caste: '',
      age: '',
      relation: '',
      partyEmailAddresses: '',
      partyPhoneNumbers: '',
      partyAddresses: '',
      pinCode: '',
      occupation: '',
      state: '',
      district: '',
      taluka: '',
      village: ''
    },

    // Step 3: Case Details
    step3: {
      caseType: '',
      title: '',
      caseSummary: '',
      causeOfAction: '',
      reliefSought: '',
      dateOfCauseOfAction: '',
      state: '',
      district: '',
      taluka: '',
      village: '',
      courtType: '',
      courtState: '',
      courtDistrict: '',
      courtName: '',
      caseCategory: ''
    },

    // Step 4: Documents
    step4: [
      {
        documentName: '',
        documentURL: '',
      },
    ],

    // Step 5: Payment Details
    step5: {
      paymentMethod: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
      // Add other payment details fields here
    },
  });

  const handleNext = (stepNumber, data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`step${stepNumber}`]: { ...prevFormData[`step${stepNumber}`], ...data },
    }));
    setStep(step + 1);
  };
  
  

  const handlePrevious = () => {
    // Go back to the previous step
    setStep(step - 1);
  };

  const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/file/case', formData);
        console.log('Form submitted:', response.data);
        // Reset the form or perform any necessary actions after submission
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle errors, show an error message, etc.
      }
    };
  
  return (
    <div className="multi-step-form">
      {step === 1 && (
        <PlaintiffForm formData={formData} onNext={handleNext} />
      )}
      {step === 2 && (
        <DefendantForm formData={formData} onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {step === 3 && (
        <CaseDetailsForm formData={formData} onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {step === 4 && (
        <DocumentsForm formData={formData} onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {step === 5 && (
        <CourtFeePaymentForm onSubmit={formData} />

      )}
      {step === TOTAL_STEPS && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default MultiStepForm;
