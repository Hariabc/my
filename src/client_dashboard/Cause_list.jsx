// Dropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './causelist.css';

const App = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    // Fetch states
    axios.post('https://phoenix.akshit.me/district-court/states')
      .then((response) => {
        setStates(response.data.states);
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      });

    // Generate and set initial captcha
    generateCaptcha();
  }, []);

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setSelectedState(selectedStateId);

    // Fetch districts based on selected state
    axios.post('https://phoenix.akshit.me/district-court/districts', { stateId: selectedStateId })
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error('Error fetching districts:', error);
      });
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);

    // Fetch courts based on selected district
    axios.post('https://phoenix.akshit.me/district-court/courts', { districtId: selectedDistrictId })
      .then((response) => {
        setCourts(response.data.courts);
      })
      .catch((error) => {
        console.error('Error fetching courts:', error);
      });
  };

  const handleDateChange = (e) => {
    const selectedDateValue = e.target.value;
    setSelectedDate(selectedDateValue);
  };

  const handleCaptchaInputChange = (e) => {
    const enteredCaptcha = e.target.value;
    setCaptchaInput(enteredCaptcha);
  };

  const handleVerifyCaptcha = () => {
    // Perform captcha verification logic here
    const isCaptchaVerified = captchaInput.toLowerCase() === captcha.toLowerCase();
    setCaptchaVerified(isCaptchaVerified);

    // Generate a new captcha after verification
    if (isCaptchaVerified) {
      generateCaptcha();
    }
  };

  const generateCaptcha = () => {
    const captchaText = generateRandomTextCaptcha();
    setCaptcha(captchaText);
  };

  const generateRandomTextCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6;
    let captcha = '';
    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }
    return captcha;
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    if (captchaVerified) {
      alert('Form submitted successfully!');
      // Reset form or navigate to another page if needed
    } else {
      alert('Please verify the captcha before submitting.');
    }
  };

  return (
    <div className="container">
      <h2>Cause Lists</h2>
      <div className="dropdown-container">
        <div className="dropdown-box">
          <label htmlFor="states">Select State:</label>
          <select id="states" onChange={handleStateChange}>
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-box">
          <label htmlFor="districts">Select District:</label>
          <select id="districts" onChange={handleDistrictChange}>
            <option value="">Select a district</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-box">
          <label htmlFor="courts">Select Court:</label>
          <select id="courts">
            <option value="">Select a court</option>
            {courts.map((court) => (
              <option key={court.id} value={court.id}>
                {court.name}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-box">
          <label htmlFor="date">Cause List Date:</label>
          <input type="date" id="date" onChange={handleDateChange} />
        </div>

        <div className="captcha-box">
          <label htmlFor="captcha">Enter Captcha:</label>
          <div className="captcha-text-box">{captcha}</div>
          <input type="text" id="captcha" className="captcha-input" onChange={handleCaptchaInputChange} />
          <button onClick={handleVerifyCaptcha}>Verify Captcha</button>
          {captchaVerified && <p className="success-message">Verification successful!</p>}
        </div>

        <div className="button-box">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default App;