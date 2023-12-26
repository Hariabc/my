import React, { useState } from 'react';
import './Payment.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const PaymentOption = ({ option, selectedOption, handleOptionChange, selectedCaseType, handleCaseTypeChange }) => {
  const [cnrNumber, setCnrNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleCnrNumberChange = (event) => {
    setCnrNumber(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <form className='payment-form'>
      <span>
        <label className='payment-label-main'>
          <input
            type="radio"
            name="paymentOption"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </label>
      </span>
      {selectedOption === 'courtFee' && selectedOption === option && (
        <div className='new-existing'>
          <label className='payment-label-main'>
            <input
              type="radio"
              name="caseType"
              value="newCase"
              checked={selectedCaseType === 'newCase'}
              onChange={() => handleCaseTypeChange('newCase')}
            />
            New Case
          </label>
          <label className='payment-label-main'>
            <input
              type="radio"
              name="caseType"
              value="existingCase"
              checked={selectedCaseType === 'existingCase'}
              onChange={() => handleCaseTypeChange('existingCase')}
            />
            Existing Case
          </label>
        </div>
      )}
      {selectedOption === option && (
        <div className='payment-details'>
          <div>
            <label className='payment-label'>
              CNR Number:
              <input type="text" className='payment-input' value={cnrNumber} onChange={handleCnrNumberChange} />
            </label>
          </div>
          <div>
            <label className='payment-label'>
              Amount:
              <input type="text" className='payment-input' value={amount} onChange={handleAmountChange} />
            </label>
          </div>
          <div>
            <label className='payment-label'>
              Message:
              <input type="text" className='payment-input' value={message} onChange={handleMessageChange} />
            </label>
          </div>
          <div>
            <label className='payment-label'>
              Mobile Number:
              <input type="text" className='payment-input' value={mobileNumber} onChange={handleMobileNumberChange} />
            </label>
          </div>
          <div>
            <label className='payment-label'>
              Email:
              <input type="text" className='payment-input' value={email} onChange={handleEmailChange} />
            </label>
          </div>
          <div>
          <button type="submit">
          Proceed to payment
          </button>
          </div>
        </div> 
      )}
    </form>
  );
};

const PaymentComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCaseType, setSelectedCaseType] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setSelectedCaseType(null);
  };

  const handleCaseTypeChange = (caseType) => {
    setSelectedCaseType(caseType);
  };

  return (
    <div className="payment-main-div">
      <div className="payment-container">
      <h2>Payment Details</h2>
      <form className='payment-form'>
        {['courtFee', 'judicialDeposit', 'fine', 'penalty', 'others'].map((option) => (
          <PaymentOption
            key={option}
            option={option}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            selectedCaseType={selectedCaseType}
            handleCaseTypeChange={handleCaseTypeChange}
          />
        ))}
      </form>
    </div>
    </div>
  );
};

export default PaymentComponent;
