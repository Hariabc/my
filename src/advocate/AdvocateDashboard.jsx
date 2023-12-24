// AdvocateDashboard.js
import React, { useState } from 'react';
import advocateImage from "../assets/advocate.png";
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const FAQ_DATA = [
  // ... (similar to COA dashboard FAQs)
];

const linksData = [
  { path: "/file-a-case", label: "File a Case", image: null },
  { path: "/documentation", label: "Documentation", image: null },
  { path: "/payments", label: "Payments", image: null },
  { path: "/my-cases", label: "My Cases", image: null },
  { path: "/cause-list", label: "Cause List", image: null },
  { path: "/scheduling-calendar", label: "Scheduling Calendar", image: null },
  { path: "/pre-trial-conferencing", label: "Pre Trial Conferencing", image: null },
  { path: "/case-analytics", label: "Case Analytics", image: null },
  { path: "/latest-updates", label: "Latest Updates", image: null },
  { path: "/case-tracking", label: "Case Tracking", image: null },
];

const AdvocateDashboard = () => {
  const [showAnswers, setShowAnswers] = useState({});

  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="advocate-dashboard">
      {/* <div className='advocate-header'>
        <div className="logo-advocate">
          <img src={advocateImage} alt="Advocate" />
          <h2>Advocate Dashboard</h2>
        </div>
        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <h2>Advocate Name</h2>
          <img src={advocateImage} alt="Advocate" />
        </div>
      </div> */}
      <div className="advocate-body">
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

export default AdvocateDashboard;
