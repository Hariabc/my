import React, { useState } from 'react';
import Modal from 'react-modal';

const CaseDetailsModal = ({ caseDetails, handleClose }) => {
  const {
    plaintiffDetails,
    defendantDetails,
    caseDetails: { caseType, title, caseSummary, causeOfAction, dateOfCauseOfAction },
    paymentDetails,
  } = caseDetails;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleClose();
  };

  return (
    <div>
      <button onClick={handleViewDetails}>View Details</button>
      <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
        <h2>Case Details</h2>
        <div className="section">
          <h3>Plaintiff Details</h3>
          <p>Name: {plaintiffDetails.fullName}</p>
          <p>Gender: {plaintiffDetails.gender}</p>
        </div>
        <div className="section">
          <h3>Defendant Details</h3>
          <p>Name: {defendantDetails.fullName}</p>
          <p>Gender: {defendantDetails.gender}</p>
        </div>
        <div className="section">
          <h3>Case Details</h3>
          <p>Case Type: {caseType}</p>
          <p>Title: {title}</p>
          <p>Case Summary: {caseSummary}</p>
        </div>
        <div className="section">
          <h3>Payment Details</h3>
          <p>Payment Method: {paymentDetails.paymentMethod}</p>
        </div>
        <button onClick={handleModalClose}>Close</button>
      </Modal>
    </div>
  );
};

export default CaseDetailsModal;