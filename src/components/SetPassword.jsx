import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SetPassword.css';

const SetPassword = () => {
  const { token } = useParams(); // Fetching token from URL params
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        await axios.post(`http://localhost:5000/client/set-password/${token}`, {
          password: password,
        });
        toast.success('Password set successfully! Redirecting to login page.', {
          onClose: () => {
            setTimeout(() => {
              navigate('/login');
            }, 5000); // Redirect after 5 seconds (5000 milliseconds)
          },
        });
      } catch (error) {
        // Handle error
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error('Network error');
        } else {
          toast.error('Something went wrong');
        }
      }
    } else {
      // Passwords don't match
      toast.error('Passwords do not match');
    }
  };

  return (
    <div className="password-container">
      <h1>Set Your Password</h1>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ width: 'auto' }}
      />
      <form onSubmit={handleSubmit} className="password-form">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="password-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="password-input"
        />
        <button type="submit" className="password-button">Set Password</button>
      </form>
    </div>
  );
};

export default SetPassword;
