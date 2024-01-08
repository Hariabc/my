import React from 'react';

const CaseDetailsModal = ({ caseDetails, handleClose }) => {
  // Destructure caseDetails and display the information in the modal
  const {
    plaintiffDetails,
    defendantDetails,
    caseDetails: { caseType, title, caseSummary, causeOfAction, dateOfCauseOfAction },
    paymentDetails,
  } = caseDetails;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Case Details</h2>
        <div className="section">
          <h3>Plaintiff Details</h3>
          {/* Display plaintiffDetails information */}
          <p>Name: {plaintiffDetails.fullName}</p>
          <p>Gender: {plaintiffDetails.gender}</p>
          {/* Add more plaintiffDetails information */}
        </div>
        <div className="section">
          <h3>Defendant Details</h3>
          {/* Display defendantDetails information */}
          <p>Name: {defendantDetails.fullName}</p>
          <p>Gender: {defendantDetails.gender}</p>
          {/* Add more defendantDetails information */}
        </div>
        <div className="section">
          <h3>Case Details</h3>
          {/* Display caseDetails information */}
          <p>Case Type: {caseType}</p>
          <p>Title: {title}</p>
          <p>Case Summary: {caseSummary}</p>
          {/* Add more caseDetails information */}
        </div>
        <div className="section">
          <h3>Payment Details</h3>
          {/* Display paymentDetails information */}
          <p>Payment Method: {paymentDetails.paymentMethod}</p>
          {/* Add more paymentDetails information */}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsModal;
