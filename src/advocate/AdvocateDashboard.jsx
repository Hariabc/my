// AdvocateDashboard.js
import React, { useState,useEffect } from 'react';
import advocateImage from "../assets/advocate.png";
import axios from "axios"
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import casefile from "../assets/DASHBOARDS/File a case.jpg";
import confrence from "../assets/DASHBOARDS/video conference.jpg";
import payment from "../assets/DASHBOARDS/payments.jpg";
import document from "../assets/DASHBOARDS/Documentation.jpg";
import casedetails from "../assets/DASHBOARDS/Case details.jpg";
import casetracking from "../assets/DASHBOARDS/Case tracking.jpg";
import causelist from "../assets/DASHBOARDS/Cause List.jpg";
import scheduling from "../assets/DASHBOARDS/Scheduling calender.jpg";
import caseanalytics from "../assets/DASHBOARDS/case analytics.jpg";

import advocatelist from "../assets/DASHBOARDS/Advocate list.jpg";
import "./AdvocateDashboard.css";

const FAQ_DATA = [
  {
    question: "How do I file a case?",
    answer: "To file a case, navigate to the 'File a Case' section and follow the provided instructions."
  },
  {
    question: "How can I track the status of my cases?",
    answer: "You can track the status of your cases by visiting the 'Case Tracking' section and accessing the relevant information."
  },
  {
    question: "What is included in the 'Documentation' section?",
    answer: "The 'Documentation' section contains important documents related to your cases, and you can manage them from this section."
  },
  // Add more FAQ items as needed
];

const linksData = [
  { path: "/file-a-case", label: "File a Case", image: casefile },
  { path: "/documentation", label: "Documentation", image: document },
  { path: "/payments", label: "Payments", image: payment },
  { path: "/my-cases", label: "My Cases", image: casedetails },
  { path: "/cause-list", label: "Cause List", image: causelist },
  { path: "/scheduling-calendar", label: "Scheduling Calendar", image: scheduling },
  { path: "/pre-trial-conferencing", label: "Pre Trial", image: confrence },
  { path: "/case-analytics", label: "Case Analytics", image: caseanalytics },
  { path: "/case-tracking", label: "Case Tracking", image: casetracking },
];

const AdvocateDashboard = () => {
  const [showAnswers, setShowAnswers] = useState({});
  const [userData, setuserData] = useState({});


  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/advocate/user', { withCredentials: true });
        setuserData(response.data.user); // Assuming the response includes user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div className="advocate-dashboard">
      <div className='advocate-header'>
        <div className="logo-advocate">
          <img src={advocateImage} alt="Advocate" />
          <span><h2>Advocate Dashboard</h2></span>
        </div>
        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <span><h2>{ userData.firstName}</h2></span>
          <img src={advocateImage} alt="Advocate" />
        </div>
      </div>
      <div className="advocate-body">
        <div className="dashboard-boxes">
          {linksData.map((link, index) => (
            <Link key={index} to={link.path} className="dashboard-box">
              {link.image !== null ? <img src={link.image} alt={link.label} /> : null}
              <h3 style={{color:"black"}}>{link.label}</h3>
            </Link>
          ))}
        </div>
      </div>

      <div className="faq-box">
        <h3>Frequently Asked Questions</h3>
        {FAQ_DATA.map((faq, index) => (
          <div className={`faq-item ${showAnswers[`question${index + 1}`] ? 'active' : ''}`} key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(`question${index + 1}`)}>
              <h4>{faq.question}</h4>
              <FaPlus className="icon" />
            </div>
            {showAnswers[`question${index + 1}`] && (
              <p>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvocateDashboard;
