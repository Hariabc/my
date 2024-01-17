// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './Profile.css';
import Judge from "../assets/Judge.png";

export default function Profile() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/user', { withCredentials: true });
      setProfileData(response.data.user); 
        console.log(response)// Corrected the state variable name
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={Judge} alt="User Avatar" className="avatar" />
        <h2>{profileData.username}</h2>
      </div>
      <div className="profile-details">
        <p>First Name: {profileData.firstname}</p>
        <p>Last Name: {profileData.lastname}</p>
        <p>Username: {profileData.username}</p>

        <p>Email: {profileData.email}</p>
        {/* <p>Date of Birth: {profileData.dob}</p> */}
        <p>Gender: {profileData.gender}</p>
        <p>Education: {profileData.education}</p>

        {/* <p>Phone: {profileData.phone}</p> */}
        {/* <p>Adhar Number: {profileData.adhar}</p> */}
        {/* <p>Address: {profileData.address}</p> */}
      </div>
    </div>
  );
}
