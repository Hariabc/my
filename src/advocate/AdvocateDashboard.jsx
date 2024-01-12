import React, { useState, useEffect } from 'react';
import advocateImage from "../assets/advocate.png";
import axios from "axios";
import { Link } from 'react-router-dom';
import {
  IoHomeSharp,
  IoBriefcaseSharp, 
  IoPersonSharp, 
  IoLogOutSharp, 
  IoChatbubblesSharp, 
  IoSettingsSharp, 
  IoHelpCircleSharp, 
  IoNotificationsOutline } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion } from 'framer-motion';
import Chat from '../Chat/Chat';
import Profile from '../client/Profile';
import MyCases from '../client_dashboard/casedetails';
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
import client from "../assets/client.png";

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
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [userData, setUserData] = useState({});

  const handleChatButtonClick = () => {
    setSelectedComponent(<Chat />);
  };

  const handleProfileClick = () => {
    setSelectedComponent(<Profile />);
  };

  const handleHomeClick = () => {
    setSelectedComponent(<HomeDashboard />);
  };

  const handleFaqClick = () => {
    setSelectedComponent(<RenderFaq />);
  };

  const handleBriefcaseClick = () => {
    setSelectedComponent(<BriefcaseDashboard />);
  };

  const closeComponents = () => {
    setSelectedComponent(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/advocate/user', { withCredentials: true });
        setUserData(response.data.user);
        setSelectedComponent(<BriefcaseDashboard />);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img
          src={advocateImage}
          alt=""
          style={{
            width: '50px',
            height: '50px',
            marginBottom: '100px',
          }}
        />
        <IoHomeSharp
          size={35}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
          onClick={handleHomeClick}
        />
        <IoBriefcaseSharp
          size={35}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
          onClick={handleBriefcaseClick}
        />
        <IoPersonSharp
          size={40}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
          onClick={handleProfileClick}
        />
        <IoLogOutSharp size={35} color="#fff" style={{ paddingTop: '5px' }} />
        <IoChatbubblesSharp
          size={40}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
          onClick={handleChatButtonClick}
        />
        <IoSettingsSharp size={35} color="#fff" style={{ paddingTop: '5px' }} />
        <IoHelpCircleSharp
          size={40}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
          onClick={handleFaqClick}
        />
      </div>

      <div className="main-content">
        <div className="header">
          <div className="user-info">
            <div className="user-name">{userData ? userData.firstName : 'No username available'}</div>
          </div>
          <div className="notification-icon">
            <IoNotificationsOutline size={30} />
            <div className="logout-button" style={{ paddingLeft: "20px" }}>
              <button>Logout</button>
            </div>
          </div>
        </div>
        <div className="dashboard-element-container">
          <div className="selected-component-container">
            {selectedComponent && <div className="selected-component">{selectedComponent}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeDashboard = () => {
  return (
    <div className="home-dashboard">
      <div className="cases">
        <MyCases />
      </div>
      <div className="updates">
        <h3>Updates</h3>
        <p className='temp-p'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae justo non tellus
          laoreet tincidunt. Donec et felis ligula. Integer sed sagittis odio, eu rhoncus libero.
          Sed elementum augue vitae mauris ultricies, eu auctor nisl venenatis. Nullam quis semper
          libero, vel scelerisque justo. Curabitur tristique, ex vitae accumsan interdum, justo
          nisi scelerisque velit, a cursus urna ligula id ligula.
        </p>
      </div>
    </div>
  );
};

const BriefcaseDashboard = () => {
  const linksDataBriefcase = [
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

  return (
    <div className="briefcase-dashboard">
      <motion.div
        className="dashboard-boxes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {linksDataBriefcase.map((link, index) => (
          <Link key={index} to={link.path} className="dashboard-box">
            {link.image && <motion.img src={link.image} alt={link.label} className='dashboard-image' />} {/* Added alt attribute */}
            <h3 style={{ color: 'black' }}>{link.label}</h3>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

const RenderFaq = () => {
  const [showAnswers, setShowAnswers] = useState({});

  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="faq-box">
      <h3>Frequently Asked Questions</h3>
      {FAQ_DATA.map((faq, index) => (
        <div className={`faq-item ${showAnswers[`question${index + 1}`] ? 'active' : ''}`} key={index}>
          <div className="faq-question" onClick={() => toggleAnswer(`question${index + 1}`)}>
            <h4>{faq.question}</h4>
            {showAnswers[`question${index + 1}`] ? <FaMinus className="icon" /> : <FaPlus className="icon" />}
          </div>
          {showAnswers[`question${index + 1}`] && (
            <p>{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdvocateDashboard;
