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

  // Calculate total cases count
  const totalCasesCount = cases.length;

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
        <div className="total-cases">
             <h2>Total Cases: {totalCasesCount}</h2>
        </div>
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
              {/* Your modal content here */}
              <button onClick={closeCaseDetailsModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
