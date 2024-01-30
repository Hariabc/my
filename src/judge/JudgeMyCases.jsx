import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JudgeMyCases.css';
import { useNavigate } from 'react-router-dom';
import DocumentModal from './document';

const JudgeMyCases = ({ judgeId }) => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchJudgeCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/mycases', { withCredentials: true });
        console.log('API Response:', response.data);
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching judge cases:', error.message);
      }
    };

    fetchJudgeCases();
  }, [judgeId]);

  const handleViewDetails = (caseId) => {
    const selected = cases.find(caseItem => caseItem._id === caseId);
    setSelectedCase(selected);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  const handleViewDocuments = (caseId) => {
    const selected = cases.find((caseItem) => caseItem._id === caseId);
    setSelectedCase(selected);
    setDocumentModalVisible(true);
  };

  const handleCloseDocumentModal = () => {
    setDocumentModalVisible(false);
    setSelectedCase(null);
  };

  const handleSchedulePreTrial = (caseId) => {
    navigate('/judge/schedule-pre-trial')
    console.log(`Scheduling pre-trial for case ${caseId}`);
  };

  const handleJudgement = (caseId) => {
    navigate('/judge/order-judgements')
    console.log(`Providing judgement for case ${caseId}`);
  };

  const handleCloseCase = (caseId) => {
    console.log(`Closing case ${caseId}`);
    // You can add logic for closing the case (e.g., making an API call to update the case status)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600';
      case 'In Progress':
        return 'text-blue-600';
      case 'Closed':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4">My Cases</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Case Number</th>
            <th className="py-2 px-4 border-b">Parties Involved</th>
            <th className="py-2 px-4 border-b">Case Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem._id}>
              <td className="py-2 px-4 border-b">{caseItem.caseNumber}</td>
              <td className="py-2 px-4 border-b">{caseItem.plaintiffDetails.fullName} vs {caseItem.defendantDetails.fullName}</td>
              <td className={`py-2 px-4 border-b ${getStatusColor(caseItem.progress)}`}>{caseItem.progress}</td>
              <td className="py-2 px-4 border-b">
                <button className={`text-blue-500 ${getStatusColor(caseItem.progress)}`} onClick={() => handleViewDetails(caseItem._id)}>View Case Details</button>
                <button className={`text-gray-500 ml-2 ${getStatusColor(caseItem.progress)}`} onClick={() => handleViewDocuments(caseItem._id)}>View Documents</button>
                <button className={`text-green-500 ml-2 ${getStatusColor(caseItem.progress)}`} onClick={() => handleSchedulePreTrial(caseItem._id)}>Schedule Conference</button>
                <button className={`text-indigo-500 ml-2 ${getStatusColor(caseItem.progress)}`} onClick={() => handleJudgement(caseItem._id)}>Orders & Judgements</button>
                {caseItem.progress !== 'Closed' && (
                  <button className={`text-red-500 ml-2`} onClick={() => handleCloseCase(caseItem._id)}>Close</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying case details */}
      {selectedCase && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-3xl font-semibold">Case Details</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={handleCloseModal}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              {/* Body */}
              <div className="p-6">
                {/* Your existing modal content */}
                {/* ... */}
                {/* Body */}
<div className="p-6">
                  {/* Plaintiff Details */}
                  
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

  {/* Defendant Details */}
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
          </div>
        </div>
      )}
      {documentModalVisible && (
        <DocumentModal documents={selectedCase.documents} onClose={handleCloseDocumentModal} />
      )}
    </div>
  );
};

export default JudgeMyCases;
