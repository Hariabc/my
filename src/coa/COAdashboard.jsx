// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import './coadashboard.css'; // Add your CSS file for styling
import adminIcon from '../assets/admin.png'; // Add your admin icon image
import { Link } from 'react-router-dom';
import axios from 'axios';

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
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import {motion} from "framer-motion"
import MyCases from '../Admin_dashboard_components/Mycases';
import { useNavigate } from 'react-router-dom';

import { FiHome } from "react-icons/fi";
import { RiMenu2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsChatDots } from "react-icons/bs";


const AdminDashboard = () => {
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
      await axios.post('http://localhost:5000/cao/logout', null, {
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
        const response = await axios.get('http://localhost:5000/cao/user', { withCredentials: true });
        setUserData(response.data.user);
        setSelectedComponent(<BriefcaseDashboard />);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container" style={{minHeight:"100vh"}}>
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
            <div className="user-name" style={{color:'white',marginLeft:"20px"}}>{userData ? userData.firstName : 'No username available'}</div>
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

export default AdminDashboard;

const BriefcaseDashboard = () => {
  
  const linksDataBriefcase = [
    { path: '/mycases', label: 'Receive Filed Cases', image: recievecases },
    { path: '/judge-assign', label: 'Assigging judges', image: assignjudge },
    { path: '/publicadvocate-assign', label: 'Assigning Public Advocates', image: Documentation },
    // { path: '/update-cause-list', label: 'Updating Cause List', image: updatecauselist },
    { path: '/scheduling-event', label: 'Scheduling Calendar', image: scheduling },
    // { path: '/case-analytics', label: 'Cases Analytics', image: caseanalytics },
    { path: '/addjudge-publicadv', label: 'Register Public advocates and Judges', image: addlawyers },
    { path: '/news', label: 'Posting Updates News', image: news },
    // { path: '/send-notifications', label: 'Notifications', image: notifications },
    { path: '/court-cases', label: 'Court Cases', image: resources },
    { path: '/pre-trial-conferencing', label: 'Pre-trial', image: videoconfrence },
    // ... add more links as needed
  ];

  return (
    <div className="briefcase-dashboard" style={{height:"100vh"}}>
      <div className="z">
        <motion.div
          className="dashboard-boxes"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {linksDataBriefcase.map((link, index) => (
            <Link key={index} to={`/cao${link.path}`} className="dashboard-box" style={{borderTop: "3px solid blueviolet"}}>
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
    <div className="home-dashboard" style={{minHeight:"110vh"}}>
      <div className="cases">
        <MyCases/>
      </div>
    </div>
  );
};

const Profile=()=> {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
    username: '',
    adhar: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/user', { withCredentials: true });
        setProfileData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-height">
      <div className="profile-container">
      <div className="profile-header">
        <img src={adminIcon} alt="User Avatar" className="avatar" />
        <h2>{profileData.username}</h2>
      </div>
      <div className="profile-details">
        <p>First Name: {profileData.firstName}</p>
        <p>Last Name: {profileData.lastName}</p>
        <p>Email: {profileData.email}</p>
        <p>Gender: {profileData.gender}</p>
        <p>Phone: {profileData.phone}</p>
      </div>
    </div>
    </div>
  );
}

const Chat=()=> {    
  const APP_ID = "049FF9C5-DFDC-4991-B147-D2FDFDC72C54";

  const [userData, setUserData] = useState({});

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/cao/user', { withCredentials: true });
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