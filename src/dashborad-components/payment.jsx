// PaymentComponent.js
import React, { useState } from 'react';
import creditCardImage from '../assets/DASHBOARDS/Payments.jpg'; // Replace with your actual image URLs
import upiImage from '../assets/DASHBOARDS/payments.jpg';
import masterCardImage from '../assets/DASHBOARDS/payments.jpg';

const PaymentComponent = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCVCChange = (e) => {
    setCVC(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the payment logic (e.g., send data to a server, process payment, etc.)
    console.log('Payment submitted:', { paymentMethod, cardNumber, expiryDate, cvc });
    // You can add further logic here for payment processing
  };

  const paymentMethodImages = {
    creditCard: creditCardImage,
    upi: upiImage,
    masterCard: masterCardImage,
    // Add more payment methods with their image URLs
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="upi">UPI</option>
            <option value="masterCard">MasterCard</option>
            {/* Add more payment options as needed */}
          </select>
        </div>
        {paymentMethod && (
          <div>
            <div className="payment-image">
              <img src={paymentMethodImages[paymentMethod]} alt={`${paymentMethod} image`} />
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="Enter card number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvc">CVC:</label>
              <input
                type="text"
                id="cvc"
                value={cvc}
                onChange={handleCVCChange}
                placeholder="CVC"
                required
              />
            </div>
          </div>
        )}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentComponent;
