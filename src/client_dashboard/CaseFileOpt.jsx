import React, { useState } from 'react';
import PartyInPersonfrom from './PartyInPerson';
import PublicAdvocateForm from './publicAdvocate';
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
            className={`option-button party-in-person-button ${selectedOption === 'partyInPerson' ? 'active  ' : ''}`}
          >
            <b>PARTY IN PERSON</b> <br />
            (Represent Your Case Without Lawyer)
          </button>

          {selectedOption !== 'partyInPerson' && (
            <>
              {/* {selectedOption !== 'privateAdvocate' && (
                <button className='option-button' onClick={() => handleOptionClick('privateAdvocate')}>
                  <b>PRIVATE ADVOCATE</b> <br />
                  (Choose Your Advocate)
                </button>
              )} */}

              {selectedOption !== 'publicAdvocate' && (
                <button className='option-button' onClick={() => handleOptionClick('publicAdvocate')}>
                  <b>PUBLIC ADVOCATE</b> <br />
                  (Appoint Public Advocate)
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {selectedOption === 'publicAdvocate' && <PublicAdvocateForm />}

      {selectedOption === null && (
        <div className="message-box">
          <br />
          <br />
          <p>Choose one of those options to file a case.</p>
        </div>
      )}

      <div className="form-click-container">
        {selectedOption === 'partyInPerson' && <PartyInPersonfrom />}
        {/* {selectedOption === 'privateAdvocate' && /*} */}
        {selectedOption === 'publicAdvocate' && <PublicAdvocateForm />}
      </div>
    </div>
  );
}

