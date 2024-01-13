// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import './coadashboard.css'; // Add your CSS file for styling
import adminIcon from '../assets/admin.png'; // Add your admin icon image
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

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
import addlawyers from '../assets/admindashboard/Admin Pics/Adding Govt Lawyers.jpg';
import assignjudge from '../assets/admindashboard/Admin Pics/Assign Judges Advocates.jpg';
import caseanalytics from '../assets/admindashboard/Admin Pics/case analytics.jpg';
import Documentation from '../assets/admindashboard/Admin Pics/documentation.jpg';
import news from '../assets/admindashboard/Admin Pics/latest news.jpg';
import resources from '../assets/admindashboard/Admin Pics/managing resources.jpg';
import recievecases from '../assets/admindashboard/Admin Pics/receice filed Cases.jpg';
import scheduling from '../assets/admindashboard/Admin Pics/scheduling calender.jpg';
import notifications from '../assets/admindashboard/Admin Pics/sending notifications.jpg';
import updatecauselist from '../assets/admindashboard/Admin Pics/updating causelist.jpg';
import videoconfrence from '../assets/admindashboard/Admin Pics/video conference.jpg';

import {motion} from "framer-motion"
// Replace with the correct path
import Chat from '../Chat/Chat'; // Replace with the correct path
import Profile from '../client/Profile'; // Replace with the correct path
import MyCases from '../Admin_dashboard_components/Mycases';


import { FiHome } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsChatDots } from "react-icons/bs";
import { MdHelpOutline } from "react-icons/md";


const AdminDashboard = () => {
  const [showAnswers, setShowAnswers] = useState({});
  const [userData, setuserData] = useState({});

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

  const handleBriefcaseClick = () => {
    setSelectedComponent(<BriefcaseDashboard />);
  };

  const closeComponents = () => {
    setSelectedComponent(null);
  };

  // Function to toggle answer visibility
  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/user', {
          withCredentials: true,
        });
        setuserData(response.data.user); // Assuming the response includes user data
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
          src={adminIcon}
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

export default AdminDashboard;

const BriefcaseDashboard = () => {
  
  const linksDataBriefcase = [
    { path: '/cao/mycases', label: 'Receive Filed Cases', image: recievecases },
    { path: '/assign-judge-lawyer', label: 'Assigging judges', image: assignjudge },
    { path: '/documentation', label: 'Documentation', image: Documentation },
    { path: '/update-cause-list', label: 'Updating Cause List', image: updatecauselist },
    { path: '/scheduling-calendar', label: 'Scheduling Calendar', image: scheduling },
    { path: '/case-analytics', label: 'Cases Analytics', image: caseanalytics },
    { path: '/cao/addjudge-publicadv', label: 'Register Public advocates and Judges', image: addlawyers },
    { path: '/news', label: 'Posting Updates News', image: news },
    { path: '/send-notifications', label: 'Notifications', image: notifications },
    { path: '/case-profile-management', label: 'Case Management', image: resources },
    { path: '/pre-trial-conferencing', label: 'Pre-trial', image: videoconfrence },
    // ... add more links as needed
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
            <Link key={index} to={link.path} className="dashboard-box" style={{borderTop: "3px solid blueviolet"}}>
              {link.image && <motion.img src={link.image} alt={link.label} className="dashboard-image" />}{' '}
              {/* Added alt attribute */}
              <h3 style={{ color: 'black' }}>{link.label}</h3>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const HomeDashboard = () => {
  return (
    <div className="home-dashboard" style={{maxHeight:"110vh"}}>
      <div className="cases">
        <MyCases/>
      </div>
      <div className="news">
        <News/>
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
