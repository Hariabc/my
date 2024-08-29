import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
    username: '',
    adhar: '',
    address: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
    username: '',
    adhar: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: '', // Clear the error when the user starts typing again
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
      valid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.dob.trim()) {
      errors.dob = 'Date of Birth is required';
      valid = false;
    }

    if (!formData.gender.trim()) {
      errors.gender = 'Gender is required';
      valid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required';
      valid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
      valid = false;
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      valid = false;
    }

    if (!formData.adhar.trim()) {
      errors.adhar = 'Aadhar Number is required';
      valid = false;
    } else if (formData.adhar.trim().length !== 12) {
      errors.adhar = 'Aadhar Number should be 12 digits';
      valid = false;
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username,firstName } = formData;


    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/client/register', formData);
        if (response && response.data) {
          console.log('Server Response:', response.data);
          toast.success('Link has been sent to your mail to set password'); // Success message
          // Handle success (redirect, display a success message, etc.)
          const userResponse = await axios.post('https://api-049FF9C5-DFDC-4991-B147-D2FDFDC72C54.sendbird.com/v3/users', {
          user_id: username,
          nickname: username,
          profile_url: 'https://example.com/profile-image.jpg'
        },{headers: {
          'Content-Type': 'application/json',
          'Api-Token': '2ef385818c2c2b64c09437dfbf7f5166c539d8f9',
        },}
        );
        console.log('User Response:', userResponse.data)
        } else {
          console.error('Error: Response or response data is undefined');
          toast.error('Failed to register client'); // Error message
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        toast.error('Failed to register client'); // Error message
      }
    } else {
      toast.error('Form has validation errors. Please fix them.'); // Validation error message
      console.log('Form has validation errors. Please fix them.');
    }
  };

  return (
    <div className='register-main-box'>
     <ToastContainer
        position="top-center" // Set the position to top-center
        autoClose={5000} // Adjust duration
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h3 className="user-form-title">Client Registration</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <label className="form-label">
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" />
          {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
        </label>
        <label className="form-label">
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" />
          {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
        </label>
        {/* Repeat this structure for other fields */}
        {/* // ... (previous code remains unchanged) */}

      <label className="form-label">
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
      </label>

      <label className="form-label">
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-input" />
        {formErrors.dob && <span className="error-message">{formErrors.dob}</span>}
      </label>

      <label className="form-label">
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
      </label>

      <label className="form-label">
        Phone Number:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
      </label>

      <label className="form-label">
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-input" />
        {formErrors.username && <span className="error-message">{formErrors.username}</span>}
      </label>

      <label className="form-label">
        Aadhar Number:
        <input type="text" name="adhar" maxLength={12} value={formData.adhar} onChange={handleChange} className="form-input" />
        {formErrors.adhar && <span className="error-message">{formErrors.adhar}</span>}
      </label>

      <label className="form-label">
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" />
        {formErrors.address && <span className="error-message">{formErrors.address}</span>}
      </label>

      {/* The button for form submission remains unchanged */}

{/* // ... (rest of the code remains unchanged) */}

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
