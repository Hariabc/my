import React, { useState, useEffect } from 'react';
import judgeImage from "../assets/judge.png";
import axios from "axios";
import { Link } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { FaPlus,FaMinus } from 'react-icons/fa';
import confrence from "../assets/DASHBOARDS/video conference.jpg";
import document from "../assets/DASHBOARDS/Documentation.jpg";
import scheduling from "../assets/DASHBOARDS/Scheduling calender.jpg";
import casedetails from "../assets/DASHBOARDS/Case details.jpg";
import causelist from "../assets/DASHBOARDS/Cause List.jpg";
import casetracking from "../assets/DASHBOARDS/Case tracking.jpg";
import caseanalytics from "../assets/DASHBOARDS/case analytics.jpg";
import "./judgedashboard.css";
import { useNavigate } from 'react-router-dom';
import MyCases from '../client_dashboard/casedetails';


import { FiHome } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsChatDots } from "react-icons/bs";

import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import "../Chat/Chat.css"

const JudgeDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(<BriefcaseDashboard/>);
  const [userData, setUserData] = useState({});
  const [activeIcon, setActiveIcon] = useState('briefcase'); // Add state for active icon
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
    setSelectedComponent(<Chat />);
    setActiveIcon('chat');
  };

  const handleProfileClick = () => {
    setSelectedComponent(<Profile />);
    setActiveIcon('profile');
  };

  const handleHomeClick = () => {
    setSelectedComponent(<HomeDashboard />);
    setActiveIcon('home');
  };

  const handleFaqClick = () => {
    setSelectedComponent(<RenderFaq />);
    setActiveIcon('faq');
  };

  const handleBriefcaseClick = () => {
    setSelectedComponent(<BriefcaseDashboard />);
    setActiveIcon('briefcase');
  };
  const closeComponents = () => {
    setSelectedComponent(null);
  };

  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint
      await axios.post('http://localhost:5000/client/logout', null, {
        withCredentials: true,
      });
      navigate("/login")
      
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/user', { withCredentials: true });
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
          className={activeIcon === 'home' ? 'active' : ''}
          onClick={handleHomeClick}
        />
        <RiMenu2Fill
          size={45}
          color="#fff"
          style={{ paddingTop: '15px', cursor: 'pointer' }}
          className={activeIcon === 'briefcase' ? 'active' : ''}
          onClick={handleBriefcaseClick}
          />
        <CgProfile
          size={45}
          color="#fff"
          style={{ paddingTop: '15px', cursor: 'pointer' }}
          className={activeIcon === 'profile' ? 'active' : ''}
          onClick={handleProfileClick}
          />
        <BsChatDots
          size={45}
          color="#fff"
          style={{ paddingTop: '15px', cursor: 'pointer' }}
          className={activeIcon === 'chat' ? 'active' : ''}
          onClick={handleChatButtonClick}        />
      </div>

      <div className="main-content">
        <div className="header">
          <div className="user-info">
            <div className="user-name" style={{color:'white',marginLeft:"20px"}}>{userData ? userData.username : 'No username available'}</div>
          </div>
          <div className="notification-icon">
            <IoNotificationsOutline size={30} style={{color:'white'}} />
            <div className="logout-button" style={{paddingLeft:"20px"}}> 
            <button onClick={handleLogout}>Logout</button>
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
  { path: "/scheduling-event", label: "Calendar Scheduling", image: scheduling },
  { path: "/my-cases", label: "My Cases", image: casedetails },
  { path: "/cause-list", label: "Cause List", image: causelist },
  { path: "/case-tracking", label: "Case Tracking", image: casetracking },
    { path: "/order-judgements", label: "ORDERS & JUDGEMENTS", image: caseanalytics },
    { path: "/case-closure", label: "Case Closure", image: caseanalytics },
  
];

  return (
    <div className="briefcase-dashboard" style={{height:"100vh"}}>
      <motion.div
        className="dashboard-boxes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {linksDataBriefcase.map((link, index) => (
          <Link key={index} to={`/judge${link.path}`} className="dashboard-box" style={{borderTop: "3px solid blueviolet"}}>
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

const HomeDashboard = () => {
  return (
    <div className="home-dashboard" style={{height:"85vh"}}>
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

const Profile=()=> {
  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    name:" ",
    gender:' ',
    education:' ',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/user', { withCredentials: true });
        setProfileData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="profile-height" style={{height:"80vh"}}>
      <div className="profile-container">
        <div className="profile-header">
          <img src={judgeImage} alt="User Avatar" className="avatar" />
          <h2>{profileData.username}</h2>
        </div>
        <div className="profile-details">
          <p>First Name: {profileData.firstname}</p>
          <p>Last Name: {profileData.lastname}</p>
          <p>Email: {profileData.email}</p>
          <p>Username: {profileData.name}</p>
          <p>Gender: {profileData.gender}</p>
          <p>Education Qualifications: {profileData.education}</p>
        </div>
      </div>
    </div>
  );
};

const Chat=()=> {    
  const APP_ID = "049FF9C5-DFDC-4991-B147-D2FDFDC72C54";

  const [userData, setUserData] = useState({});

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/judge/user', { withCredentials: true });
          setUserData(response.data.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
    
return (
  <div className="App" style={{
      height:"100vh"
  }}>
      <SendbirdApp appId={APP_ID} userId={userData.username} />
  </div>
);
}