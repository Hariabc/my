// StateDistrictSelector.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateDistrictSelector = ({ onSelectState, onSelectDistrict }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.post('https://phoenix.akshit.me/district-court/states');
        setStates(response.data.states);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const selectedStateId = e.target.value;
    setSelectedState(selectedStateId);

    try {
      const response = await axios.post('https://phoenix.akshit.me/district-court/districts', {
        stateId: selectedStateId
      });
      setDistricts(response.data.districts);
      onSelectState(states.find((state) => state.id === selectedStateId)?.name || '');
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);
    onSelectDistrict(districts.find((district) => district.id === selectedDistrictId)?.name || '');
  };

  return (
    <div>
      <label htmlFor="states">Select State:</label>
      <select id="states" onChange={handleStateChange}>
        <option value="">Select a state</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

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
  );
};

export default StateDistrictSelector;
