// Import React and necessary components and libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Stepper from 'react-stepper-horizontal';

// Import individual form components
import PlantiffDetailsForm from '../components/PlantiffDetailsForm';
import DefendantDetailsForm from '../components/DefendantDetailsForm';
import CaseAndCourtDetailsForm from '../components/CaseandCourtDetailsForm';
import DocumentUploadForm from '../components/DocumentUploadForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import PublicAttorneyRequestForm from '../client_dashboard/PublicAttorneyRequestForm';

// Import styles
import './PartyInPerson.css';

// Main functional component
const PublicAdvocateForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [plaintiffDetails, setPlaintiffDetails] = useState({});
  const [defendantDetails, setDefendantDetails] = useState({});
  const [caseDetails, setCaseAndCourtDetails] = useState({});
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [publicAttorneyRequest, setPublicAttorneyRequest] = useState({});
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/user', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Scroll to the top when the component mounts or updates
  useEffect(() => {
    scrollToTop();
  }, [currentStep]);

  // Define form steps
  const steps = [
    { title: 'Plaintiff Details' },
    { title: 'Defendant Details' },
    { title: 'Case and Court Details' },
    { title: 'Document Upload' },
    { title: 'Payment Details' },
    { title: 'Public Attorney Request' },
  ];

  // Handle step change in the Stepper component
  const handleStepChange = (step) => {
    setCurrentStep(step + 1);
  };

  // Handle changes in Plaintiff Details Form
  const handlePlaintiffChange = (data) => {
    setPlaintiffDetails(data);
    setCurrentStep(2);
  };

  // Handle changes in Defendant Details Form
  const handleDefendantChange = (data) => {
    setDefendantDetails(data);
    setCurrentStep(3);
  };

  // Handle changes in Case and Court Details Form
  const handleCaseAndCourtChange = (data) => {
    setCaseAndCourtDetails(data);
    setCurrentStep(4);
  };

  const handleDocumentUpload = (data) => {
  console.log('Download URLs:', data);
  setDownloadURLs(data);  // Update downloadURLs state
};

// Handle changes in Payment Details Form
const handlePaymentChange = (data) => {
  setPaymentDetails(data);
  setCurrentStep(6);
};

// Handle changes in Public Attorney Request Form
const handlePublicAttorneyRequest = async (data) => {
  setPublicAttorneyRequest(data);
  await handleSubmit(data); // Wait for submission to complete
  // setCurrentStep(7); // Advance to the next step after Public Attorney Request Form
};

  // Handle form submission
  const handleSubmit = async (publicAttorneyRequestData) => {
    const id = user._id;
    try {
      const allFormData = {
        id,
        plaintiffDetails,
        defendantDetails,
        caseDetails,
        downloadURLs,
        paymentDetails,
        publicAttorneyRequest: publicAttorneyRequestData,
      };

      const response = await axios.post('http://localhost:5000/publicadvocate/case', allFormData);
      const caseNumber = response.data.caseNumber;

      toast.success(`Case filed successfully. Case number: ${caseNumber}`, {
        autoClose: 4000,
      });

      console.log('Data sent successfully!', allFormData);

      // Redirect after a delay of 3 seconds (3000 milliseconds)
      setTimeout(() => {
        navigate('/clientdashboard');
      }, 3000);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  // Render the component
  return (
    <div className="case-filing-form">
      <ToastContainer />
      <Stepper steps={steps} activeStep={currentStep - 1} activeColor="#007bff" completeColor="#28a745" size={30} circleFontSize={12} onClick={(step) => handleStepChange(step)} />

      {currentStep === 1 && (
        <PlantiffDetailsForm onChange={handlePlaintiffChange} onNext={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <DefendantDetailsForm onChange={handleDefendantChange} onNext={() => setCurrentStep(3)} />
      )}
      {currentStep === 3 && (
        <CaseAndCourtDetailsForm onChange={handleCaseAndCourtChange} onNext={() => setCurrentStep(4)} />
      )}
    {currentStep === 4 && (
  <DocumentUploadForm onChange={(data) => handleDocumentUpload(data)} onNext={() => setCurrentStep(5)} />
)}
      {currentStep === 5 && (
        <PaymentDetailsForm onChange={handlePaymentChange} onNext={() => setCurrentStep(6)} />
      )}
      {currentStep === 6 && (
        <PublicAttorneyRequestForm onChange={handlePublicAttorneyRequest} />
      )}
    </div>
  );
};

export default PublicAdvocateForm;
