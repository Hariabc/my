import React, { useState } from 'react';
import axios from 'axios';

const CourtFeePaymentForm = (props) => {
  const [paymentFormData, setPaymentFormData] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCardDetails: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setPaymentFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming validation logic goes here
    // console.log(FormData)
    console.log('onSubmit prop:', props.onSubmit);
    try {
      // Perform the POST request using Axios
      const response = await axios.post('http://localhost:5000/file/case', paymentFormData);
      console.log('Response:', response.data);
      // Trigger the callback onSubmit if provided
      if (props.onSubmit) props.onSubmit();
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <div className="court-fee-payment-form">
      <h2 className="form-section-title">Court Fee Payment</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Your form inputs */}
        {/* ... */}
        <button type="submit" className="submit-button">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default CourtFeePaymentForm;
