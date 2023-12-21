import React, { useState } from 'react';
import './Register.css';

const ClientForm = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      dateOfBirth: '',
      email: '',
      phoneNumber: '',
      address: '',
      aadharNumber: '',
      gender: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Client Form Data:', formData);
      fetch("http://localhost:5000/registerClient" , {
        method: "POST",
        crossDomain:true,
        headers: {
          "Content-type" : "application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin" : "*",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          password: formData.password,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          aadharNumber: formData.aadharNumber,
          gender: formData.gender,
        }),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userRegister");
        // Additional logic after a successful response
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
        // Handle the error appropriately, e.g., show an error message to the user
      });
    };
  
    return (
      <div className='register-main-box'>
        <h3 className="user-form-title">Client Registration</h3>
        <form onSubmit={handleSubmit} className="user-form">
          <label className="form-label">
            First Name:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Last Name:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Date of Birth:
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Phone Number:
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Aadhar Number:
            <input type="password" name="aadharNumber" maxLength={12} value={formData.aadharNumber} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <div className="register">
          <button type="submit" className="form-button">
            Register as Client
          </button>
          </div>
        </form>
      </div>
    );
  };
export default ClientForm;  
  