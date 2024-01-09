// COAdashboard.js
import React from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal'
import "./clientdashboard.css";
import client from "../assets/client.png";
import { Link ,useNavigate} from 'react-router-dom';
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
import {FaMinus, FaPlus} from "react-icons/fa"
import { IoNotifications } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from 'axios';
import { IoMdChatbubbles } from 'react-icons/io';
import Chat from '../Chat/Chat';
import { MdOutlineClose } from "react-icons/md";
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
  { path: "/sendingfiles", label: "File Sharing", image: document },
  { path: "/payment", label: "Payments", image: payment },
  { path: "/advocatelist", label: "Private Advocate List", image: advocatelist },
  { path: "/cause-list", label: "Cause List", image: causelist },
  { path: "/case-details", label: "Case Details", image: casedetails},
  { path: "/scheduling-calendar", label: "Scheduling Calendar", image: scheduling},
  { path: "/case-analytics", label: "Case Analytics", image: caseanalytics },
  { path: "/case-tracking", label: "Case Tracking", image: casetracking,}

];


const COAdashboard = () => {
  const [showAnswers, setShowAnswers] = useState({});
  const [userData, setUserData] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChatButtonClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowChat(false);
  };

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/user', { withCredentials: true });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleMouseEnter = () => {
    setShowChatButton(true);
  };

  const handleMouseLeave = () => {
    setShowChatButton(false);
  };

  return (
    <motion.div
      className="client-dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='admin'>
        <div className="logo-admin">
          <img src={client} alt="ggg" />
          <span><h2>Client Dashboard</h2></span>
        </div>
        <div className="logo-profile">
          <span style={{color:"black"}}><h2 onClick={handleProfileClick}>{userData ? userData.firstName : 'No username available'}</h2></span>
          <img src={client} alt="ggg" onClick={handleProfileClick} />
          <IoNotifications size={32} style={{ paddingLeft: '10px' }} />
          <button className="logout">Logout</button>
        </div>
      </div>

      <motion.div
        className="client-body"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="dashboard-boxes"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {linksData.map((link, index) => (
            <Link key={index} to={link.path} className="dashboard-box">
              {link.image && <motion.img src={link.image} />}
              <h3 style={{ color: "black" }}>{link.label}</h3>
            </Link>
          ))}
        </motion.div>
      </motion.div>

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
                <FaMinus className="icon" onClick={() => toggleAnswer(`question${index + 3}`)} style={{color:"black"}} />
              ) : (
                <FaPlus className="icon" onClick={() => toggleAnswer(`question${index + 3}`)} style={{color:"black"}} />
              )}
            </div>
            {showAnswers[`question${index + 3}`] && (
              <p>{faq.answer}</p>
            )}
          </div>
        ))}
      </motion.div>
      <div>
      <div className={`chat-button ${showChat ? 'show' : ''}`}>
        <button className='chat-btn' onClick={handleChatButtonClick}>
          <IoMdChatbubbles className="chat-icon" size={20} />
          Chat
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Chat Modal"
      >
        <div className="chat-component">
          <MdOutlineClose onClick={closeModal} size={30} style={{marginLeft:'97%'}}>Close Chat</MdOutlineClose>
          <Chat />
        </div>
      </Modal>
    </div>
      
    </motion.div>
  );
};

export default COAdashboard;


