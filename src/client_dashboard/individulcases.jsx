import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Individualcases.css'
import { LuPrinter } from "react-icons/lu";
import { BeatLoader } from 'react-spinners';

const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  // useEffect(() => {
  //   const fetchCaseDetails = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/client/mycases/${caseId}`, { withCredentials: true });
  //       setCaseDetails(response.data.caseDetails || {});
  //     } catch (error) {
  //       console.error('Error fetching case details:', error);
  //     }
  //   };
    
  //   fetchCaseDetails();
  // }, [caseId]);

  useEffect(() => {
    const fetchCaseDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/client/mycases/${caseId}`, { withCredentials: true });
            setCaseDetails(response.data.caseDetails || {});
        } catch (error) {
            console.error('Error fetching case details:', error);
        }
    };

    // Add a timeout of 1000 milliseconds (1 second) before calling fetchCaseDetails
    const timeoutId = setTimeout(() => {
        fetchCaseDetails();
    }, 1000);

    // Cleanup function to clear the timeout in case the component unmounts before the timeout is reached
    return () => clearTimeout(timeoutId);

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
    <>
    <div className="ind-container">
      <div className="case-info">
        <h3 className="ind-title" style={{backgroundColor:"#40A2D8",padding:"10px",borderRadius:"4px"}}>Case Details</h3>
        {caseDetails ? (
          <div>
          <div className="boxCaseDetails">
            <h5 className="subtitle">Case ID</h5>
            <hr />
            <div className="details">
              <p>{caseDetails.caseNumber}</p>
            </div>
          </div>
          
          <div className="details-container">
            <div className="boxA">
              <h5 className="subtitle">Plaintiff Details</h5>
              <hr />
              <div className="details">
                <p>Name: {caseDetails.plaintiffDetails.fullName}</p>
                <p>Gender: {caseDetails.plaintiffDetails.gender}</p>
                <p>Age: {caseDetails.plaintiffDetails.age}</p>
                <p>Email Address: {caseDetails.plaintiffDetails.partyEmailAddresses}</p>
                <p>Phonenumber: {caseDetails.plaintiffDetails.partyPhoneNumbers}</p>
                <p>State: {caseDetails.plaintiffDetails.state}</p>
                <p>District: {caseDetails.plaintiffDetails.district}</p>
                <p>Village: {caseDetails.plaintiffDetails.village}</p>
              </div>
            </div>

            <div className="boxB">
              <h5 className="subtitle">Defendant Details</h5>
              <hr />
              <div className="details">
                <p>Name: {caseDetails.defendantDetails.fullName}</p>
                <p>Gender: {caseDetails.defendantDetails.gender}</p>
                <p>Age: {caseDetails.defendantDetails.age}</p>
                <p>Email Address: {caseDetails.defendantDetails.partyEmailAddresses}</p>
                <p>Phonenumber: {caseDetails.defendantDetails.partyPhoneNumbers}</p>
                <p>State: {caseDetails.defendantDetails.state}</p>
                <p>District: {caseDetails.defendantDetails.district}</p>
                <p>Village: {caseDetails.defendantDetails.village}</p>
              </div>
            </div>

            <div className="boxC">
              <h5 className="subtitle">Case Details</h5>
              <hr />
              <div className="details">
                <p>Case Type: {caseDetails.caseDetails.caseType}</p>
                <p>Title: {caseDetails.caseDetails.title}</p>
                <p>Case Summary: {caseDetails.caseDetails.caseSummary}</p>
                <p>Cause of Action: {caseDetails.caseDetails.causeOfAction}</p>
                <p>Date of cause of Action: {caseDetails.caseDetails.dateOfCauseOfAction}</p>
                <p>Relief Sought: {caseDetails.caseDetails.reliefSought}</p>
                <p>Court Name: {caseDetails.caseDetails.courtName}</p>
                <p>Court District: {caseDetails.caseDetails.courtDistrict}</p>
                <p>Court State: {caseDetails.caseDetails.courtState}</p>
              </div>
            </div>

            <div className="boxD">
              <h5 className="subtitle">Payment Details</h5>
              <hr />
              <div className="details">
                <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p>
              </div>
            </div>
              </div>
              
              <div className="printButton-div">
            <button className="printButton" onClick={DetailsToPDF} style={{color:"white",fontSize:"20px",backgroundColor:"#1D2B53"}}>
            <LuPrinter style={{paddingRight:"4px",verticalAlign:"sub"}} size={25}/>Print</button>
          </div>
        </div>
            
        ) : (
          <div className="loader" style={{marginLeft:"48%"}}>
            <BeatLoader color="black"/>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default CaseDetails;