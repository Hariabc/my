// COAdashboard.js
import React from 'react';
import "./clientdashboard.css";
import client from "../assets/client.png";
import { Link } from 'react-router-dom';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import casefile from "../assets/file.jpg";

const linksData = [
  { path: "/my-profile", label: "Profile", image: client },
  { path: "/file-a-case", label: "File a Case", image: casefile },
  { path: "/pre-trial", label: "Pre Trial", image: null },
  { path: "/contact-judge", label: "Contact Judge", image: null },
  { path: "/contact-advocate", label: "Contact Advocate", image: null },
  { path: "/contact-coa", label: "Contact COA", image: null },
  { path: "/share-files", label: "Share Files", image: null },
  { path: "/payment-boxes", label: "Payment Boxes", image: null },
];

const COAdashboard = () => {
  return (
    <div className="client-dashboad">
      <div className='admin'>
        <div className="logo-admin">
          <img src={client} alt="ggg" />
          <h2>Client</h2>
        </div>
        <div className="admin-head">
          <h1>Welcome to Client dashboard</h1>
        </div>
        <div className="logo-profile">
          <IoIosArrowDropdownCircle />
          <h2>Username</h2>
          <img src={client} alt="ggg" />
        </div>
      </div>
      <div className="client-body">
        <div className="dashboard-boxes">
          {linksData.map((link, index) => (
            <Link key={index} to={link.path} className="dashboard-box">
              {link.image && <img src={link.image} style={{ maxWidth: '100%', height: 'auto' }} />}
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default COAdashboard;
