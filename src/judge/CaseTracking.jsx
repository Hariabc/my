import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import './CaseTracking.css';

const CaseTracking = () => {
  const [trackingOption, setTrackingOption] = useState('cnr');
  const [searchValue, setSearchValue] = useState('');
  const [caseDetails, setCaseDetails] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchOptionClick = (option) => {
    setTrackingOption(option);
    setSearchValue('');
    setCaseDetails(null);
  };

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    console.log('Selected Court:', court);
  };

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true
      console.log('Selected State:', selectedCourt.courtState);
      console.log('Selected District:', selectedCourt.courtDistrict);
      console.log('Selected Court:', selectedCourt.courtName);
      console.log('Tracking Option:', trackingOption);
      console.log('Search Value:', searchValue);
  
      // Clear previous case details
      setCaseDetails(null);
  
      // Send Axios request to the backend
      const response = await axios.post('http://localhost:5000/judge/case-tracking', {
        courtState: selectedCourt.courtState,
        courtDistrict: selectedCourt.courtDistrict,
        courtName: selectedCourt.courtName,
        searchType: trackingOption,
        searchValue: searchValue, // Keep the original searchValue without converting to uppercase
      });
  
      // Handle the response from the backend
      console.log(response.data);
  
      const { caseDetails } = response.data;
  
      if (!caseDetails || !caseDetails.caseNumber) {
        // Case not found
        console.log('No case found');
      } else {
        // Update the case details state with the received data
        setCaseDetails(caseDetails);
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
    } finally {
      setLoading(false); // Set loading back to false, whether the request was successful or not
    }
  };
  

  

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue.toUpperCase());
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Case Tracking</h2>

          <div className="btn-group" role="group" aria-label="Tracking Options">
            <button
              type="button"
              className={`btn btn-outline-primary ${trackingOption === 'cnr' ? 'active' : ''}`}
              onClick={() => handleSearchOptionClick('cnr')}
            >
              CNR Number
            </button>
          </div>

          {trackingOption && (
            <div className="mt-3">
              <Dropdown onSelectCourt={handleCourtSelect} />

              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Enter ${trackingOption === 'cnr' ? 'CNR' : ''}`}
                  value={searchValue}
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" onClick={handleSearch}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading && <p>Loading...</p>}

          {!loading && caseDetails && (
            <div className="mt-4">
              <h3 className="mb-3">Case Details:</h3>
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Case Number:</strong> {caseDetails.caseNumber}
                  </p>
                  <p className="card-text">
                    <strong>Case Type:</strong> {caseDetails.caseType || caseDetails.filecasetype}
                  </p>
                  <p className="card-text">
                    <strong>Case Status:</strong> {caseDetails.caseStatus || caseDetails.progress}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!loading && !caseDetails && (
            <div className="mt-4">
              <p>No case found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseTracking;
