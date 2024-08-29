// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Admin from "../assets/Admin.png";

export default function Profile() {
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

  // Function to format the date with hyphens
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="profile-height">
      <div className="profile-container">
      <div className="profile-header">
        <img src={Admin} alt="User Avatar" className="avatar" />
        <h2>{profileData.username}</h2>
      </div>
      <div className="profile-details">
        <p>First Name: {profileData.firstName}</p>
        <p>Last Name: {profileData.lastName}</p>
        <p>Email: {profileData.email}</p>
        {/* <p>Date of Birth: {formatDate(profileData.dob)}</p> */}
        <p>Gender: {profileData.gender}</p>
        <p>Phone: {profileData.phone}</p>
        {/* <p>Adhar Number: {profileData.adhar}</p> */}
        {/* <p>Address: {profileData.address}</p> */}
      </div>
    </div>
    </div>
  );
}
