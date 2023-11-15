import React, { useState } from 'react';
import "./Register.css"
import admin from "./admin.png"
import advocate from "./advocate.png"
import client from "./client.png"
import judge from "./judge.png"

const RegisterPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'client', form: <ClientForm /> },
    { id: 2, name: 'advocate', form: <AdvocateForm /> },
    { id: 3, name: 'judge', form: <JudgeForm /> },
    { id: 4, name: 'admin', form: <CoaForm /> },
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
            <div className="user-item" onClick={() => handleUserClick(3)}>
              <div className="image-container">
                <img src={judge} className="user-avatar" alt="Judge" />
                <p className="user-text">Judge</p>
              </div>
            </div>
            <div className="user-item" onClick={() => handleUserClick(4)}>
              <div className="image-container">
                <img src={admin} className="user-avatar" alt="Admin" />
                <p className="user-text">Admin</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ClientForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Client Form Data:', formData);
    // Add your form submission logic here
  };

  return (
    <div>
      <h3 className="user-form-title">Client Registration</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <label className="form-label">
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Register as Client
        </button>
      </form>
    </div>
  );
};

const AdvocateForm = () => {
  const [formData, setFormData] = useState({ name: '', specialization: '' });

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
  };

  return (
    <div>
      <h3 className="user-form-title">Advocate Registration</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <label className="form-label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Specialization:
          <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="form-input" />
        </label>
        <button type="submit" className="form-button">
          Register as Advocate
        </button>
      </form>
    </div>
  );
};

const JudgeForm = () => {
  const [formData, setFormData] = useState({ name: '', court: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Judge Form Data:', formData);
    // Add your form submission logic here
  };

  return (
    <div>
      <h3 className="user-form-title">Judge Registration</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <label className="form-label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Court:
          <input type="text" name="court" value={formData.court} onChange={handleChange} className="form-input" />
        </label>
        <button type="submit" className="form-button">
          Register as Judge
        </button>
      </form>
    </div>
  );
};

const CoaForm = () => {
  const [formData, setFormData] = useState({ name: '', department: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Coa Form Data:', formData);
    // Add your form submission logic here
  };

  return (
    <div>
      <h3 className="user-form-title">Coa Registration</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <label className="form-label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-input" />
        </label>
        <button type="submit" className="form-button">
          Register as Coa
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
