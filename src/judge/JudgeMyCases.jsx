// // JudgeDetails.js

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const JudgeMyCases = ({ judgeId }) => {
//   const [judge, setJudge] = useState({
//     name: "",
//     cases: [],
//   });

//   useEffect(() => {
//     const fetchJudgeDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/judge/judges/${judgeId}/cases`);
//         setJudge(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchJudgeDetails();
//   }, [judgeId]);

//   return (
//     <div>
//       <h2>Judge Details</h2>
//       <p>Judge Name: {judge.name}</p>
//       <p>Assigned Cases:</p>
//       <ul>
//         {judge.cases.map((assignedCase) => (
//           <li key={assignedCase._id}>
//             <p>Case Number: {assignedCase.caseNumber}</p>
//             <p>Case Type: {assignedCase.caseType}</p>
//             <p>Case Status: {assignedCase.caseStatus}</p>

//             <h4>Hearings:</h4>
//             <ul>
//               {assignedCase.hearings.map((hearing) => (
//                 <li key={hearing._id}>
//                   <p>Hearing Date: {hearing.hearingDate}</p>
//                   <p>Hearing Time: {hearing.hearingTime}</p>
//                   <p>Hearing Mode: {hearing.hearingMode}</p>
//                   <p>Hearing Status: {hearing.hearingStatus}</p>
//                   <p>Hearing Notes: {hearing.hearingNotes}</p>
//                 </li>
//               ))}
//             </ul>

//             <h4>Orders:</h4>
//             <ul>
//               {assignedCase.orders.map((order) => (
//                 <li key={order._id}>
//                   <p>Order Type: {order.orderType}</p>
//                   <p>Order Content: {order.orderContent}</p>
//                   <p>Order Date: {order.orderDate}</p>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default JudgeMyCases;

// JudgeMycases.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js

// JudgeMycasesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JudgeMycases.css';

const JudgeMycasesPage = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const fetchJudgeCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/mycases', { withCredentials: true });
        console.log('API Response:', response.data);
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching judge cases:', error);
      }
    };

    fetchJudgeCases();
  }, []);

  const handleViewDetails = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  return (
    <div>
      <h2>My Cases</h2>
      <ul>
        {cases.map((caseItem) => (
          <li key={caseItem._id}>
            <h3>Case Number: {caseItem.caseNumber}</h3>
            <p>Title: {caseItem.caseDetails.title}</p>
            <p>Category: {caseItem.filecasetype}</p>
            <p>Filing Date: {new Date(caseItem.filingDate).toLocaleDateString()}</p>
            <p>Status: {caseItem.status}</p>
            <button onClick={() => handleViewDetails(caseItem)}>View Case Details</button>
          </li>
        ))}
      </ul>

      {selectedCase && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Case Details</h2>
            
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
      )}
    </div>
  );
};

export default JudgeMycasesPage;