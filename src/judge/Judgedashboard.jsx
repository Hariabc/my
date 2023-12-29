// JudgeDashboard.js
import React, { useState } from 'react';
import judgeImage from "../assets/judge.png";
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
import "./judgedashboard.css";

const FAQ_DATA = [
  {
    question: "How do I schedule a pre-trial conference?",
    answer: "To schedule a pre-trial conference, go to the 'Schedule Pre Trial' section and follow the instructions provided."
  },
  {
    question: "What information is available in the 'Documentation' section?",
    answer: "The 'Documentation' section contains important documents related to cases, and you can manage them from this section."
  },
  {
    question: "How can I track the progress of cases?",
    answer: "You can track the progress of cases by visiting the 'Case Tracking' section and accessing the relevant information."
  },
  // Add more FAQ items as needed
];

const linksData = [
  { path: "/schedule-pre-trial", label: "Pre Trial", image: confrence },
  { path: "/documentation", label: "Documentation", image: document },
  { path: "/calendar-scheduling", label: "Calendar Scheduling", image: scheduling },
  { path: "/my-cases", label: "My Cases", image: casedetails },
  { path: "/cause-list", label: "Cause List", image: causelist },
  { path: "/case-tracking", label: "Case Tracking", image: casetracking },
  { path: "/case-notes", label: "Case Notes", image: caseanalytics },
];

const JudgeDashboard = () => {
  const [showAnswers, setShowAnswers] = useState({});

  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="judge-dashboard">
      <div className='judge-header'>
        <div className="logo-judge">
          <img src={judgeImage} alt="Judge" />
          <span><h2>Judge Dashboard</h2></span>
        </div>
        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <span><h2>Judge Name</h2></span>
          <img src={judgeImage} alt="Judge" />
        </div>
      </div>
      <div className="judge-body">
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

export default JudgeDashboard;
