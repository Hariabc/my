import React, { useState } from 'react';

const PlaintiffForm = ({ handleFormData }) => {
  const [plaintiffData, setPlaintiffData] = useState({
    fullName: '',
    gender: '',
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormData({ plaintiff: plaintiffData });
  };

  return (
    <div>
      <h2>Plaintiff Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Plaintiff form fields */}
        <label>
          Full Name:
          <input
            type="text"
            value={plaintiffData.fullName}
            onChange={(e) => setPlaintiffData({ ...plaintiffData, fullName: e.target.value })}
          />
        </label>
        {/* Add other plaintiff form fields */}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PlaintiffForm;
