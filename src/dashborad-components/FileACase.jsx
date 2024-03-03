// FileACase.jsx

import React, { useState } from 'react';
import './FileACase.css'; // Import the CSS file for styling
import PartyInPersonImage from '../assets/client.png';

export default function FileACase() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
   <div className="file-a-case-main">
    <h2>File a Case</h2>
     <div className="file-a-case">
      <div className={`option-container ${selectedOption === 'partyInPerson' ? 'selected' : ''}`}>
        <button
          className="option"
          onClick={() => handleOptionClick('partyInPerson')}
        >
          <img src={PartyInPersonImage} alt="Party-in-Person" />
          <span>Party-in-Person</span>
        </button>
      </div>
      {/* <div className={`option-container ${selectedOption === 'privateAdvocate' ? 'selected' : ''}`}>
        <button
          className="option"
          onClick={() => handleOptionClick('privateAdvocate')}
        >
          <img src={PartyInPersonImage} alt="Private Advocate" />
          <span>Private Advocate</span>
        </button>
      </div> */}
      <div className={`option-container ${selectedOption === 'publicAdvocate' ? 'selected' : ''}`}>
        <button
          className="option"
          onClick={() => handleOptionClick('publicAdvocate')}
        >
          <img src={PartyInPersonImage} alt="Public Advocate" />
          <span>Public Advocate</span>
        </button>
      </div>
    </div>
      {selectedOption === 'partyInPerson' && <PartyInPersonForm />}
      {/* {selectedOption === 'privateAdvocate' && <PrivateAdvocateForm />} */}
      {selectedOption === 'publicAdvocate' && <PublicAdvocateForm />}
   </div>
  );
}

function PartyInPersonForm() {
  return <div className="form-container">Party-in-Person Form</div>;
}

function PrivateAdvocateForm() {
  return <div className="form-container">Private Advocate Form</div>;
}

function PublicAdvocateForm() {
  return <div className="form-container">Public Advocate Form</div>;
}
