
// MyCases.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyCases.css';


const MyCases = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/mycases', { withCredentials: true });
        console.log('Cases:', response.data);
        setCases(response.data.cases || []);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, []);

  const viewCaseDetails = (caseId) => {
    navigate(`/client/mycases/${caseId}`);
  };

  return (
    <div className="cases-container">
      <h3>My Cases</h3>
      {cases.length > 0 ? (
        cases.map((caseItem) => (
          <div key={caseItem._id} className="case-item">
            <h4>Case ID: {caseItem.caseNumber}</h4>
            {/* Display other case details */}
            <button onClick={() => viewCaseDetails(caseItem._id)}>View Case Details</button>
          </div>
        ))
      ) : (
        <p>No cases found</p>
      )}
    </div>
  );
};

export default MyCases;