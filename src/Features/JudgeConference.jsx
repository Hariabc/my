// JudgeConference.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const JudgeConference = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    // Redirect to Home.js when the Join button is clicked
    navigate('/homecon');
  };

  return (
    <div>
      {/* Your other JSX code */}

      <button onClick={handleJoinClick}>Join Conference</button>

      {/* Your other JSX code */}
    </div>
  );
};

export default JudgeConference;
