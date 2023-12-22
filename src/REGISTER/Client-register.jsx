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
    }
  
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
  