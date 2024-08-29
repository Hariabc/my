import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./causelist.css";
import { Button, MenuItem, Typography, Select, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Container } from '@mui/material';
import { Stack } from 'react-bootstrap';


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
    <div style={{ border: '4px solid #ddd', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', paddingTop: '90px',margin:'20px' }}>
    <Container maxWidth="xl" className="container-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
    <div className="heading" style={{ marginBottom: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>CAUSE LIST</Typography>
    </div>

    {!showCauseList ? (
      <div className="dropdown-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="flex-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div className="dropdown-box"  style={{ width: '250px', marginBottom: '20px' }}>
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

          <div className="dropdown-box" style={{ width: '250px', marginBottom: '20px' }}>
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

          <div className="dropdown-box" style={{ width: '250px', marginBottom: '20px' }}>
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
          <div className="dropdown-box" style={{ width: '250px', margin: '5px' }}>
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

         
<div className="captcha-box" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
  {/* <Typography variant="h6" style={{ marginBottom: '10px' }} className="label-captcha"><b>Enter Captcha:</b></Typography> */}
  
  <div className="captcha-container" style={{marginBottom: '10px' }}>
    <Stack>
    <Typography variant="body1">Captcha</Typography>
    <Typography variant="body1" className="captcha-text-box" style={{ margin: '10px 0', fontSize: '1.2em', fontWeight: 'bold' }}>{captcha}</Typography>
    <TextField
      type="text"
      id="captcha"
      className="captcha-input"
      variant="outlined"
      placeholder='Enter captcha'
      onChange={handleCaptchaInputChange}
      style={{ width: '250px' }}
    />
  <Button variant="contained" color="primary" className="captcha-verify-button" onClick={handleVerifyCaptcha} style={{marginLeft:"30px",marginTop:"5px"}}>
    Verify
  </Button>
  </Stack>
  </div>
  {captchaVerified && <Typography variant="body2" className="success-message" style={{ marginTop: '10px', color: 'green' }}>Verification successful!</Typography>}
</div>


<div className="submit-button-container" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
<Button
  variant='contained'
  color="primary"
  size="small" // Add this line to make the button small
  onClick={handleSubmit}
  fullWidth
  style={{  width: '250px' }}
  >
  Submit
</Button>
</div>
        </div>
      ) : (
        <div style={{width: '100%' }}>
    <h2 style={{ marginLeft: '500px' }}>CAUSE LIST FOR  {courts.find((court) => court.id === selectedCourt)?.name}</h2>
    <TableContainer component={Paper}>
      <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell style={tableHeaderStyle}>Sl. NO</TableCell>
            <TableCell style={tableHeaderStyle}>CASE NUMBER</TableCell>
            <TableCell style={tableHeaderStyle}>PARTIES INVOLVED</TableCell>
            <TableCell style={tableHeaderStyle}>COURT NAME</TableCell>
            {/* <TableCell style={tableHeaderStyle}>Judge Name</TableCell> */}
            <TableCell style={tableHeaderStyle}>HEARING DATE</TableCell>
            <TableCell style={tableHeaderStyle}>HEARING TIME</TableCell>
            <TableCell style={tableHeaderStyle}>MODE OF HEARING</TableCell>
            <TableCell style={tableHeaderStyle}>STATUS</TableCell>
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
</div>
   
  );
};

const tableHeaderStyle = {
  border: '2px solid black',
  padding: '20px',
  background: 'blue',
  textAlign: 'left',
  color:'white',
};

const tableCellStyle = {
  border: '2px solid black',
  padding: '20px',
  textAlign: 'left',
  fontSize: '20px',
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