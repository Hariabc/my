import React, {useState } from 'react';
import '../REGISTER/register.css';
import client from '../assets/client.png';
import advocate from '../assets/advocate.png';


const RegisterPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'client', form: <ClientForm /> },
    { id: 2, name: 'advocate', form: <AdvocateForm /> },
  ];

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

  const resetSelection = () => {
    setSelectedUser(null);
  };



  return (
    <div className="register-container">
      <h2 className="register-header">
        {selectedUser ? `Register as ${users[selectedUser - 1].name}` : 'Select a user to register:'}
      </h2>
      <div className="user-selecting">
        {selectedUser ? (
          <>
            {users[selectedUser - 1].form}
            <button onClick={resetSelection} className="clear-selection-button">
              Clear Selection
            </button>
          </>
        ) : (
          <div className="user-list">
            <div className="user-item" onClick={() => handleUserClick(1)}>
              <div className="image-container">
                <img src={client} className="user-avatar" alt="Client" />
                <p className="user-text">Client</p>
              </div>
            </div>
            <div className="user-item" onClick={() => handleUserClick(2)}>
              <div className="image-container">
                <img src={advocate} className="user-avatar" alt="Advocate" />
                <p className="user-text">Advocate</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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
    <div>
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

const AdvocateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    licenseNumber: '',
    barAssociation: '',
    jurisdiction: '',
    educationQualifications: '',
    yearsOfPractice: '',
    practiceArea: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Advocate Form Data:', formData);

    // Add your form submission logic here

    fetch("http://localhost:5000/registerAdvocate" , {
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
        email: formData.email,
        phoneNo: formData.phoneNo,
        licenseNumber: formData.licenseNumber,
        barAssociation: formData.barAssociation,
        jurisdiction: formData.jurisdiction,
        educationQualifications: formData. educationQualifications,
        yearsOfPractice: formData.yearsOfPractice,
        practiceArea: formData.practiceArea,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data, "advocateRegister");
      // Additional logic after a successful response
    })
    .catch((error) => {
      console.error("Error during registration:", error.message);
      // Handle the error appropriately, e.g., show an error message to the user
    });
  };

  return (
    <div>
      <h3 className="user-form-title">Advocate Registration</h3>
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
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Phone No:
          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          License Number:
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Bar Association:
          <input type="text" name="barAssociation" value={formData.barAssociation} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Jurisdiction:
          <input type="text" name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Education Qualifications:
          <input type="text" name="educationQualifications" value={formData.educationQualifications} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Years of Practice:
          <input type="text" name="yearsOfPractice" value={formData.yearsOfPractice} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Practice Area:
          <input type="text" name="practiceArea" value={formData.practiceArea} onChange={handleChange} className="form-input" />
        </label>
        <div className="register">
            <button type="submit" className="form-button">
          Register as Advocate
        </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
