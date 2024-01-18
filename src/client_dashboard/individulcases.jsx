import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Individualcases.css';

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
    pdf.text('Plaintiff Details:', 30, 20);
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
    <section className="section">
      <div className="container">
        <h3 className="title is-3">Case Details</h3>

        {caseDetails ? (
          <div>
            <div className="box">
              <h5 className="subtitle is-5">Case ID</h5>
              <div className="content">
                <p>{caseDetails._id}</p>
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="box">
                  <h5 className="subtitle is-5">Plaintiff Details</h5>
                  <div className="content">
                  <p>Name: {caseDetails.plaintiffDetails.fullName}</p>
                <p>Gender: {caseDetails.plaintiffDetails.gender}</p>
                <p>Age: {caseDetails.plaintiffDetails.Age}</p>
                <p>Email Address: {caseDetails.plaintiffDetails.partyEmailAddresses}</p>
                <p>Phonenumber: {caseDetails.plaintiffDetails.partyPhoneNumber}</p>
                <p>State: {caseDetails.plaintiffDetails.state}</p>
                <p>District: {caseDetails.plaintiffDetails.district}</p>
                <p>Village: {caseDetails.plaintiffDetails.village}</p>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="box">
                  <h5 className="subtitle is-5">Defendant Details</h5>
                  <div className="content">
                  <p>Name: {caseDetails.defendantDetails.fullName}</p>
                <p>Gender: {caseDetails.defendantDetails.gender}</p>
                <p>Age: {caseDetails.defendantDetails.age}</p>
                <p>Email Address: {caseDetails.defendantDetails.partyEmailAddresses}</p>
                <p>Phonenumber: {caseDetails.defendantDetails.partyPhoneNumber}</p>
                <p>State: {caseDetails.defendantDetails.state}</p>
                <p>District: {caseDetails.defendantDetails.district}</p>
                <p>Village: {caseDetails.defendantDetails.village}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="box">
              <h5 className="subtitle is-5">Case Details</h5>
              <div className="content">
              <p>Case Type: {caseDetails.caseDetails.caseType}</p>
                <p>Title: {caseDetails.caseDetails.title}</p>
                <p>Case Summary: {caseDetails.caseDetails.caseSummary}</p>
                <p>Cause of Action: {caseDetails.caseDetails.causeOfAction}</p>
                <p>Date of cause of Action: {caseDetails.caseDetails.dateOfCauseOfAction}</p>
                <p>Relief Sought: {caseDetails.caseDetails.reliefsought}</p>
                <p>Court Name: {caseDetails.caseDetails.courtName}</p>
                <p>Court District: {caseDetails.caseDetails.courtDistrict}</p>
                <p>Court State: {caseDetails.caseDetails.courtState}</p>
              </div>
            </div>

            <div className="box">
              <h5 className="subtitle is-5">Payment Details</h5>
              <div className="content">
                <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p>
              </div>
            </div>

            <div className="has-text-centered">
              <button className="button is-primary" onClick={DetailsToPDF}>
                <span className="icon">
                  <i className="fas fa-print"></i>
                </span>
                <span>Print</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </div>
    </section>
  );
};

export default CaseDetails;
