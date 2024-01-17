// import React, { useState, useEffect } from 'react';
// import jsPDF from 'jspdf';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const JudgeCaseDetails = () => {
//   const { caseId } = useParams();
//   const [caseDetails, setCaseDetails] = useState(null);
//   useEffect(() => {
//     const fetchCaseDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/judge/my-cases/${caseId}`, { withCredentials: true });
//         setCaseDetails(response.data.caseDetails || {});
//       } catch (error) {
//         console.error('Error fetching case details:', error);
//       }
//     };
    
//     fetchCaseDetails();
//   }, [caseId]);
//   const DetailsToPDF = async () => {
//     const pdf = new jsPDF();
//     pdf.setFont('helvetica', 'bold');
//     pdf.setFontSize(20);
//     pdf.text('Plantiff Details:', 30, 20);
//     pdf.setFontSize(14);
//     Object.entries(caseDetails.plaintiffDetails).forEach(([key, value], index) => {
//       pdf.text(`${key}: ${value}`, 30, 45 + index * 15);
//     });
//     pdf.addPage();
//     pdf.setFont('helvetica', 'bold');
//     pdf.setFontSize(20);
//     pdf.text('Defendant Details:', 30, 20);
//     pdf.setFontSize(14);
//     Object.entries(caseDetails.defendantDetails).forEach(([key, value], index) => {
//       pdf.text(`${key}: ${value}`, 30, 45 + index * 15);
//     });
//     pdf.addPage();
//     pdf.setFont('helvetica', 'bold');
//     pdf.setFontSize(20);
//     pdf.text('Case Details:', 30, 20);
//     pdf.setFontSize(14);
//     Object.entries(caseDetails.caseDetails).forEach(([key, value], index) => {
//       pdf.text(`${key}: ${value}`, 30, 45 + index * 15);
//     });
//     pdf.save('form-details.pdf');
//   };
//   return (
//     <>
//     <div className="container">
//       <div className="case-info">
//         <h3 className="title">Case Details</h3>
//         {caseDetails ? (
//           <div>
//           <div className="boxCaseDetails">
//             <h5 className="subtitle">Case ID</h5>
//             <div className="details">
//               <p>{caseDetails._id}</p>
//             </div>
//           </div>
          
//           <div className="details-container">
//             <div className="boxA">
//               <h5 className="subtitle">Plaintiff Details</h5>
//               <div className="details">
//                 <p>Name: {caseDetails.plaintiffDetails.fullName}</p>
//                 <p>Gender: {caseDetails.plaintiffDetails.gender}</p>
//                 <p>Age: {caseDetails.plaintiffDetails.Age}</p>
//                 <p>Email Address: {caseDetails.plaintiffDetails.partyEmailAddresses}</p>
//                 <p>Phonenumber: {caseDetails.plaintiffDetails.partyPhoneNumber}</p>
//                 <p>State: {caseDetails.plaintiffDetails.state}</p>
//                 <p>District: {caseDetails.plaintiffDetails.district}</p>
//                 <p>Village: {caseDetails.plaintiffDetails.village}</p>
//               </div>
//             </div>

//             <div className="boxB">
//               <h5 className="subtitle">Defendant Details</h5>
//               <div className="details">
//                 <p>Name: {caseDetails.defendantDetails.fullName}</p>
//                 <p>Gender: {caseDetails.defendantDetails.gender}</p>
//                 <p>Age: {caseDetails.defendantDetails.age}</p>
//                 <p>Email Address: {caseDetails.defendantDetails.partyEmailAddresses}</p>
//                 <p>Phonenumber: {caseDetails.defendantDetails.partyPhoneNumber}</p>
//                 <p>State: {caseDetails.defendantDetails.state}</p>
//                 <p>District: {caseDetails.defendantDetails.district}</p>
//                 <p>Village: {caseDetails.defendantDetails.village}</p>
//               </div>
//             </div>

//             <div className="boxC">
//               <h5 className="subtitle">Case Details</h5>
//               <div className="details">
//                 <p>Case Type: {caseDetails.caseDetails.caseType}</p>
//                 <p>Title: {caseDetails.caseDetails.title}</p>
//                 <p>Case Summary: {caseDetails.caseDetails.caseSummary}</p>
//                 <p>Cause of Action: {caseDetails.caseDetails.causeOfAction}</p>
//                 <p>Date of cause of Action: {caseDetails.caseDetails.dateOfCauseOfAction}</p>
//                 <p>Relief Sought: {caseDetails.caseDetails.reliefsought}</p>
//                 <p>Court Name: {caseDetails.caseDetails.courtName}</p>
//                 <p>Court District: {caseDetails.caseDetails.courtDistrict}</p>
//                 <p>Court State: {caseDetails.caseDetails.courtState}</p>
//               </div>
//             </div>

//             <div className="boxD">
//               <h5 className="subtitle">Payment Details</h5>
//               <div className="details">
//                 <p>Payment Method: {caseDetails.paymentDetails.paymentMethod}</p>
//               </div>
//             </div>
//               </div>
              
//               <div className="printButton-div">
//             <button className="printButton" onClick={DetailsToPDF}><img style={{"width": "20px", "borderRadius": "50%"}} /><i style={{"position": "relative", "bottom": "3px", "left": "5px"}}>Print</i></button>
//           </div>
//         </div>
            
//         ) : (
//           <p className="loading">Loading...</p>
//           )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default JudgeCaseDetails;

// CaseDetailsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CaseDetailsPage = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState({});

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/judges/${judgeId}/cases/${caseId}`, { withCredentials: true });
        setCaseDetails(response.data);
      } catch (error) {
        console.error('Error fetching case details:', error);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  return (
    <div>
      <h2>Case Details</h2>
      <p>Case Number: {caseDetails.caseNumber}</p>
      <p>Title: {caseDetails.caseDetails.title}</p>
      {/* Include more case details */}
    </div>
  );
};

export default CaseDetailsPage;
