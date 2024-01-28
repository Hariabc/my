import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mycases.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocumentsModal from './documents';

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCaseDocuments, setSelectedCaseDocuments] = useState([]);
  const [documentsModalVisible, setDocumentsModalVisible] = useState(false);
  const [caseDetailsModalVisible, setCaseDetailsModalVisible] = useState(false);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/user', { withCredentials: true });
        setUser(response.data.user); // Assuming the response includes user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const viewDocuments = (caseItem) => {
    setSelectedCase(caseItem);
    setSelectedCaseDocuments(caseItem.documents);
    setDocumentsModalVisible(true);
  };
  const openCaseDetailsModal = (caseItem) => {
    setSelectedCase(caseItem);
    setCaseDetailsModalVisible(true);
  };

  const closeCaseDetailsModal = () => {
    setCaseDetailsModalVisible(false);
    setSelectedCase(null);
  };
  const closeDocumentsModal = () => {
    setDocumentsModalVisible(false);
    setSelectedCase(null);
  };

    
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

  return (
    <div className="case-container" style={{ width: "100%", backgroundColor: "white", padding: "20px", borderRadius: "4px" }}>
      <ToastContainer />
      <h1>Admin Dashboard - All cases </h1>
      {filteredCases.length === 0 ? (
        <p>No filed cases available.</p>
      ) : (
        <>
          <div className="filter-section" style={{ width: "300px" }}>
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
            {filteredCases.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Serial No</th>
                    <th>Case Title</th>
                    <th>Case Number</th>
                    <th>View Details</th>
                    <th>View Documents</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((caseItem, index) => (
                    <tr key={caseItem._id}>
                      <td>{index + 1}</td>
                      <td>{caseItem.caseDetails.title}</td>
                      <td>{caseItem.caseNumber}</td>
                      <td>
                        <button onClick={() => openCaseDetailsModal(caseItem)}>View Details</button>
                      </td>
                      <td>
                        <button onClick={() => viewDocuments(caseItem)}>View Documents</button>
                      </td>
                      <td>
                        {caseItem.progress} {/* Replace 'status' with the actual property representing the status */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No cases match the selected filter.</p>
            )}
          </div>

          {selectedCase && (
            <div className="overlay">
              <div className="modal">
                <div className="modal-content">
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
              <div className="section-case section">
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
                    
                  <button className="close-btn" onClick={closeCaseDetailsModal}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {documentsModalVisible && (
            <DocumentsModal
              documents={selectedCaseDocuments}
              publicAdvocateFormDetails={selectedCase.publicAdvocateFormDetails}
              onClose={closeDocumentsModal}
            />                  
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
