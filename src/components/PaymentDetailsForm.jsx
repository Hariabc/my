import React, { useState } from 'react';

const PaymentDetailsForm = ({ onChange }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    paymentMethod: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault()
    onChange(paymentDetails);
    
  };

  return (
    <div className="payment-details-form">
      <h2>Payment Details</h2>
      <form>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Payment Method:
          <input
            type="text"
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleNext}>
          Submit and File a case
        </button>
      </form>
    </div>
  );
};

export default PaymentDetailsForm;
