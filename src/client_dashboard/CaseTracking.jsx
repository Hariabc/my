import React, { useState } from 'react';
import './CaseTracking.css';
import StateDistrictSelector from '../components/Dropdown2';
import Dropdown from '../components/Dropdown';

const CaseTracking = () => {
  const [trackingOption, setTrackingOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');

  const handleSearchOptionClick = (option) => {
    setTrackingOption(option);
    setSearchValue('');
    setCaseStatus('');
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    console.log('Selected State:', state);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    console.log('Selected District:', district);
  };

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    console.log('Selected Court:', court);
  };

  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (
      !(
        (charCode >= 48 && charCode <= 57) ||
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122)
      )
    ) {
      e.preventDefault();
    }
  };

  const getCaseStatus = async (trackingOption, searchValue) => {
    // Implement your logic to fetch case status based on tracking option and search value
    // Example: You might make an API call here
    // const response = await fetch(`/api/caseStatus?trackingOption=${trackingOption}&searchValue=${searchValue}`);
    // const data = await response.json();
    // return data.status;
    // Replace the above lines with your actual logic
  };

  const handleSearch = async () => {
    try {
      console.log('Selected State:', selectedState);
      console.log('Selected District:', selectedDistrict);
      console.log('Selected Court:', selectedCourt);
      console.log('Tracking Option:', trackingOption);
      console.log('Search Value:', searchValue);

      const capitalizedSearchValue = searchValue.toUpperCase();
      const status = await getCaseStatus(trackingOption, capitalizedSearchValue);
      setCaseStatus(status);
    } catch (error) {
      console.error('Error fetching case status:', error);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue.toUpperCase());
  };

  return (
    <div className="full-width-container">
      <div className="tracking-container">
        <h2 style={{ paddingBottom: 'none' }}>Case Tracking</h2>

        <div className="options-container">
          <div
            className={`option ${trackingOption === 'cnr' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('cnr')}
          >
            CNR Number
          </div>
          <div
            className={`option ${trackingOption === 'partyName' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('partyName')}
          >
            Party Name
          </div>
          <div
            className={`option ${trackingOption === 'advocateName' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('advocateName')}
          >
            Advocate Name
          </div>
          <div
            className={`option ${trackingOption === 'courtName' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('courtName')}
          >
            Court Name
          </div>
        </div>

        {trackingOption && (
          <div className="input-container">
            <Dropdown onSelectCourt={handleCourtSelect} />
            <input
              type="text"
              placeholder={`Enter ${
                trackingOption === 'cnr'
                  ? 'CNR'
                  : trackingOption === 'courtName'
                  ? 'Court Name'
                  : trackingOption
              }`}
              value={searchValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Submit</button>
          </div>
        )}

        {caseStatus && (
          <div className="case-status">
            <h3>Case Status:</h3>
            <p>{caseStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseTracking;
