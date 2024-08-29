import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = ({ onSelectCourt }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCourt, setSelectedCourt] = useState({});

  useEffect(() => {
    // Fetch states
    axios.post('https://phoenix.akshit.me/district-court/states')
      .then((response) => {
        setStates(response.data.states);
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      });
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

  const handleCourtChange = (e) => {
    const selectedCourtId = e.target.value;
    const selectedCourtDetails = courts.find((court) => court.id === selectedCourtId);
    setSelectedCourt(selectedCourtDetails);

    if (selectedCourtDetails) {
      onSelectCourt({
        courtName: selectedCourtDetails.name,
        courtDistrict: selectedDistrict,
        courtState: selectedState
      });
    }
  };

  return (
    <div style={{display:'flex',flexDirection:"column"}}>
      <label htmlFor="states" style={{marginRight:"80%",paddingBottom:"7px",width:"100px"}}>Select State:</label>
      <select id="states" onChange={handleStateChange}>
        <option value="">Select a state</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select> 

      <label htmlFor="districts" style={{marginRight:"80%",padding:"7px 0",width:"100px"}}>Select District:</label>
      <select id="districts" onChange={handleDistrictChange}>
        <option value="">Select a district</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      <label htmlFor="courts" style={{marginRight:"80%",padding:"7px 0",width:"100px"}}>Select Court:</label>
      <select id="courts" onChange={handleCourtChange}>
        <option value="">Select a court</option>
        {courts.map((court) => (
          <option key={court.id} value={court.id}>
            {court.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
