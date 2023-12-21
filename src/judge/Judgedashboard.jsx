// COAdashboard.js
import React, { useState, useEffect, useRef } from 'react';
import "../coa/COAdashboard.css";
import admin from "../assets/judge.png";
import profile from "../assets/icon-profile-1.jpg";
import { Link } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";


import { IoIosArrowDropdownCircle } from "react-icons/io";
const COAdashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);


  return (
    <>
      <div className='admin'>
        <div className="logo-admin">
          <img src={admin} alt="ggg" />
          <h2>Judge</h2>
        </div>
        <div className="admin-head">
          <h1>Welcome to Judge dashboard</h1>
        </div>
        <div className="logo-profile">
          <div className="profile-dropdown" onClick={toggleDropdown} ref={dropdownRef}>
          <IoIosArrowDropdownCircle />
            <h3>Username</h3>
            <img src={profile} alt="ggg" className='profileicon'/>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <Link to="/about">Profile</Link>
                <a href="#">Settings</a>
                <a href="#">Logout</a>
              </div>
            )}
          </div>
          <IoIosNotifications size={22}/>
        </div>
      </div>
      <div className="sidebar">
        <div className="section">
          <h2>Section Title</h2>
          <ul>
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
            <li><a href="#">Link 4</a></li>
            <li><a href="#">Link 5</a></li>
            <li><a href="#">Link 6</a></li>
            <li><a href="#">Link 7</a></li>
            <li><a href="#">Link 8</a></li>
            <li><a href="#">Link 9</a></li>
            <li><a href="#">Link 10</a></li>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
            <li><a href="#">Link 4</a></li>
            <li><a href="#">Link 5</a></li>
            <li><a href="#">Link 6</a></li>
            <li><a href="#">Link 7</a></li>
            <li><a href="#">Link 8</a></li>
            <li><a href="#">Link 9</a></li>
            <li><a href="#">Link 10</a></li>
          </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default COAdashboard;

