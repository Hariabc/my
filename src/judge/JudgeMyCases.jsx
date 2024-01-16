// JudgeDetails.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const JudgeMyCases = ({ judgeId }) => {
  const [judge, setJudge] = useState({
    name: "",
    cases: [],
  });

  useEffect(() => {
    const fetchJudgeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/judge/judges/${judgeId}/cases`);
        setJudge(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJudgeDetails();
  }, [judgeId]);

  return (
    <div>
      <h2>Judge Details</h2>
      <p>Judge Name: {judge.name}</p>
      <p>Assigned Cases:</p>
      <ul>
        {judge.cases.map((assignedCase) => (
          <li key={assignedCase._id}>
            <p>Case Number: {assignedCase.caseNumber}</p>
            <p>Case Type: {assignedCase.caseType}</p>
            <p>Case Status: {assignedCase.caseStatus}</p>

            <h4>Hearings:</h4>
            <ul>
              {assignedCase.hearings.map((hearing) => (
                <li key={hearing._id}>
                  <p>Hearing Date: {hearing.hearingDate}</p>
                  <p>Hearing Time: {hearing.hearingTime}</p>
                  <p>Hearing Mode: {hearing.hearingMode}</p>
                  <p>Hearing Status: {hearing.hearingStatus}</p>
                  <p>Hearing Notes: {hearing.hearingNotes}</p>
                </li>
              ))}
            </ul>

            <h4>Orders:</h4>
            <ul>
              {assignedCase.orders.map((order) => (
                <li key={order._id}>
                  <p>Order Type: {order.orderType}</p>
                  <p>Order Content: {order.orderContent}</p>
                  <p>Order Date: {order.orderDate}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JudgeMyCases;