// components/AssignJudgeDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignJudgeDashboard = () => {
  const [judgeApprovedCases, setJudgeApprovedCases] = useState([]);
  const [registeredJudges, setRegisteredJudges] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedJudge, setSelectedJudge] = useState(null);

  useEffect(() => {
    const fetchJudgeApprovedCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/judgeapproved-cases', {
          withCredentials: true,
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
      // Fetch the list of registered judges for the admin
      const response = await axios.get(`http://localhost:5000/cao/registered-judges`, {
        withCredentials: true,
      });
      setRegisteredJudges(response.data.registeredJudges);

      // Set the selected case
      setSelectedCase(caseId);
    } catch (error) {
      console.error('Error fetching registered judges:', error);
    }
  };

  const handleJudgeSelection = async () => {
    if (selectedJudge) {
      try {
        // Assign the selected judge to the case
        await axios.post(`http://localhost:5000/cao/assign-judge/${selectedJudge._id}/${selectedCase}`, {
          withCredentials: true,
        });
        console.log(`Assigned judge for case with ID: ${selectedCase} to Judge ID: ${selectedJudge._id}`);
      } catch (error) {
        console.error('Error assigning judge:', error);
      }
    } else {
      console.log('No judge selected. Please choose a judge.');
    }
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
              {/* Additional case details... */}
              {/* Assign Judge button */}
              <button onClick={() => handleAssignJudge(caseItem._id)}>
                Assign Judge for the Case
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for selecting a judge */}
      {selectedCase && (
        <div className="modal">
          <h2>Select a Judge</h2>
          <ul>
            {registeredJudges.map((judge) => (
              <li key={judge._id}>
                <input
                  type="radio"
                  name="judge"
                  value={judge._id}
                  onChange={() => setSelectedJudge(judge)}
                />
                <label>{judge.name}</label>
              </li>
            ))}
          </ul>
          <button onClick={handleJudgeSelection}>Assign Judge</button>
        </div>
      )}
    </div>
  );
};

export default AssignJudgeDashboard;
