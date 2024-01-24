import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const buttonStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const toastContainerStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '1', // Ensure toast appears above other elements
  };
  

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
      );
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/advocate/register/complete/${token}`, {
        email,
        password,
      });

      toast.success(response.data.message);
      // Registration completed successfully
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
        // Invalid token or email
      } else {
          console.log(error)
        toast.error('An error occurred while completing the registration.');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <ToastContainer style={toastContainerStyle}/>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleRegister} style={buttonStyle}>
        Register
      </button>
      
    </div>
  );
};

export default RegistrationForm;
