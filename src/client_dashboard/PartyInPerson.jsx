import React, { useState,useEffect} from 'react';
import PlaintiffDetailsForm from '../components/PlantiffDetailsForm';
import DefendantDetailsForm from '../components/DefendantDetailsForm';
import CaseAndCourtDetailsForm from '../components/CaseandCourtDetailsForm';
import DocumentUploadForm from '../components/DocumentsUploadForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import './PartyInPerson.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
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
    handleSubmit(data);
  };
  const navigate = useNavigate()

  const handleSubmit = async (paymentDetailsData) => {
    const id= user._id
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
