// MyCases.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./JudgeMyCases.css";


const JudgeMyCases = () => {
  const [jcases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // Fetch the Judge's cases including details of Filedcases
        const response = await axios.get('http://localhost:5000/judge/my-cases', { withCredentials: true });
        console.log('Cases', response.data);

        // Extract and set Filedcases in state
        setCases(response.data || []);
      } catch (error) {
        console.error('Error fetching filedcases:', error);
      }
    };

    fetchCases();
  }, []);

  const viewCaseDetails = (caseId) => {
    // Navigate to the specific case details page
    navigate(`/judge/my-cases/${caseId}`);
  };

  return (
    <div className="cases-container">
      <h3>My Filed Cases</h3>
      {jcases.length > 0 ? (
          <div  className="case-item">
            <h4>Case ID: {jcases.cases.case.caseDetails.caseNumber}</h4>
            {/* Display other case details */}
            <button onClick={() => viewCaseDetails(filedcase._id)}>View Case Details</button>
          </div>
      
      ) : (
        <p>No filed cases found</p>
      )}
    </div>
  );
}; 

export default JudgeMyCases;
