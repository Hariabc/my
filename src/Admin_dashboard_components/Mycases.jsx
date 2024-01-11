import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mycases.css'; // Import your CSS file

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);

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
    // Handle approve action
    console.log(`Approved case with ID: ${caseId}`);
  };

  const handleReject = (caseId) => {
    // Handle reject action
    console.log(`Rejected case with ID: ${caseId}`);
  };

  const openCaseDetailsModal = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const closeCaseDetailsModal = () => {
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

      {/* // ... (previous code) */}

{selectedCase && (
  <div className="overlay">
    <div className="modal">
      <div className="modal-content">
        {/* <h2>Case Details</h2> */}

        {/* Plaintiff Details Section */}
        <div className="section">
          <h3>Plaintiff Details</h3>
          <p>Name: {selectedCase.plaintiffDetails.fullName}</p>
                <p>Gender: {selectedCase.plaintiffDetails.gender}</p>
                <p>Age: {selectedCase.plaintiffDetails.age}</p>
                <p>Address: {selectedCase.plaintiffDetails.partyAddress}</p>
                <p>Gender: {selectedCase.plaintiffDetails.gender}</p>
                <p>Gender: {selectedCase.plaintiffDetails.gender}</p>
                <p>Gender: {selectedCase.plaintiffDetails.gender}</p>
                <p>Gender: {selectedCase.plaintiffDetails.gender}</p>
          {/* Add more plaintiff details as needed */}
        </div>

        {/* Defendant Details Section */}
        <div className="section">
          <h3>Defendant Details</h3>
          <p>Name: {selectedCase.defendantDetails.fullName}</p>
          <p>Gender: {selectedCase.defendantDetails.gender}</p>
          {/* Add more defendant details as needed */}
        </div>

        {/* Case Details Section */}
        <div className="section">
          <h3>Case Details</h3>
          <p>Case Type: {selectedCase.filecasetype}</p>
          <p>Title: {selectedCase.caseTitle}</p>
          <p>Case Summary: {selectedCase.caseSummary}</p>
          {/* Add more case details as needed */}
        </div>

        {/* Payment Details Section */}
        <div className="section">
          <h3>Payment Details</h3>
          <p>Payment Method: {selectedCase.paymentDetails.paymentMethod}</p>
          {/* Add more payment details as needed */}
        </div>

        <button onClick={closeCaseDetailsModal}>Close</button>
      </div>
    </div>
  </div>
)}

{/* // ... (remaining code) */}

    </div>
  );
};

export default AdminDashboard;
