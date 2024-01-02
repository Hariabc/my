// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './Profile.css';
import client from "../assets/client.png";

export default function Profile() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/client/user', { withCredentials: true });
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
        <img src={client} alt="User Avatar" className="avatar" />
        <h2>{profileData.username}</h2>
      </div>
      <div className="profile-details">
        <p>First Name: {profileData.firstName}</p>
        <p>Last Name: {profileData.lastName}</p>
        <p>Email: {profileData.email}</p>
        <p>Date of Birth: {profileData.dob}</p>
        <p>Gender: {profileData.gender}</p>
        <p>Phone: {profileData.phone}</p>
        <p>Adhar Number: {profileData.adhar}</p>
        <p>Address: {profileData.address}</p>
      </div>
    </div>
  );
}
