// COAdashboard.js
import React from 'react';
import "./clientdashboard.css";
import client from "../assets/client.png";
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
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
import {FaPlus} from "react-icons/fa"
import { IoNotifications } from "react-icons/io5";



import { useState } from "react";

const FAQ_DATA = [
  {
    question: 'Q: How do I track the progress of my case?',
    answer: 'A: You can track the progress of your case in the "Case Tracking" section. It provides real-time updates on the status and any recent activities related to your case.',
  },
  {
    question: 'Q: Can I update the documents after filing a case?',
    answer: 'A: Yes, you can update the documents for your case in the "File a Case" section. Follow the instructions to edit and upload any additional documents as needed.',
  },
  {
    question: 'Q: What payment options are available for court fees?',
    answer: 'A: The "Payment Boxes" section offers various payment options for court fees. You can choose the preferred payment method and view the transaction history.',
  },
  {
    question: 'Q: How can I schedule a meeting with my advocate?',
    answer: 'A: To schedule a meeting with your advocate, use the "Scheduling Calendar" section. Select a convenient time slot and request a meeting with your advocate.',
  },
  {
    question: 'Q: How can I access legal guides and IPC sections?',
    answer: 'A: Legal guides and IPC sections are available in the "Resources" section. You can access educational material, FAQs, and legal guides to enhance your understanding of legal matters.',
  },
  {
    question: 'Q: What information is available in the Case Analytics section?',
    answer: 'A: The "Case Analytics" section provides statistical insights into your cases, including timelines, key events, and trends. It helps you analyze and understand case patterns.',
  },
  {
    question: 'Q: How can I contact the Court of Appeals (COA)?',
    answer: 'A: You can contact the Court of Appeals (COA) in the "Contact COA" section. Find relevant contact information and use the communication channels provided.',
  },
  {
    question: 'Q: Can I share confidential files securely?',
    answer: 'A: Yes, you can securely share confidential files in the "Share Files" section. The platform ensures the confidentiality and privacy of shared documents.',
  },
  {
    question: 'Q: How do I get notifications about my case updates?',
    answer: 'A: The "Notifications" section keeps you informed about case updates, upcoming events, and important notifications. Ensure that your notification preferences are set accordingly.',
  },
  {
    question: 'Q: Is there a chat app for communication with the legal team?',
    answer: 'A: Yes, you can use the integrated chat app in the "Chat App" section to communicate with your legal team, ask questions, and receive timely responses.',

  }]



const linksData = [
  { path: "/file-a-case", label: "File a Case", image: casefile },
  { path: "/pre-trial", label: "Pre Trial", image: confrence },
  { path: "/sendingfiles", label: "Share Files", image: document },
  { path: "/payment", label: "Payment Boxes", image: payment },
  { path: "/advocatelist", label: "Private Advocate List", image: advocatelist },
  { path: "/cause-list", label: "Cause List", image: causelist },
  { path: "/case-details", label: "Case Details", image: casedetails},
  { path: "/scheduling-calendar", label: "Scheduling Calendar", image: scheduling},
  { path: "/case-analytics", label: "Case Analytics", image: caseanalytics },
  { path: "/case-tracking", label: "Case Tracking", image: casetracking,}

];

const COAdashboard = () => {
  const [showAnswers, setShowAnswers] = useState({});

  // Function to toggle answer visibility
  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="client-dashboard">
      <div className='admin'>
        <div className="logo-admin">
          <img src={client} alt="ggg" />
          <span><h2>Client Dashboard</h2></span>
        </div>
        {/* <div className="admin-head">
          <h1></h1>
        </div> */}
        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <span><h2>Username</h2></span>
          <img src={client} alt="ggg" />
          <IoNotifications size={32} style={{paddingLeft:'10px'}}/>
        </div>
      </div>
      {/* <div className="">
            <div className="news-box">
            <marquee>Your news text goes here </marquee>
            <marquee>Your news text goes here </marquee>
            <marquee>Your news text goes here </marquee>
            <marquee>Your news text goes here </marquee>
            <marquee>Your news text goes here </marquee>
            <marquee>Your news text goes here </marquee>

            </div>
          </div> */}
      <div className="client-body">
        <div className="dashboard-boxes">
          {linksData.map((link, index) => (
            <Link key={index} to={link.path} className="dashboard-box">
              {link.image && <img src={link.image} />}
              <h3>{link.label}</h3>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="dashboard-box faq-box">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-item">
              <h4 onClick={() => toggleAnswer('question1')}>
                Q: How can I file a case in court? <IoIosArrowDropdownCircle/>
              </h4>
              {showAnswers['question1'] && (
                <p>A: To file a case, you can go to the "File a Case" section and follow the instructions to fill out the required form, choose an advocate, and upload necessary documents.</p>
              )}
            </div>
            <div className="faq-item">
              <h4 onClick={() => toggleAnswer('question2')}>
                Q: How do I check the status of my case? <IoIosArrowDropdownCircle/>
              </h4>
              {showAnswers['question2'] && (
                <p>A: You can view the status of your case in the "My Cases" section. It provides updates on the current status and any recent actions taken.</p>
              )}
            </div>
          </div> */}
      <div className="faq-box">
        <h3>Frequently Asked Questions</h3>
        {FAQ_DATA.map((faq, index) => (
          <div className={`faq-item ${showAnswers[`question${index + 3}`] ? 'active' : ''}`} key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(`question${index + 3}`)}>
              <h4>{faq.question}</h4>
              <FaPlus className="icon" />
            </div>
            {showAnswers[`question${index + 3}`] && (
              <p>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      
    

    </div>
  );
};

export default COAdashboard;
