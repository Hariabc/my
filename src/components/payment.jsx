import React, { useState } from 'react';
import axios from 'axios';

const CourtFeePaymentForm = ({ data, onSubmit }) => {
  const [paymentFormData, setPaymentFormData] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCardDetails: false,
  });

  const handleChange = (e) => {
    // ... (unchanged)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/file/case', data); // Ensure 'data' is available or passed as prop
      console.log('Form submitted:', response.data);
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="court-fee-payment-form">
      {/* Form elements */}
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Your form inputs */}
        <button type="submit" className="submit-button">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default CourtFeePaymentForm;
