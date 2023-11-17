import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import admin from "../components/admin.png";
import advocate from "../components/advocate.png";
import client from "../components/client.png";
import judge from "../components/judge.png";
import COAdashboard from '../coa/COAdashboard';
import Clientdashboard from '../client/Clientdashboard';
import Judgedashboard from '../judge/Judgedashboard';

const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState('');
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

    if (selectedUser && username && password) {
      const selectedUserObject = users.find((user) => user.id === selectedUser);
      if (selectedUserObject) {
        console.log('Selected User:', selectedUserObject.name);
      } else {
        console.log('Selected user not found.');
      }
      console.log('Username:', username);
      console.log('Password:', password);
    } else {
      console.log('Please select a user and provide a username and password.');
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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              Don't have an account?<span><Link to="/Register" style={{textDecoration:"none"}}>Register</Link></span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
