import React, { useState } from 'react';

import PrivateAdvocate from './PrivateAdvocate';
import PublicAdvocate from './PublicAdvocate';

export default function FileACaseMin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleOptionClick('partyInPerson')}>Party in Person</button>
        <button onClick={() => handleOptionClick('privateAdvocate')}>Private Advocate</button>
        <button onClick={() => handleOptionClick('publicAdvocate')}>Public Advocate</button>
      </div>
      
      <div>
        {selectedOption === 'partyInPerson' && <PartyInPersonfrom />}
        {/* {selectedOption === 'privateAdvocate' && <PrivateAdvocate />} */}
        {selectedOption === 'publicAdvocate' && <PublicAdvocate />}
      </div>
    </div>
  );
}
