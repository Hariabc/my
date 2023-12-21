import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      await axios.post(`/set-password/${token}`, { password });
      // Optionally, redirect to a login page or show a success message
    } catch (error) {
      // Handle errors
      console.error('Failed to set password:', error);
    }
  };

  return (
    <div>
      <h2>Set Your Password</h2>
      <div>
        <label>New Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleSetPassword}>Set Password</button>
    </div>
  );
};

export default SetPassword;