// CaseDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CaseDetails.css'

const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/client/mycases/${caseId}`, { withCredentials: true });
        setCaseDetails(response.data.caseDetails || {});
      } catch (error) {
        console.error('Error fetching case details:', error);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  return (
    <div>
      <h3>Case Details</h3>
      {caseDetails ? (
        <div>
          <h4>Case ID: {caseDetails._id}</h4>
          <h5>Plaintiff Details</h5>
          <p>Name: {caseDetails.plaintiffDetails.fullName}</p>
          <p>Gender: {caseDetails.plaintiffDetails.gender}</p>
          {/* Display other plaintiff details */}
          <h5>Defendant Details</h5>
          <p>Name: {caseDetails.defendantDetails.fullName}</p>
          <p>Gender: {caseDetails.defendantDetails.gender}</p>
          {/* Display other defendant details */}
          <h5>Case Details</h5>
          <p>Case Type: {caseDetails.caseDetails.caseType}</p>
          <p>Title: {caseDetails.caseDetails.title}</p>
          {/* Display other case details */}
          <h5>Payment Details</h5>
          <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p>
          {/* Display other payment details */}
          {/* <h5>Document Details</h5>
          {caseDetails.documents.map((document, index) => (
            <p key={index}>Document {index + 1}: {document}</p>
          ))} */}
          {/* Display other document details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CaseDetails;
