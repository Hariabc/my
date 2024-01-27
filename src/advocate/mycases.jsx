import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import DocumentModal from './documents'
const Advocatemycases = () => {
  const [advocateCases, setAdvocateCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  useEffect(() => {
    const fetchAdvocateCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/advocate/mycases', { withCredentials: true });
        const cases = response.data;
        setAdvocateCases(cases);
      } catch (error) {
        console.error('Error fetching advocate cases:', error);
      }
    };

    // Fetch advocate cases when the component mounts
    fetchAdvocateCases();
  }, []);

  const viewCaseDetails = (caseId) => {
    const selected = advocateCases.find(caseItem => caseItem._id === caseId);
    setSelectedCase(selected);
  };

  const closeCaseDetailsModal = () => {
    setSelectedCase(null);
  };

  const viewDocuments = (caseId) => {
    const selected = advocateCases.find((caseItem) => caseItem._id === caseId);
    setSelectedCase(selected);
    setDocumentModalVisible(true);
  };

  const handleCloseDocumentModal = () => {
    setDocumentModalVisible(false);
    setSelectedCase(null);
  };

  return (
    <div>
      <h2>Your Cases</h2>
      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Case Number</th>
            <th>Title</th>
            <th>Client Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {advocateCases.map((caseItem, index) => (
            <tr key={caseItem._id}>
              <td>{index + 1}</td>
              <td>{caseItem.caseNumber}</td>
              <td>{caseItem.caseDetails.title}</td>
              <td>{caseItem.plaintiffDetails.fullName}</td>
              <td>{caseItem.progress}</td>
              <td>
                <button onClick={() => viewCaseDetails(caseItem._id)}>
                  View Case Details
                </button>
                <button onClick={() => viewDocuments(caseItem._id)}>
                  View Documents
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
          {selectedCase && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
                          <div className="section">
                          <button onClick={closeCaseDetailsModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
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
              
            </div>
          </div>
        </div>
          )}
           {documentModalVisible && (
        <DocumentModal documents={selectedCase.documents} onClose={handleCloseDocumentModal} />
      )}
    </div>
  );
};

export default Advocatemycases;
