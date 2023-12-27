import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import admin from "../assets/Admin.png";
import advocate from "../assets/advocate.png";
import client from "../assets/client.png";
import judge from "../assets/judge.png";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const users = [
    { id: 'admin', name: 'Admin' },
    { id: 'advocate', name: 'Advocate' },
    { id: 'client', name: 'Client' },
    { id: 'judge', name: 'Judge' },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (selectedUser && email && password) {
      try {
        let endpoint = '';
        switch (selectedUser) {
          // Switch cases remain the same
          case 'admin':
            endpoint = 'http://localhost:5000/admin/login'; // Replace with the admin login endpoint
            break;
          case 'advocate':
            endpoint = 'http://localhost:5000/advocate/login'; // Replace with the advocate login endpoint
            break;
          case 'client':
            endpoint = 'http://localhost:5000/client/login'; // Replace with the client login endpoint
            break;
          case 'judge':
            endpoint = 'http://localhost:5000/judge/login'; // Replace with the judge login endpoint
            break;
          default:
            // Handle default case or error
            break;
        }

        const response = await axios.post(
          endpoint,
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          toast.success('Login successful!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate(`/${selectedUser}d`);
          }, 2000); // Redirect after a 2-second delay
        } else {
          toast.error('Login failed. Please try again.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        toast.error('Login failed. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } else {
      toast.error('Please fill in all fields.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
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
            <button type="submit">Login</button>
            <p className='Register'>
              Don't have an account?<span><Link to={`/${selectedUser}/register`} style={{ textDecoration: "none" }}>Register</Link></span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
