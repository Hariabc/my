import React, { useState, useEffect } from 'react';
import PlaintiffDetailsForm from '../components/PlantiffDetailsForm';
import DefendantDetailsForm from '../components/DefendantDetailsForm';
import CaseAndCourtDetailsForm from '../components/CaseandCourtDetailsForm';
import DocumentUploadForm from '../components/DocumentsUploadForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import './PartyInPerson.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Stepper from 'react-stepper-horizontal';


const CaseFilingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [plaintiffDetails, setPlaintiffDetails] = useState({});
  const [defendantDetails, setDefendantDetails] = useState({});
  const [caseDetails, setCaseAndCourtDetails] = useState({});
  const [documents, setDocumentDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const [user, setUser] = useState({});

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/user', { withCredentials: true });
        setUser(response.data.user); // Assuming the response includes user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    scrollToTop(); // Scroll to the top when the component mounts or updates
  }, [currentStep]);


 
  const handlePlaintiffChange = (data) => {
    console.log('Plaintiff details are valid.');
    // Validate plaintiff details before proceeding to the next step
    const isPlaintiffDetailsValid = validatePlaintiffDetails(data);

    if (isPlaintiffDetailsValid) {
      
      setPlaintiffDetails(data);
      setCurrentStep(2);
    } else {
      console.error('Plaintiff details validation failed');
      // You may display an error message or handle it as needed
    }
  };

  // Add a function to validate Plaintiff Details
  const validatePlaintiffDetails = (plaintiffData) => {
    // Add your validation logic here
    const errors = {};

    if (!plaintiffData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!plaintiffData.gender) {
      errors.gender = 'Gender is required';
    }

    if (!plaintiffData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }

    if (!plaintiffData.partyEmailAddresses.trim()) {
      errors.partyEmailAddresses = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(plaintiffData.partyEmailAddresses)) {
      errors.partyEmailAddresses = 'Invalid email address';
    }

    if (!plaintiffData.partyPhoneNumbers.trim()) {
      errors.partyPhoneNumbers = 'Mobile No is required';
    } else if (!/^\d{10}$/.test(plaintiffData.partyPhoneNumbers)) {
      errors.partyPhoneNumbers = 'Invalid mobile number';
    }

    if (!plaintiffData.partyAddresses.trim()) {
      errors.partyAddresses = 'Address is required';
    }

    if (!plaintiffData.pinCode.trim()) {
      errors.pinCode = 'Pin Code is required';
    } else if (!/^\d{6}$/.test(plaintiffData.pinCode)) {
      errors.pinCode = 'Invalid Pin Code';
    }

    if (!plaintiffData.occupation.trim()) {
      errors.occupation = 'Occupation is required';
    }

    // Add more validation rules for other fields

    if (Object.keys(errors).length > 0) {
      // If there are errors, you can handle them as needed
      console.log(errors);
      return false;
    }

    // If there are no errors, return true
    return true;
  };

  const handleDefendantChange = (data) => {
    // Validate plaintiff details before proceeding to the next step
    const isDefendantDetailsValid = validateDefendantDetails(data);

    if (isDefendantDetailsValid) {
      setDefendantDetails(data);
      setCurrentStep(3);
    } else {
      console.error('Defendant details validation failed');
      // You may display an error message or handle it as needed
    }
    
  };

  // Add a function to validate Plaintiff Details
  const validateDefendantDetails = (defendantData) => {
    // Add your validation logic here
    const errors = {};

    if (!defendantData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!defendantData.gender) {
      errors.gender = 'Gender is required';
    }

    if (!defendantData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }

    if (!defendantData.partyEmailAddresses.trim()) {
      errors.partyEmailAddresses = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(defendantData.partyEmailAddresses)) {
      errors.partyEmailAddresses = 'Invalid email address';
    }

    if (!defendantData.partyPhoneNumbers.trim()) {
      errors.partyPhoneNumbers = 'Mobile No is required';
    } else if (!/^\d{10}$/.test(defendantData.partyPhoneNumbers)) {
      errors.partyPhoneNumbers = 'Invalid mobile number';
    }

    if (!defendantData.partyAddresses.trim()) {
      errors.partyAddresses = 'Address is required';
    }

    if (!defendantData.pinCode.trim()) {
      errors.pinCode = 'Pin Code is required';
    } else if (!/^\d{6}$/.test(defendantData.pinCode)) {
      errors.pinCode = 'Invalid Pin Code';
    }

    if (!defendantData.occupation.trim()) {
      errors.occupation = 'Occupation is required';
    }

    // Add more validation rules for other fields

    if (Object.keys(errors).length > 0) {
      // If there are errors, you can handle them as needed
      console.log(errors);
      return false;
    }

    // If there are no errors, return true
    return true;
  };







  const handleCaseAndCourtChange = (data) => {
     // Validate plaintiff details before proceeding to the next step
     const isCaseAndCourtDetailsValid = validateCaseAndCourtDetails(data);

     if (isCaseAndCourtDetailsValid) {
       setCaseAndCourtDetails(data);
       setCurrentStep(4);
     } else {
       console.error('Plaintiff details validation failed');
       // You may display an error message or handle it as needed
     }
  };

  const handleDocumentUpload = (data) => {
    setDocumentDetails(data);
    setCurrentStep(5);
  };

  const handlePaymentChange = (data) => {
    setPaymentDetails(data);
    handleSubmit(data);
  };

  const navigate = useNavigate();
 
  const steps = [
    { title: 'Plaintiff Details' },
    { title: 'Defendant Details' },
    { title: 'Case and Court Details' },
    { title: 'Document Upload' },
    { title: 'Payment Details' },
  ]; 
  
  const handleStepChange = (step) => {
    setCurrentStep(step + 1);
  };

  const handleSubmit = async (paymentDetailsData) => {
    const id = user._id;
    try {
      const allFormData = {
        id,
        plaintiffDetails,
        defendantDetails,
        caseDetails,
        documents,
        paymentDetails: paymentDetailsData,
      };

      // ...
      const response = await axios.post('http://localhost:5000/file/case', allFormData);
      const caseNumber = response.data.caseNumber;

      toast.success(`Case filed successfully. Case number: ${caseNumber}`, {
        autoClose: 4000,
      });

      console.log('Data sent successfully!', allFormData);

      // Redirect after a delay of 3 seconds (3000 milliseconds)
      setTimeout(() => {
        navigate('/clientdashboard');
      }, 3000); // 3 seconds delay
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="case-filing-form">
      <Stepper steps={steps} activeStep={currentStep - 1} activeColor="#007bff" completeColor="#28a745" size={30} circleFontSize={12} onClick={(step) => handleStepChange(step)} />
      
      

      {currentStep === 0 && (
        <PlaintiffDetailsForm onChange={handlePlaintiffChange} onNext={() => setCurrentStep(1)} />
      )}
      {currentStep === 1 && (
        <DefendantDetailsForm onChange={handleDefendantChange} onNext={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <CaseAndCourtDetailsForm onChange={handleCaseAndCourtChange} onNext={() => setCurrentStep(3)} />
      )}
      {currentStep === 3 && (
        <DocumentUploadForm onChange={handleDocumentUpload} onNext={() => setCurrentStep(4)} />
      )}
      {currentStep === 4 && (
        <PaymentDetailsForm onChange={handlePaymentChange} />
      )}
    </div>
  );
};

export default CaseFilingForm;
