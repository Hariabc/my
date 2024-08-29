import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CauselistPage = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [causeList, setCauseList] = useState([]);
  const [showCauseList, setShowCauseList] = useState(false);
  const[realcourtname, setrealcourtname]=useState('')

  const formatDate = (date) => {
    // Use toLocaleDateString to format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
    return formattedDate;
  };

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

  const handleSubmit = async () => {
    // Add your form submission logic here
    if (captchaVerified) {
      try {
        const courtName = courts.find((court) => court.id === selectedCourt)?.name;
        setrealcourtname(courtName)
        if (!courtName) {
          console.error('Court name not found for the selected ID');
          return;
        }
  
        try {
          const response = await axios.post(`http://localhost:5000/client/${courtName}/causelist`, { date: selectedDate });
          setCauseList(response.data);
          setShowCauseList(true);
        } catch (error) {
          console.error('Error fetching cause list:', error);
        }
      } catch (nestedError) {
        console.error('Error in nested try block:', nestedError);
      }
    } else {
      alert('Please verify the captcha before submitting.');
    }
  };
  
  return (
    <div className="container">
      {!showCauseList ? (
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
            <select id="courts" onChange={(e) => setSelectedCourt(e.target.value)}>
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
      ) : (
        <div>
          <h2>Cause List for {courts.find((court) => court.id === selectedCourt)?.name}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Sl. No</th>
                <th style={tableHeaderStyle}>Case Number</th>
                <th style={tableHeaderStyle}>Parties Involved</th>
                  <th style={tableHeaderStyle}>Court Name</th>
                {/* <th style={tableHeaderStyle}>Judge Name</th> */}
                  
                <th style={tableHeaderStyle}>Hearing Date</th>
                <th style={tableHeaderStyle}>Hearing Time</th>
                  <th style={tableHeaderStyle}>Mode of Hearing</th>
                <th style={tableHeaderStyle}>Status</th>
                  
              </tr>
            </thead>
             <tbody>
      {causeList.map((caseItem, index) => (
        <tr key={caseItem.caseNumber}>
          <td style={tableCellStyle}>{index + 1}</td>
          <td style={tableCellStyle}>{caseItem.caseNumber}</td>
          <td style={tableCellStyle}>
            {caseItem.hearings.map((hearing, hearingIndex) => (
              <div key={hearingIndex}>{`${hearing.plaintiffName} vs ${hearing.defendantName}`}</div>
            ))}
          </td>
          <td style={tableCellStyle}>{realcourtname}</td>
          {/* <td style={tableCellStyle}>
            {caseItem.hearings.map((hearing, hearingIndex) => (
              <div key={hearingIndex}>{(hearing.judge.name)}</div>
            ))}
          </td> */}
          <td style={tableCellStyle}>
            {caseItem.hearings.map((hearing, hearingIndex) => (
              <div key={hearingIndex}>{formatDate(hearing.date)}</div>
            ))}
          </td>
          <td style={tableCellStyle}>
            {caseItem.hearings.map((hearing, hearingIndex) => (
              <div key={hearingIndex}>{(hearing.time)}</div>
            ))}
          </td>
          {/* Additional columns for each hearing property can be added similarly */}
          {/* <td style={tableCellStyle}>{formatTime(caseItem.heaings.date)}</td> */}
          <td style={tableCellStyle}>
            {caseItem.hearings.map((hearing, hearingIndex) => (
              <div key={hearingIndex}>{hearing.hearingMode}</div>

            ))}
          </td>
          <td style={tableCellStyle}>
            {caseItem.hearings.map((hearing, hearingIndex) => (
              <div key={hearingIndex}>{hearing.hearingStatus}</div>
              
            ))}
          </td>
        </tr>
      ))}
    </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return new Date(dateString).toLocaleTimeString(undefined, options);
};

export default CauselistPage;