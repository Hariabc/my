import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import admin from "../assets/Admin.png";
import advocate from "../assets/advocate.png";
import client from "../assets/client.png";
import judge from "../assets/judge.png";
import COAdashboard from '../coa/COAdashboard';
import Clientdashboard from '../client/Clientdashboard';
import Judgedashboard from '../judge/Judgedashboard';

const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const users = [
    { id: 'admin', name: 'Admin' },
    { id: 'advocate', name: 'Advocate' },
    { id: 'client', name: 'Client' },
    { id: 'judge', name: 'Judge' },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (selectedUser && email && password) {
      const selectedUserObject = users.find((user) => user.id === selectedUser);
      if (selectedUserObject) {
        console.log('Selected User:', selectedUserObject.name);
      } else {
        console.log('Selected user not found.');
      }
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.log('Please select a user and provide an email and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="user-selection">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-button ${selectedUser === user.id ? 'selected' : ''}`}
            onClick={() => handleUserClick(user.id)}
          >
            <img src={user.id === 'admin' ? admin : user.id === 'advocate' ? advocate : user.id === 'client' ? client : judge} alt={user.name} />
            <p className="user-text">{user.name}</p>
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="login-form">
          <h2>Login as {users.find((user) => user.id === selectedUser).name}</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" ><Link to={`/${selectedUser}d`}>Login</Link></button>
            <p className='Register'>
              Don't have an account?<span><Link to={`/${selectedUser}r`} style={{textDecoration:"none"}}>Register</Link></span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
