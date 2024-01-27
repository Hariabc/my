import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './judge_assign.css'; // Make sure to create the appropriate CSS file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignPublicAdvocateDashboard = () => {
  const [publicAdvocateApprovedCases, setPublicAdvocateApprovedCases] = useState([]);
  const [registeredPublicAdvocates, setRegisteredPublicAdvocates] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedPublicAdvocate, setSelectedPublicAdvocate] = useState(null);
  const [assignedCases, setAssignedCases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPublicAdvocateApprovedCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/publicadvocateapproved-cases', {
          withCredentials: true,
        });
        setPublicAdvocateApprovedCases(response.data.publicadvocateapprovedcases);
      } catch (error) {
        console.error('Error fetching public advocate approved cases:', error);
      }
    };

    fetchPublicAdvocateApprovedCases();
  }, []);

  useEffect(() => {
    const fetchRegisteredPublicAdvocates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/registered-publicAdvocates', {
          withCredentials: true,
        });
        setRegisteredPublicAdvocates(response.data.registeredPublicadvocates);
      } catch (error) {
        console.error('Error fetching registered public advocates:', error);
      }
    };

    fetchRegisteredPublicAdvocates();
  }, []);

  const handleAssignPublicAdvocate = async (caseId) => {
    try {
      await axios.post(
        `http://localhost:5000/cao/assign-publicAdvocate/${selectedPublicAdvocate}/${caseId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(`Assigned public advocate for case with ID: ${caseId} to Public Advocate ID: ${selectedPublicAdvocate._id}`);

      setAssignedCases((prevAssignedCases) => [...prevAssignedCases, caseId]);

      toast.success('Public Advocate assigned to the case successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error assigning public advocate:', error);

      toast.error('Error assigning public advocate. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredPublicAdvocateApprovedCases= (publicAdvocateApprovedCases || []).filter(
    (caseItem) => !assignedCases.includes(caseItem._id)
  );
  
  const handleAssignPublicAdvocateClick = (caseId) => {
    setSelectedCase(caseId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="assign-public-advocate-dashboard">
      <ToastContainer />
      <h1>Assign Public Advocate Dashboard</h1>

      <div>
        <h2>Public Advocate Approved Cases</h2>
        <ul className="case-list">
          {filteredPublicAdvocateApprovedCases.map((caseItem) => (
            <li key={caseItem._id} className="case-box">
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
                <strong>Defendant Name:</strong> {caseItem.defendantDetails.fullName}
              </div>
              <div className="case-details">
                <strong>Court Name:</strong> {caseItem.caseDetails.courtName}
              </div>
              <div className="assign-button-container">
                <button
                  onClick={() => handleAssignPublicAdvocateClick(caseItem._id)}
                  className="assign-button"
                >
                  Assign Public Advocate for the Case
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="overlay">
          <div className="box">
            <h2>Select a Public Advocate</h2>
            <div className="select-container">
              <label>Select a Public Advocate:</label>
              <select
                onChange={(e) => setSelectedPublicAdvocate(e.target.value)}
                className="public-advocate-dropdown"
              >
                <option value="" disabled selected>
                  Choose a Public Advocate
                </option>
                {registeredPublicAdvocates.map((publicAdvocate) => (
                  <option key={publicAdvocate._id} value={publicAdvocate._id}>
                        {publicAdvocate.firstName} {publicAdvocate.lastName} - {publicAdvocate.gender}-{`Practice area- ${publicAdvocate.practiceArea}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-buttons">
              <button onClick={() => handleAssignPublicAdvocate(selectedCase)} className="modal-button">
                Assign Public Advocate
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

export default AssignPublicAdvocateDashboard;
