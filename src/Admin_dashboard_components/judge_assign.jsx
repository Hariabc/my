import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './judge_assign.css'

const AssignJudgeDashboard = () => {
  const [judgeApprovedCases, setJudgeApprovedCases] = useState([]);

  useEffect(() => {
    const fetchJudgeApprovedCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/judgeapproved-cases', {
          withCredentials: true, // Include this if you are using cookies for authentication
        });
       setJudgeApprovedCases(response.data.judgeApprovedCases);
      } catch (error) {
        console.error('Error fetching judge-approved cases:', error);
      }
    };

    fetchJudgeApprovedCases();
  }, []);

  const handleAssignJudge = async (caseId) => {
    try {
      // Add your logic to assign a judge for the selected case
      console.log(`Assigning judge for case with ID: ${caseId}`);
    } catch (error) {
      console.error('Error assigning judge:', error);
    }0
  };

  return (
    <div>
      <h1>Assign Judge Dashboard</h1>

      <div>
        <h2>Judge Approved Cases</h2>
        <ul>
          {judgeApprovedCases.map((caseItem) => (
            <li key={caseItem._id}>
                  {/* Display case details */}
                  <div>
                <strong>Case Number:</strong> {caseItem.caseNumber}
              </div>
              <div>
                <strong>Case Title:</strong> {caseItem.caseDetails.title}
                  </div>
                  <div>
                <strong>Case Type:</strong> {caseItem.caseDetails.caseType}
              </div>
              <div>
                <strong>Plaintiff Name:</strong> {caseItem.plaintiffDetails.fullName}
              </div>
              <div>
                <strong>Defendant Name:</strong> {caseItem.defendantDetails.fullname}
                  </div>
                  <div>
                <strong>Court Name:</strong> {caseItem.caseDetails.courtName}
              </div>
              {/* Assign Judge button */}
              <button onClick={() => handleAssignJudge(caseItem._id)}>
                Assign Judge for the Case
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AssignJudgeDashboard;