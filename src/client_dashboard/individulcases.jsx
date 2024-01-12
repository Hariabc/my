import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Individualcases.css'

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
  const DetailsToPDF = async () => {
    const pdf = new jsPDF();
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('Plantiff Details:', 30, 20);
    pdf.setFontSize(14);
    Object.entries(caseDetails.plaintiffDetails).forEach(([key, value], index) => {
      pdf.text(`${key}: ${value}`, 30, 45 + index * 15);
    });
    pdf.addPage();
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('Defendant Details:', 30, 20);
    pdf.setFontSize(14);
    Object.entries(caseDetails.defendantDetails).forEach(([key, value], index) => {
      pdf.text(`${key}: ${value}`, 30, 45 + index * 15);
    });
    pdf.addPage();
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text('Case Details:', 30, 20);
    pdf.setFontSize(14);
    Object.entries(caseDetails.caseDetails).forEach(([key, value], index) => {
      pdf.text(`${key}: ${value}`, 30, 45 + index * 15);
    });
    pdf.save('form-details.pdf');
  };
  return (
    <div className="ind-container">
      <h3 className="title">Case Details</h3>
      {caseDetails ? (
        <div>
          <h4 className="subtitle">Case ID: {caseDetails._id}</h4>
          <h5 className="subtitle">Plaintiff Details</h5>
          <hr />
          <div className="details">
                      <p>Name: {caseDetails.plaintiffDetails.fullName}</p>
                      <p>Gender: {caseDetails.plaintiffDetails.gender}</p>
                      <p>Age: {caseDetails.plaintiffDetails.Age}</p>
                      <p>Email Address: {caseDetails.plaintiffDetails.partyEmailAddresses}</p>
                      <p>Phonenumber: {caseDetails.plaintiffDetails.partyPhoneNumber}</p>
                      <p>State: {caseDetails.plaintiffDetails.state}</p>
                      <p>District: {caseDetails.plaintiffDetails.district}</p>
                      <p>Village: {caseDetails.plaintiffDetails.village}</p>
                      
            
            {/* Display other plaintiff details */}
          </div>
          <h5 className="subtitle">Defendant Details</h5>
          <hr />
          <div className="details">
            <p>Name: {caseDetails.defendantDetails.fullName}</p>
                      <p>Gender: {caseDetails.defendantDetails.gender}</p>
                      <p>Age: {caseDetails.defendantDetails.age}</p>
                      <p>Email Address: {caseDetails.defendantDetails.partyEmailAddresses}</p>
                      <p>Phonenumber: {caseDetails.defendantDetails.partyPhoneNumber}</p>
                      <p>State: {caseDetails.defendantDetails.state}</p>
                      <p>District: {caseDetails.defendantDetails.district}</p>
                      <p>Village: {caseDetails.defendantDetails.village}</p>
          

            {/* Display other defendant details */}
          </div>
          <h5 className="subtitle">Case Details</h5>
          <hr />
          <div className="details">
            <p>Case Type: {caseDetails.caseDetails.caseType}</p>
                      <p>Title: {caseDetails.caseDetails.title}</p>
                      <p>Case Summary: {caseDetails.caseDetails.caseSummary}</p>
                      <p>Cause of Action: {caseDetails.caseDetails.causeOfAction}</p>
                      <p>Date of cause of Action: {caseDetails.caseDetails.dateOfCauseOfAction}</p>
                      <p>Relief Sought: {caseDetails.caseDetails.reliefsought}</p>
                      <p>Court Name: {caseDetails.caseDetails.courtName}</p>
                      <p>Court District: {caseDetails.caseDetails.courtDistrict}</p>
            <p>Court State: {caseDetails.caseDetails.courtState}</p>
                      
            {/* Display other case details */}
          </div>
          <h5 className="subtitle">Payment Details</h5>
          <hr />
          <div className="details">
                      <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p>
                      {/* <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p>
                      <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p>
                      <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p> */}
            {/* Display other payment details */}
          </div>
          {/* <h5 className="subtitle">Document Details</h5>
          {caseDetails.documents.map((document, index) => (
            <p key={index}>Document {index + 1}: {document}</p>
          ))}
          Display other document details */}
          <div className="printButton-div">
            <button className="printButton" onClick={DetailsToPDF}><i style={{"position": "relative", "bottom": "3px", "left": "5px"}}>Print</i></button>
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default CaseDetails;