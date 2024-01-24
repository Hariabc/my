import React, { useState } from 'react';
import PartyInPersonfrom from './PartyInPerson';
import PublicAdvocateForm from './publicAdvocate';// Import the PublicAdvocateForm
// import PrivateAdvocate from './PrivateAdvocate';
// import PublicAdvocate from './PublicAdvocate';
import "./CaseFileOpt.css";

export default function FileACaseMin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='main-container'>
      <div className="three-option-container">
        <div className='three-button-container'>
          <button
            onClick={() => handleOptionClick('partyInPerson')}
            className={`option-button ${selectedOption === 'partyInPerson' ? 'active' : ''}`}
            style={{ color: selectedOption === 'partyInPerson' ? 'black' : '' }}
          >
            <b>PARTY IN PERSON</b> <br></br>
            (Represent Your Case Without Lawyer)
          </button>

          {selectedOption !== 'partyInPerson' && (
            <>
              <button className='option-button' onClick={() => handleOptionClick('privateAdvocate')}><b>PRIVATE ADVOCATE</b> <br></br> (Choose Your Advocate)</button>
              <button className='option-button' onClick={() => handleOptionClick('publicAdvocate')}><b>PUBLIC ADVOCATE</b> <br></br> (Appoint Public Advocate)</button>
            </>
          )}
        </div>
      </div>
 
      {selectedOption === 'publicAdvocate' && (
        <PublicAdvocateForm />
      )}


      {selectedOption === null && (
        <div className="message-box">
          <br></br>
          <br></br>
          <p>Choose one of those options to file a case.</p>
        </div>
      )}

      <div className="form-click-container">
        {selectedOption === 'partyInPerson' && <PartyInPersonfrom />}
        {/* Add similar conditions for PrivateAdvocate and PublicAdvocate */}
      </div>
    </div>
  );
}
