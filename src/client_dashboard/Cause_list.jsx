import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./causelist.css";
import { Button, MenuItem, Typography, Select, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Container } from '@mui/material';


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
    <Container maxWidth="xl" className="container-list" >
    <div className="heading">
      <Typography variant="h4" align="center" gutterBottom><b>CAUSE LIST</b></Typography>
    </div>

    {!showCauseList ? (
      <div className="dropdown-container">
        <div className="flex-container">
          <div className="dropdown-box">
            <InputLabel id="state-label">Select State:</InputLabel>
            <Select labelId="state-label" label="Select State" style={{ width: '250px' }} id="states" onChange={handleStateChange}>
            <MenuItem value="">
        <em>Choose a state</em>
      </MenuItem>
      {states.map((state) => (
        <MenuItem key={state.id} value={state.id}>
          {state.name}
        </MenuItem>
      ))}
    </Select>
  </div>

          <div className="dropdown-box">
            <InputLabel id="state-label">Select District:</InputLabel>
            <Select labelId="district-label" id="districts" style={{ width: '250px' }} onChange={handleDistrictChange}>
              <MenuItem value=""><em>Select a district</em></MenuItem>
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="dropdown-box">
            <InputLabel htmlFor="courts">Select Court:</InputLabel>
            <Select id="courts" style={{ width: '250px' }} onChange={(e) => setSelectedCourt(e.target.value)}>
              <MenuItem value="">Select a court</MenuItem>
              {courts.map((court) => (
                <MenuItem key={court.id} value={court.id}>
                  {court.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="dropdown-box">
  <label htmlFor="date">Cause List Date:</label>
  <TextField
    type="date"
    id="date" style={{ width: '250px' }}
    onChange={handleDateChange}
    InputLabelProps={{
      shrink: true,
    }}
  />
</div>
</div>

         
<div className="captcha-box">
  <Typography variant="h6" className="label-captcha"><b>Enter Captcha:</b></Typography>
  
  <div className="captcha-container">
    <Typography variant="body1">Captcha</Typography>
    <Typography variant="body1" className="captcha-text-box">{captcha}</Typography>
    <TextField
      type="text"
      id="captcha"
      className="captcha-input"
      variant="outlined"
      onChange={handleCaptchaInputChange}
    />
  </div>
  <Button variant="contained" color="primary" className="captcha-verify-button" onClick={handleVerifyCaptcha} style={{ marginTop: '10px' }}>
    Verify
  </Button>
  {captchaVerified && <Typography variant="body2" className="success-message">Verification successful!</Typography>}
</div>


<div className="submit-button-container">
<Button
  variant='contained'
  color="primary"
  size="small" // Add this line to make the button small
  onClick={handleSubmit}
  fullWidth
  style={{ marginTop: '10px', marginLeft:'610px' ,  width: '250px' }}
  >
  Submit
</Button>
</div>
        </div>
      ) : (
        <div>
    <h2>Cause List for {courts.find((court) => court.id === selectedCourt)?.name}</h2>
    <TableContainer component={Paper}>
      <Table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeaderStyle}>Sl. No</TableCell>
            <TableCell style={tableHeaderStyle}>Case Number</TableCell>
            <TableCell style={tableHeaderStyle}>Parties Involved</TableCell>
            <TableCell style={tableHeaderStyle}>Court Name</TableCell>
            {/* <TableCell style={tableHeaderStyle}>Judge Name</TableCell> */}
            <TableCell style={tableHeaderStyle}>Hearing Date</TableCell>
            <TableCell style={tableHeaderStyle}>Hearing Time</TableCell>
            <TableCell style={tableHeaderStyle}>Mode of Hearing</TableCell>
            <TableCell style={tableHeaderStyle}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {causeList.map((caseItem, index) => (
            <TableRow key={caseItem.caseNumber}>
              <TableCell style={tableCellStyle}>{index + 1}</TableCell>
              <TableCell style={tableCellStyle}>{caseItem.caseNumber}</TableCell>
              <TableCell style={tableCellStyle}>
                {caseItem.hearings.map((hearing, hearingIndex) => (
                  <div key={hearingIndex}>{`${hearing.plaintiffName} vs ${hearing.defendantName}`}</div>
                ))}
              </TableCell>
              <TableCell style={tableCellStyle}>{realcourtname}</TableCell>
              {/* <TableCell style={tableCellStyle}>
                {caseItem.hearings.map((hearing, hearingIndex) => (
                  <div key={hearingIndex}>{(hearing.judge.name)}</div>
                ))}
              </TableCell> */}
              <TableCell style={tableCellStyle}>
                {caseItem.hearings.map((hearing, hearingIndex) => (
                  <div key={hearingIndex}>{formatDate(hearing.date)}</div>
                ))}
              </TableCell>
              <TableCell style={tableCellStyle}>
                {caseItem.hearings.map((hearing, hearingIndex) => (
                  <div key={hearingIndex}>{(hearing.time)}</div>
                ))}
              </TableCell>
              <TableCell style={tableCellStyle}>
                {caseItem.hearings.map((hearing, hearingIndex) => (
                  <div key={hearingIndex}>{hearing.hearingMode}</div>
                ))}
              </TableCell>
              <TableCell style={tableCellStyle}>
                {caseItem.hearings.map((hearing, hearingIndex) => (
                  <div key={hearingIndex}>{hearing.hearingStatus}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)}

</Container>
   
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