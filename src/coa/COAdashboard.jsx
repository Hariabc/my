// AdminDashboard.js
import React, { useState,useEffect } from 'react';
import "./coadashboard.css"; // Add your CSS file for styling
import adminIcon from "../assets/admin.png"; // Add your admin icon image
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa"
import axios from "axios"

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
    { path: "/receive-filed-cases", label: "Receive Filed Cases", image: recievecases},
    { path: "/assign-judge-lawyer", label: "Assigging judges", image: assignjudge },
    { path: "/documentation", label: "Documentation", image: Documentation },
    { path: "/update-cause-list", label: "Updating Cause List", image: updatecauselist},
    { path: "/scheduling-calendar", label: "Scheduling Calendar", image: scheduling },
    { path: "/case-analytics", label: "Cases Analytics", image: caseanalytics },
    { path: "/add-advocates-judges", label: "Register Public advocates and Judges", image: addlawyers },
    { path: "/post-updates-news", label: "Posting Updates News", image: news },
    { path: "/send-notifications", label: "Notifications", image: notifications },
    { path: "/case-profile-management", label: "Case Management", image: resources },
    { path: "/pre-trial-conferencing", label: "Pre-trial", image: videoconfrence },
    // ... add more links as needed
  ];

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className='admin'>
      <div className="logo-admin">
          <img src={adminIcon} alt="ggg" />
          <span><h2>Admin Dashboard</h2></span>
      </div>

        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <span><h2>{userData.firstName }</h2></span>
          <img src={adminIcon} alt="Admin" />
        </div>
      </div>

      {/* Admin Body */}
      <div className="admin-body">
        <div className="admin-dashboard-boxes">
          {linksData.map((link, index) => (
            <Link key={index} to={`/admin${link.path}`} className="dashboard-box">
              {link.image && <img src={link.image} alt={link.label} />}
              <h3 style={{color:"black"}}>{link.label}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Admin FAQ Section */}
      <div className="faq-box">
        {/* Add FAQs related to admin features if needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;
