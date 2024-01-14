import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './judge_assign.css';

const AssignJudgeDashboard = () => {
  const [judgeApprovedCases, setJudgeApprovedCases] = useState([]);
  const [registeredJudges, setRegisteredJudges] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      // Open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching registered judges:', error);
    }
  };

  const handleJudgeSelection = async () => {
    if (selectedJudge) {
      try {
        // Assign the selected judge to the case
        await axios.post(`http://localhost:5000/cao/assign-judge/${selectedJudge}/${selectedCase}`, {
          withCredentials: true,
        });
        console.log(`Assigned judge for case with ID: ${selectedCase} to Judge ID: ${selectedJudge._id}`);
      } catch (error) {
        console.error('Error assigning judge:', error);
      } finally {
        // Close the modal after assignment
        setIsModalOpen(false);
      }
    } else {
      console.log('No judge selected. Please choose a judge.');
    }
  };

  const handleCloseModal = () => {
    // Close the modal without taking any action
    setIsModalOpen(false);
  };

  return (
    <div className="assign-judge-dashboard">
      <h1>Assign Judge Dashboard</h1>

      <div>
        <h2>Judge Approved Cases</h2>
        <ul className="case-list">
          {judgeApprovedCases.map((caseItem) => (
            <li key={caseItem._id} className="case-box">
              {/* Display case details */}
              <div className="case-details">
                <strong>Case Number:</strong> {caseItem.caseNumber}
              </div>
              <div className="case-details">
                <strong>Case Title:</strong> {caseItem.caseDetails.title}
              </div>
              <div className="case-details">
                <strong>Case Type:</strong> {caseItem.caseDetails.caseType}
              </div>
              <div className="case-details">
                <strong>Plaintiff Name:</strong> {caseItem.plaintiffDetails.fullName}
              </div>
              <div className="case-details">
                <strong>Defendant Name:</strong> {caseItem.defendantDetails.fullname}
              </div>
              <div className="case-details">
                <strong>Court Name:</strong> {caseItem.caseDetails.courtName}
              </div>
              <div className="assign-button-container">
                <button onClick={() => handleAssignJudge(caseItem._id)} className="assign-button">
                  Assign Judge for the Case
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for selecting a judge */}
      {isModalOpen && (
        <div className="overlay">
          <div className="box">
            <h2>Select a Judge</h2>
            <div className="select-container">
              <label>Select a Judge:</label>
              <select onChange={(e) => setSelectedJudge(e.target.value)} className="judge-dropdown">
                <option value="" disabled selected>
                  Choose a Judge
                </option>
                {registeredJudges.map((judge) => (
                  <option key={judge._id} value={judge._id}>
                    {judge.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-buttons">
              <button onClick={handleJudgeSelection} className="modal-button">
                Assign Judge
              </button>
              <button onClick={handleCloseModal} className="close-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignJudgeDashboard;