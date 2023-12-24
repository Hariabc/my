// AdminDashboard.js
import React, { useState } from 'react';
import "./coadashboard.css"; // Add your CSS file for styling
import adminIcon from "../assets/admin.png"; // Add your admin icon image
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

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

  // Function to toggle answer visibility
  const toggleAnswer = (questionId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const linksData = [
    { path: "/receive-filed-cases", label: "Receive Filed Cases", image: recievecases},
    { path: "/assign-judge-lawyer", label: "Assign Judges and Lawyers", image: assignjudge },
    { path: "/documentation", label: "Documentation", image: Documentation },
    { path: "/update-cause-list", label: "Updating Cause List", image: updatecauselist},
    { path: "/scheduling-calendar", label: "Scheduling Calendar", image: scheduling },
    { path: "/case-analytics", label: "Cases Analytics and Statistics", image: caseanalytics },
    { path: "/add-lawyers-judges", label: "Adding Govt Lawyers, Judges and Accepting Private Lawyers", image: addlawyers },
    { path: "/post-updates-news", label: "Posting Updates and Latest News", image: news },
    { path: "/send-notifications", label: "Sending Notifications to Clients, Judges, Advocates", image: notifications },
    { path: "/case-profile-management", label: "Case and Profiles Management", image: resources },
    { path: "/pre-trial-conferencing", label: "Pre-trial Conferencing", image: videoconfrence },
    // ... add more links as needed
  ];

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className='admin'>
        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <h2>Admin Username</h2>
          <img src={adminIcon} alt="Admin" />
        </div>
      </div>

      {/* Admin Body */}
      <div className="admin-body">
        <div className="admin-dashboard-boxes">
          {linksData.map((link, index) => (
            <Link key={index} to={link.path} className="dashboard-box">
              {link.image && <img src={link.image} alt={link.label} />}
              <h3>{link.label}</h3>
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
