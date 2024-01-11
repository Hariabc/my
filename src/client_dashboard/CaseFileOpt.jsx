import React, { useState } from 'react';
import PartyInPersonfrom from './PartyInPerson';
// import PrivateAdvocate from './PrivateAdvocate';
// import PublicAdvocate from './PublicAdvocate';
import "./CaseFileOpt.css";

export default function FileACaseMin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container">
      <div className='button-container'>
      <button
          onClick={() => handleOptionClick('partyInPerson')}
          className={selectedOption === 'partyInPerson' ? 'active' : ''}
        >
          Party in Person
        </button>
        {selectedOption !== 'partyInPerson' && (
          <>
            <button onClick={() => handleOptionClick('privateAdvocate')}>Private Advocate</button>
            <button onClick={() => handleOptionClick('publicAdvocate')}>Public Advocate</button>
          </>
        )}
      </div>
      
      <div className="content-container">
        {selectedOption === 'partyInPerson' && <PartyInPersonfrom />}
        {selectedOption === 'privateAdvocate' && <PrivateAdvocate />}
        {selectedOption === 'publicAdvocate' && <PublicAdvocate />}
      </div>
    </div>
  );
}
