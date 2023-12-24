// JudgeDashboard.js
import React, { useState } from 'react';
import judgeImage from "../assets/judge.png";
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const FAQ_DATA = [
  // ... (similar to COA dashboard FAQs)
];

const linksData = [
  { path: "/schedule-pre-trial", label: "Schedule Pre Trial", image: null },
  { path: "/documentation", label: "Documentation", image: null },
  { path: "/calendar-scheduling", label: "Calendar Scheduling", image: null },
  { path: "/my-cases", label: "My Cases", image: null },
  { path: "/cause-list", label: "Cause List", image: null },
  { path: "/case-tracking", label: "Case Tracking", image: null },
  { path: "/case-notes", label: "Case Notes", image: null },
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
      {/* <div className='judge-header'>
        <div className="logo-judge">
          <img src={judgeImage} alt="Judge" />
          <h2>Judge Dashboard</h2>
        </div>
        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <h2>Judge Name</h2>
          <img src={judgeImage} alt="Judge" />
        </div>
      </div> */}
    <div className="judge-body">
        <div className="dashboard-boxes">
          {linksData.map((link, index) => (
            <Link key={index} to={link.path} className="dashboard-box">
              {link.image !== null ? <img src={link.image} alt={link.label} /> : null}
              <h3>{link.label}</h3>
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
