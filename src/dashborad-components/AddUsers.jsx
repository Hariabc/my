// LawyersForm.jsx
import React, { useState } from 'react';
import './AddUsers.css';

export default function AddUsers() {
  const [showJudgesForm, setShowJudgesForm] = useState(false);
  const [showLawyersForm, setShowLawyersForm] = useState(false);

  const handleJudgesClick = () => {
    setShowJudgesForm(true);
    setShowLawyersForm(false);
  };

  const handleLawyersClick = () => {
    setShowJudgesForm(false);
    setShowLawyersForm(true);
  };

  return (
    <>
    <div className="add-users-container">
      <button className="button" onClick={handleJudgesClick}>
        Add Judges
      </button>
      <button className="button" onClick={handleLawyersClick}>
        Add Lawyers
      </button>
    </div>
    <div className="forms">
      {showLawyersForm && <LawyersForm />}
      {showJudgesForm && <JudgesForm />}
    </div>
    </>
  );
}


function LawyersForm() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    licenseNumber: '',
    educationQualifications: '',
    jurisdiction: '',
    barAssociation: '',
    yearsOfPractice: '',
    practiceArea: '',
    courtAdminId: '',
    isPrivateAdvocate: false,
    isAppointedByCourtAdmin: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="lawyers-form">
        <h2 style={{marginBottom:"0", paddingBottom:"0"}}>
            Lawyers Form
        </h2>
      <form className="lawyers-form-container">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="licenseNumber" className="form-label">
            License Number:
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="educationQualifications" className="form-label">
            Education:
          </label>
          <input
            name="educationQualifications"
            value={formData.educationQualifications}
            onChange={handleChange}
            className="form-input"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="jurisdiction" className="form-label">
            Jurisdiction:
          </label>
          <input
            type="text"
            name="jurisdiction"
            value={formData.jurisdiction}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="barAssociation" className="form-label">
            Bar Association:
          </label>
          <input
            type="text"
            name="barAssociation"
            value={formData.barAssociation}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearsOfPractice" className="form-label">
            Years of Practice:
          </label>
          <input
            type="number"
            name="yearsOfPractice"
            value={formData.yearsOfPractice}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="practiceArea" className="form-label">
            Practice Area:
          </label>
          <input
            type="text"
            name="practiceArea"
            value={formData.practiceArea}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="courtAdminId" className="form-label">
            Court Admin ID:
          </label>
          <input
            type="text"
            name="courtAdminId"
            value={formData.courtAdminId}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}


function JudgesForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    gender: '',
    education: '',
    courtAdminId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data, e.g., send it to the server
    console.log('Form submitted:', formData);
    // Reset the form fields
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      education: '',
      courtAdminId: '',
    });
  };

  return (
    <div className="judges-form">
      <h2 style={{ marginBottom: "0", paddingBottom: "0" }}>
        Judges Form
      </h2>
      <form className="judges-form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="education" className="form-label">
            Education:
          </label>
          <input
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="form-input"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="courtAdminId" className="form-label">
            Court Admin ID:
          </label>
          <input
            type="text"
            name="courtAdminId"
            value={formData.courtAdminId}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
