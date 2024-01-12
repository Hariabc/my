// AdminDashboard.js
import React, { useState,useEffect } from 'react';
import "./coadashboard.css"; // Add your CSS file for styling
import adminIcon from "../assets/admin.png"; // Add your admin icon image
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa"
import axios from "axios"

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
import addlawyers from "../assets/admindashboard/Admin Pics/Adding Govt Lawyers.jpg"
import assignjudge from "../assets/admindashboard/Admin Pics/Assign Judges Advocates.jpg"
import caseanalytics from "../assets/admindashboard/Admin Pics/case analytics.jpg"
import Documentation from "../assets/admindashboard/Admin Pics/documentation.jpg"
import news from "../assets/admindashboard/Admin Pics/latest news.jpg"
import resources from "../assets/admindashboard/Admin Pics/managing resources.jpg"
import recievecases from "../assets/admindashboard/Admin Pics/receice filed Cases.jpg"
import scheduling from "../assets/admindashboard/Admin Pics/scheduling calender.jpg"
import notifications from "../assets/admindashboard/Admin Pics/sending notifications.jpg"
import updatecauselist from "../assets/admindashboard/Admin Pics/updating causelist.jpg"
import videoconfrence from "../assets/admindashboard/Admin Pics/video conference.jpg"


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

  const handleFaqClick = () => {
    setSelectedComponent(<RenderFaq/>);
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
        const response = await axios.get('http://localhost:5000/cao/user', { withCredentials: true });
        setuserData(response.data.user); // Assuming the response includes user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const linksData = [
    { path: "/mycases", label: "Receive Filed Cases", image: recievecases},
    { path: "/assign-judge-lawyer", label: "Assigging judges", image: assignjudge },
    { path: "/documentation", label: "Documentation", image: Documentation },
    { path: "/update-cause-list", label: "Updating Cause List", image: updatecauselist},
    { path: "/scheduling-calendar", label: "Scheduling Calendar", image: scheduling },
    { path: "/case-analytics", label: "Cases Analytics", image: caseanalytics },
    { path: "/addjudge-publicadv", label: "Register Public advocates and Judges", image: addlawyers },
    { path: "/post-updates-news", label: "Posting Updates News", image: news },
    { path: "/send-notifications", label: "Notifications", image: notifications },
    { path: "/case-profile-management", label: "Case Management", image: resources },
    { path: "/pre-trial-conferencing", label: "Pre-trial", image: videoconfrence },
    // ... add more links as needed
  ];
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
      }
export default AdminDashboard;
