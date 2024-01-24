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
      setLoading(true);
      console.log('Selected State:', selectedCourt.courtState);
      console.log('Selected District:', selectedCourt.courtDistrict);
      console.log('Selected Court:', selectedCourt.courtName);
      console.log('Tracking Option:', trackingOption);
      console.log('Search Value:', searchValue);

      setCaseDetails(null);

      const response = await axios.post('http://localhost:5000/client/case-tracking', {
        courtState: selectedCourt.courtState,
        courtDistrict: selectedCourt.courtDistrict,
        courtName: selectedCourt.courtName,
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
    <div className="unique-container mt-5">
      <div className="unique-card">
        <div className="unique-card-body">
          <div className="unique-heading-container">
            <h2 className="unique-card-title"><b>CASE TRACKING</b></h2>
          </div>
  
          <div className="unique-btn-group" role="group" aria-label="Tracking Options">
            <button
              type="button"
              className={`unique-btn unique-btn-outline-primary ${trackingOption === 'cnr' ? 'unique-active' : ''}`}
              onClick={() => handleSearchOptionClick('cnr')}
            >
              CNR Number
            </button>
          </div>
  
          {trackingOption && (
            <div className="unique-mt-3">
              <Dropdown onSelectCourt={handleCourtSelect} />
              <br></br>
              <div className="unique-input-group">
                <input
                  type="text"
                  className="unique-form-control small-input"  // Add small-input class for reduced size
                  placeholder={`Enter ${trackingOption === 'cnr' ? 'CNR' : ''}`}
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </div>
  
              <div className="unique-mt-3 text-center"> {/* Use text-center class for center alignment */}
                <button className="unique-btn unique-btn-primary small-button" type="button" onClick={handleSearch}>
                  Submit
                </button>
              </div>
            </div>
          )}
  
          {loading && <p>Loading...</p>}
  
          {!loading && caseDetails && (
            <div className="unique-mt-4">
              <h3 className="unique-mb-3">Case Details:</h3>
              <div className="unique-card">
                <div className="unique-card-body">
                  <p className="unique-card-text">
                    <strong>Case Number:</strong> {caseDetails.caseNumber}
                  </p>
                  <p className="unique-card-text">
                    <strong>Case Type:</strong> {caseDetails.caseType || caseDetails.filecasetype}
                  </p>
                  <p className="unique-card-text">
                    <strong>Case Status:</strong> {caseDetails.caseStatus || caseDetails.progress}
                  </p>
                </div>
              </div>
            </div>
          )}
  
          {!loading && !caseDetails && searchValue.trim() && (
            <div className="unique-mt-4">
              <p>No case found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  
  
  
  
};

export default CaseTracking;
