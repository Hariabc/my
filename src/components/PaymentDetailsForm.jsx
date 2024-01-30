import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './toast.css'


const PaymentDetailsForm = ({ onChange }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCardDetails: false,
  });

  

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevPaymentDetails) => ({
      ...prevPaymentDetails,
      [name]: value,
    }));
  };
  const handleNext = (e) => {
    e.preventDefault();
    console.log(paymentDetails); // Check if paymentDetails are logged properly
    onChange(paymentDetails); // Send the paymentDetails to the parent component
  };
  

  return (
    <div className="court-fee-payment-form">
      <ToastContainer/>
      <h2 className="form-section-title">Court Fee Payment</h2>

      <form onSubmit={handleNext} className="form-grid" method='POST'>
        <div className='court-fee-section'>
          <h3 className='section-title' >Make Payment</h3>
          <div className='grid-half'>
            <label className="form-label">
              Payment Method:
              <select name="paymentMethod" value={paymentDetails.paymentMethod} onChange={handleInputChange} className="form-input">
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="debitCard">Debit Card</option>
                <option value="netBanking">Net Banking</option>
              </select>
            </label>
            <label className="form-label">
              Card Number:
              <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handleInputChange} className="form-input" />
            </label>
            <label className="form-label">
              Expiry Date:
              <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handleInputChange} className="form-input" />
            </label>
            <label className="form-label">
              CVV:
              <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handleInputChange} className="form-input" />
            </label>
          </div>
        </div>
        {/* Submit Button for Court Fee Payment Form */}
        <div className="submit-section">
          <button type="submit" className="submit-button">
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetailsForm;