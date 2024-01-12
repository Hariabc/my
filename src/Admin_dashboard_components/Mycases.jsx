// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mycases.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [approveOptionsVisible, setApproveOptionsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/mycases', { withCredentials: true });
        setCases(response.data.courtCases);
        setFilteredCases(response.data.courtCases);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const selectedType = e.target.value;

    if (selectedType === 'all') {
      setFilteredCases(cases);
    } else {
      const filtered = cases.filter((caseItem) => caseItem.filecasetype === selectedType);
      setFilteredCases(filtered);
    }

    setFilterType(selectedType);
  };

  const handleApprove = (caseId) => {
    // Set state to show approve options modal
    setApproveOptionsVisible(true);
    // Set the selected case
    setSelectedCase(cases.find((caseItem) => caseItem._id === caseId));
  };

  const handleReject = (caseId) => {
    // Handle reject action
    console.log(`Rejected case with ID: ${caseId}`);
  };

  const openCaseDetailsModal = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleAssignJudge = async () => {
    try {
      // Make a POST request to your backend endpoint for assigning a judge
      const response = await axios.post('http://localhost:5000/cao/approve-for-assigning-judge', {
        caseId: selectedCase._id,
        // Add any other data you want to send to the server
      },{ withCredentials: true });

      // Handle the response as needed
      console.log('Response from server:', response.data);

      // Close the modal
      setApproveOptionsVisible(false);
    } catch (error) {
      console.error('Error assigning judge:', error);
      // Handle error as needed
    }
  };


  const handleAssignPublicAdvocate = async () => {
    // Handle assign public advocate action
    try {
      // Make a POST request to your backend endpoint for assigning a judge
      const response = await axios.post('http://localhost:5000/cao/approve-for-assigning-advocate', {
        caseId: selectedCase._id,
        // Add any other data you want to send to the server
      },{ withCredentials: true });

      // Handle the response as needed
      console.log('Response from server:', response.data);

      // Close the modal
      setApproveOptionsVisible(false);
    } catch (error) {
      console.error('Error assigning judge:', error);
      // Handle error as needed
    };
  };

  const closeApproveOptionsModal = () => {
    // Close the modal without taking any action
    setApproveOptionsVisible(false);
    setSelectedCase(null);
  };

  const closeCaseDetailsModal = () => {
  setApproveOptionsVisible(false);
   setSelectedCase(null);
  };

  return (
    <div className="container">
      <h1>Admin Dashboard - Pending Cases</h1>
      <div className="filter-section">
        <label>Filter by Case Type:</label>
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="partyinperson">Party in Person</option>
          <option value="privateAdvocate">Private Advocate</option>
          <option value="publicAdvocate">Public Advocate</option>
        </select>
      </div>
      <div>
        <h2>Filtered Cases:</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Case Title</th>
              <th>Case Number</th>
              <th>View Details</th>
              <th>View Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem, index) => (
              <tr key={caseItem._id}>
                <td>{index + 1}</td>
                <td>{caseItem.caseTitle}</td>
                <td>{caseItem.caseNumber}</td>
                <td>
                  <button onClick={() => openCaseDetailsModal(caseItem)}>View Details</button>
                </td>
                <td>
                  <button onClick={() => viewDocuments(caseItem)}>View Documents</button>
                </td>
                <td>
                  <button onClick={() => handleApprove(caseItem._id)} className='approve-btn'>Approve</button>
                  <button onClick={() => handleReject(caseItem._id)} className='reject-btn'>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
              {/* Case Details Sections and other details... */}
              <div className="section">
          <h3>Plaintiff Details</h3>
          <p>Name: {selectedCase.plaintiffDetails.fullName}</p>
                <p>Gender: {selectedCase.plaintiffDetails.gender}</p>
                <p>Age: {selectedCase.plaintiffDetails.age}</p>
                <p>Email Address: {selectedCase.plaintiffDetails.partyEmailAddresses}</p>
                <p>Phone Number: {selectedCase.plaintiffDetails.partyPhoneNumbers}</p>
                <p>Relation: {selectedCase.plaintiffDetails.relation}</p>
                <p>Address: {selectedCase.plaintiffDetails.partyAddress}</p>
                <p>State: {selectedCase.plaintiffDetails.state}</p>
                <p>District: {selectedCase.plaintiffDetails.district}</p>
         
        </div>
        <div className="section">
          <h3>Defendant Details</h3>
          <p>Name: {selectedCase.defendantDetails.fullName}</p>
                <p>Gender: {selectedCase.defendantDetails.gender}</p>
                <p>Age: {selectedCase.defendantDetails.age}</p>
                <p>Email Address: {selectedCase.defendantDetails.partyEmailAddresses}</p>
                <p>Phone Number: {selectedCase.defendantDetails.partyPhoneNumbers}</p>
                <p>Relation: {selectedCase.defendantDetails.relation}</p>
                <p>Address: {selectedCase.defendantDetails.partyAddress}</p>
                <p>State: {selectedCase.defendantDetails.state}</p>
                <p>District: {selectedCase.defendantDetails.district}</p>
              </div> 
              <div className="section">
          <h3>Case Details</h3>
          <p>Case : {selectedCase.filecasetype}</p>
                <p>Title: {selectedCase.caseDetails.title}</p>
                <p>Case-Type : {selectedCase.caseDetails.caseType}</p>
                <p>Case-Summary : {selectedCase.caseDetails.caseSummary}</p>
                <p>Cause of Action : {selectedCase.caseDetails.causeOfAction}</p>
                <p>Date of cause of action: {selectedCase.caseDetails.dateOfCauseOfAction}</p>
                <p>Relief-Sought: {selectedCase.caseDetails.reliefSought}</p>
                <p>Court State : {selectedCase.caseDetails.courtState}</p>
                <p>Court District : {selectedCase.caseDetails.courtDistrict}</p>
                <p>Court Name : {selectedCase.caseDetails.courtName}</p>
              </div>
              <div className="section">
          <h3>Payment Details</h3>
          <p>Payment Method: {selectedCase.paymentDetails.paymentMethod}</p>
              </div>
              {approveOptionsVisible && (
                <div className="overlay">
                  <div className="modal">
                    <div className="modal-content">
                      <h2>Approve Options</h2>
                      <p>Choose an option to proceed:</p>
                      <button onClick={handleAssignJudge} className='assign-btn'>Approve for Assigning Judge</button>
                      <button onClick={handleAssignPublicAdvocate} className='assign-btn'>Approve for Assigning Public Advocate</button>
                      <button onClick={closeApproveOptionsModal} className='close-btn'>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button className="close-btn" onClick={closeCaseDetailsModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
