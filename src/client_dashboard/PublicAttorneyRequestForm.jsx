// PublicAttorneyRequestForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const PublicAttorneyRequestForm = ({ onChange, onNext }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = async () => {
    try {
      // Send the public attorney request to the server
      const response = await axios.post('http://localhost:5000/api/request-public-attorney', {
        reason,
      });

      // Handle the response as needed
      console.log('Public attorney request submitted successfully:', response.data);

      // You can include additional logic here based on the response

      // Notify the parent component that this step is complete
      onChange({ reason });

      // Proceed to the next step
      onNext();
    } catch (error) {
      console.error('Error submitting public attorney request:', error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <h2>Request Public Attorney</h2>
      <label>
        Reason for Request:
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason for requesting a public attorney"
        />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit Request</button>
    </div>
  );
};

export default PublicAttorneyRequestForm;
