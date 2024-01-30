import React, { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { RiNurseFill } from 'react-icons/ri';

// Styled components for better structure
const CustomContainer = styled(Container)({
  marginTop: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CustomCard = styled('div')({
  maxWidth: '80%',
  width: '100%',
  padding: '1.5rem',
  borderRadius: '1rem',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
});

const Heading = styled(Typography)({
  marginBottom: '1rem',
  color: '#2C3E50',
  textAlign : 'center',
});

const FormControlWrapper = styled('div')({
  width: '100%',
  marginBottom: '1rem',
});

const Input = styled(TextField)({
  width: '100%',
  marginBottom: '1rem',
});

const SubmitButton = styled(Button)({
  borderRadius: '1rem',
  backgroundColor: '#3498db',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
});

const NoCaseMessage = styled('div')({
  marginTop: '1.5rem',
  color: '#e74c3c',
});

const UniqueCaseDetails = styled('div')({
  marginTop: '1.5rem',
});

const UniqueCard = styled('div')({
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '1rem',
  backgroundColor: '#ecf0f1',
});

const UniqueCaseHeading = styled(Typography)({
  marginBottom: '0.5rem',
  // Add color if needed
});

const CaseTracking = () => {
  const [trackingOption, setTrackingOption] = useState('cnr');
  const [searchValue, setSearchValue] = useState('');
  const [caseDetails, setCaseDetails] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

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

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:5000/client/case-tracking', {
        // courtState: selectedCourt.courtState,
        // courtDistrict: selectedCourt.courtDistrict,
        // courtName: selectedCourt.courtName,
        searchType: trackingOption,
        searchValue: searchValue,
      });

      console.log(response.data);

      const { caseDetails } = response.data;

      if (!caseDetails || !caseDetails.caseNumber) {
        console.log('No case found');
      } else {
        setCaseDetails(caseDetails);
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue.toUpperCase());
  };

  return (
    <CustomContainer >
      <CustomCard >
        <Heading variant="h4">
          <b>CASE TRACKING</b>
        </Heading>
        <br></br>

        {trackingOption && (
          <div >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'  }}>
            <FormControlWrapper style={{ marginRight: '40px' }}>
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
                </FormControlWrapper>

              <FormControlWrapper style={{ marginRight: '40px' }}>
                <InputLabel id="state-label">Select District:</InputLabel>
                <Select labelId="district-label" id="districts" style={{ width: '250px' }} onChange={handleDistrictChange}>
                  <MenuItem value=""><em>Select a district</em></MenuItem>
                  {districts.map((district) => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
             </FormControlWrapper>

              <FormControlWrapper style={{ marginRight: '40px' }}>
                <InputLabel htmlFor="courts">Select Court:</InputLabel>
                <Select id="courts" style={{ width: '250px' }} onChange={(e) => setSelectedCourt(e.target.value)}>
                  <MenuItem value="">Select a court</MenuItem>
                  {courts.map((court) => (
                    <MenuItem key={court.id} value={court.id}>
                      {court.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlWrapper>
            </div>

            <br />

            <FormControlWrapper>
              <InputLabel id="tracking-option-label" >Tracking Option</InputLabel>
              <Select
                labelId="tracking-option-label"
                id="tracking-option"
                value={trackingOption}
                onChange={(e) => setTrackingOption(e.target.value)}
                style={{ width: '100%' }}
              >                           
                <MenuItem value="cnr">CNR</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControlWrapper>

            <Input
              type="text"
              placeholder={`Enter ${trackingOption === 'cnr' ? 'CNR' : ''}`}
              value={searchValue}
              onInput={handleInputChange}
            />

            <br />

            <SubmitButton
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </SubmitButton>
          </div>
        )}

        <NoCaseMessage>
          {!loading && !caseDetails === null && searchValue.trim() && <p>No case found.</p>}
        </NoCaseMessage>

        {!loading && caseDetails && (
          <UniqueCaseDetails>
            <UniqueCaseHeading variant="h5">Case Details:</UniqueCaseHeading>
            <UniqueCard>
              <Typography variant="body1">
                <strong>Case Number:</strong> {caseDetails.caseNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Case Type:</strong> {caseDetails.caseType || caseDetails.filecasetype}
              </Typography>
              <Typography variant="body1">
                <strong>Case Status:</strong> {caseDetails.caseStatus || caseDetails.progress}
              </Typography>
            </UniqueCard>
          </UniqueCaseDetails>
        )}
      </CustomCard>
    </CustomContainer>
  );
};

export default CaseTracking;
