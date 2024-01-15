import React, { useState, useEffect } from 'react';
import judgeImage from "../assets/judge.png";
import axios from "axios";
import { Link } from 'react-router-dom';
import { IoHomeSharp, IoBriefcaseSharp, IoPersonSharp, IoLogOutSharp, IoChatbubblesSharp, IoSettingsSharp, IoHelpCircleSharp, IoNotificationsOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import Chat from '../Chat/Chat';
import Profile from '../client/Profile';
import { FaPlus,FaMinus } from 'react-icons/fa';
import confrence from "../assets/DASHBOARDS/video conference.jpg";
import document from "../assets/DASHBOARDS/Documentation.jpg";
import scheduling from "../assets/DASHBOARDS/Scheduling calender.jpg";
import casedetails from "../assets/DASHBOARDS/Case details.jpg";
import causelist from "../assets/DASHBOARDS/Cause List.jpg";
import casetracking from "../assets/DASHBOARDS/Case tracking.jpg";
import caseanalytics from "../assets/DASHBOARDS/case analytics.jpg";
import advocateImage from "../assets/advocate.png";  // Import the appropriate advocate image
import "./judgedashboard.css";


import { FiHome } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsChatDots } from "react-icons/bs";

const JudgeDashboard = () => {
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
    setSelectedComponent(<RenderFaq/>);
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
        const response = await axios.get('http://localhost:5000/client/user', { withCredentials: true });
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
          src={judgeImage}
          alt=""
          style={{
            width: '50px',
            height: '50px',
            marginBottom: '100px',
          }}
        />
        <FiHome
          size={45}
          color="#fff"
          style={{ paddingTop: '15px', cursor: 'pointer' }}
          onClick={handleHomeClick}
        />
        <RiMenu2Fill
          size={45}
          color="#fff"
          style={{ paddingTop: '15px', cursor: 'pointer' }}
          onClick={handleBriefcaseClick}
        />
        <CgProfile
          size={45}
          color="#fff"
          style={{ paddingTop: '15px', cursor: 'pointer' }}
          onClick={handleProfileClick}
        />
        <BsChatDots
          size={45}
          color="#fff"
          style={{ paddingTop: '15px', cursor: 'pointer' }}
          onClick={handleChatButtonClick}
        />
      </div>

      <div className="main-content">
        <div className="header">
          <div className="user-info">
            <div className="user-name">{userData ? userData.firstName : 'No username available'}</div>
          </div>
          <div className="notification-icon">
            <IoNotificationsOutline size={30} />
            <div className="logout-button" style={{paddingLeft:"20px"}}> 
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

export default JudgeDashboard;


const BriefcaseDashboard = () => {
  const linksDataBriefcase = [
  { path: "/schedule-pre-trial", label: "Pre Trial", image: confrence },
  { path: "/documentation", label: "Documentation", image: document },
  { path: "/scheduling-calendar", label: "Calendar Scheduling", image: scheduling },
  { path: "/my-cases", label: "My Cases", image: casedetails },
  { path: "/cause-list", label: "Cause List", image: causelist },
  { path: "/Judge-case-tracking", label: "Case Tracking", image: casetracking },
  { path: "/case-notes", label: "Case Notes", image: caseanalytics },
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
          <Link key={index} to={link.path} className="dashboard-box" style={{borderTop: "3px solid blueviolet"}}>
            {link.image && <motion.img src={link.image} alt={link.label} className='dashboard-image' />} {/* Added alt attribute */}
            <h3 style={{ color: 'black' }}>{link.label}</h3>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

const RenderFaq = () => {
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