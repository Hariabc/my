import React, { useState } from 'react';
import './temp.css';
import {
  IoHomeSharp,
  IoBriefcaseSharp,
  IoPersonSharp,
  IoLogOutSharp,
  IoChatbubblesSharp,
  IoSettingsSharp,
  IoHelpCircleSharp,
} from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import client from './assets/client.png';
import Chat from './Chat/Chat';
import Profile from './client/Profile';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom


import casefile from "./assets/DASHBOARDS/File a case.jpg";
import confrence from "./assets/DASHBOARDS/video conference.jpg";
import payment from "./assets/DASHBOARDS/payments.jpg";
import document from "./assets/DASHBOARDS/Documentation.jpg";
import casedetails from "./assets/DASHBOARDS/Case details.jpg";
import casetracking from "./assets/DASHBOARDS/Case tracking.jpg";
import causelist from "./assets/DASHBOARDS/Cause List.jpg";
import scheduling from "./assets/DASHBOARDS/Scheduling calender.jpg";
import caseanalytics from "./assets/DASHBOARDS/case analytics.jpg";
import advocatelist from "./assets/DASHBOARDS/Advocate list.jpg";
import MyCases from './client_dashboard/casedetails';


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
  },
];

const Apps = () => {
  const [notifications, setNotifications] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);

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

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img
          src={client}
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
            <div className="user-name">John Doe</div>
          </div>
          <div className="notification-icon" onClick={() => setNotifications(notifications + 1)}>
            {notifications > 0 && <span className="notification-badge">{notifications}</span>}
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

export default Apps;

const HomeDashboard = () => {
  return (
    <div className="home-dashboard">
      <div className="cases">
        <MyCases/>
      </div>
      <div className="updates">
        <h3>Updates</h3>
        <p className='temp-p'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae justo non tellus
          laoreet tincidunt. Donec et felis ligula. Integer sed sagittis odio, eu rhoncus libero.
          Sed elementum augue vitae mauris ultricies, eu auctor nisl venenatis. Nullam quis semper
          libero, vel scelerisque justo. Curabitur tristique, ex vitae accumsan interdum, justo
          nisi scelerisque velit, a cursus urna ligula id purus. In tincidunt erat nec dolor
          accumsan, eu sagittis ligula tempus.
        </p>
      </div>
      {/* Add more components as needed */}
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
    <motion.div
      className="faq-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3>Frequently Asked Questions</h3>
      {FAQ_DATA.map((faq, index) => (
        <div
          className={`faq-item ${showAnswers[`question${index + 3}`] ? 'active' : ''}`}
          key={index}
        >
          <div className="faq-question" onClick={() => toggleAnswer(`question${index + 3}`)}>
            <h4>{faq.question}</h4>
            {showAnswers[`question${index + 3}`] ? (
              <FaMinus
                className="icon"
                onClick={() => toggleAnswer(`question${index + 3}`)}
                style={{ color: 'black' }}
              />
            ) : (
              <FaPlus
                className="icon"
                onClick={() => toggleAnswer(`question${index + 3}`)}
                style={{ color: 'black' }}
              />
            )}
          </div>
          {showAnswers[`question${index + 3}`] && <p>{faq.answer}</p>}
        </div>
      ))}
    </motion.div>
  );
};



const BriefcaseDashboard = () => {
  const linksDataBriefcase = [
    { path: "/file-a-case", label: "File a Case", image: casefile },
    { path: "/pre-trial", label: "Pre Trial", image: confrence },
    { path: "/sendingfiles", label: "File Sharing", image: document },
    { path: "/payment", label: "Payments", image: payment },
    { path: "/advocatelist", label: "Private Advocate List", image: advocatelist },
    { path: "/cause-list", label: "Cause List", image: causelist },
    { path: "/case-details", label: "Case Details", image: casedetails },
    { path: "/scheduling-calendar", label: "Scheduling Calendar", image: scheduling },
    { path: "/case-analytics", label: "Case Analytics", image: caseanalytics },
    { path: "/case-tracking", label: "Case Tracking", image: casetracking },
  ];

  return (
    <div className="briefcase-dashboard">
      <div className="z">
      <motion.div
        className="dashboard-boxes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {linksDataBriefcase.map((link, index) => (
          <Link key={index} to={link.path} className="dashboard-box">
            {link.image && <motion.img src={link.image} alt={link.label} className='dashboard-image'/>} {/* Added alt attribute */}
            <h3 style={{ color: 'black' }}>{link.label}</h3>
          </Link>
        ))}
      </motion.div>
      </div>
    </div>
  );
};


