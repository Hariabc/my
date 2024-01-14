import React, { useState } from 'react';
import Dropdown from './Dropdown';
import StateDistrictSelector from './Dropdown2';
const CaseAndCourtDetailsForm = ({ onChange, onBack }) => {
  const [caseDetails, setCaseDetails] = useState({
    caseType: '',
    title: '',
    caseSummary: '',
    causeOfAction: '',
    reliefSought: '',
    dateOfCauseOfAction: '',
    state: '',
    district: '',
    taluka: '',
    village: '',
    courtType: '',
    courtState: '',
    courtDistrict: '',
    courtName: '',
    caseCategory: ''
    // Add other case details
  });
  const handleStateSelect = (selectedState) => {
    setCaseDetails({ ...caseDetails, state: selectedState });
  };

  const handleDistrictSelect = (selectedDistrict) => {
    setCaseDetails({ ...caseDetails, district: selectedDistrict });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseDetails({ ...caseDetails, [name]: value });
  };

  const handleNext = (e) => {
    // e.preventDefault();
    onChange(caseDetails);
    // onNext()
    console.log(caseDetails)
  };
  const handleCourtSelect = (selectedCourtDetails) => {
    setCaseDetails((prevData) => ({
      ...prevData,
      ...selectedCourtDetails
    }));
  };
  
  const handleBack = () => {
    onBack();
  };


    return (
      <div className="case-details-form">
        <h2 className="form-section-title">Case Details</h2>
        {/* {isCaseDetailsFormSubmitted ? (
          // Render defendant form if plaintiff form is submitted
        //   <DocumentsForm />
        // ) : ( */}
        {/* //   // Render plaintiff form if it's not submitted */}
          <form onSubmit={handleNext} className="form-grid">
            {/* Case Details Fields */}
            <div className="case-details-section">
              <h3 className="section-title"> Case Details </h3>
              <div className='grid-half'>
                <label className="form-label">
                  Case Type:
                  <select
                    name="caseType"
                    value={caseDetails.caseType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Case Type</option>
                    <option value="civil">Civil</option>
                    <option value="criminal">Criminal</option>
                    {/* Add more options as needed */}
                  </select>
                </label>
                <label className="form-label">
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={caseDetails.title}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Summary of the Case:
                  <textarea
                    name="caseSummary"
                    value={caseDetails.caseSummary}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Cause of Action:
                  <input
                    type="text"
                    name="causeOfAction"
                    value={caseDetails.causeOfAction}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Relief Sought:
                  <input
                    type="text"
                    name="reliefSought"
                    value={caseDetails.reliefSought}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Date of Cause of Action:
                  <input
                    type="date"
                    name="dateOfCauseOfAction"
                    value={caseDetails.dateOfCauseOfAction}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
              </div>
            </div>
            <div className="dispute-arising-out-of-section">
              <h3 className="section-title">Dispute Arising Out Of</h3>
              <div className="grid-half">
                {/* Dispute Arising Out Of Fields */}
                <StateDistrictSelector
            onSelectState={handleStateSelect}
            onSelectDistrict={handleDistrictSelect}
          />
                <label className="form-label">
                  Taluka:
                  <input
                    type="text"
                    name="taluka"
                    value={caseDetails.taluka}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Village:
                  <input
                    type="text"
                    name="village"
                    value={caseDetails.village}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
              </div>
            </div>
            <div className="court-details-section">
              <h3 className="section-title">Court Details</h3>
              <Dropdown onSelectCourt={handleCourtSelect} />
            </div>
            {/* Submit Button for Defendant Form */}
            <div className="submit-section">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        
      </div>
    );
};
  
export default CaseAndCourtDetailsForm;  