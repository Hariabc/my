import React, { useState } from 'react';
import Dropdown from './test';
import DocumentsForm from './documents';
const CaseDetailsForm = () => {
    const [caseDetailsFormData, setCaseDetailsFormData] = useState({
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
    });
  
    const [isCaseDetailsFormSubmitted, setCaseDetailsFormSubmitted] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCaseDetailsFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleCourtSelect = (selectedCourtDetails) => {
      setCaseDetailsFormData((prevData) => ({
        ...prevData,
        ...selectedCourtDetails
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Case details submitted:', caseDetailsFormData);
      // You may want to redirect or show a success message after the form is submitted
      setCaseDetailsFormSubmitted(true);
    };
  
  
    return (
      <div className="case-details-form">
        <h2 className="form-section-title">Case Details</h2>
        {isCaseDetailsFormSubmitted ? (
          // Render defendant form if plaintiff form is submitted
          <DocumentsForm />
        ) : (
          // Render plaintiff form if it's not submitted
          <form onSubmit={handleSubmit} className="form-grid">
            {/* Case Details Fields */}
            <div className="case-details-section">
              <h3 className="section-title"> Case Details </h3>
              <div className='grid-half'>
                <label className="form-label">
                  Case Type:
                  <select
                    name="caseType"
                    value={caseDetailsFormData.caseType}
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
                    value={caseDetailsFormData.title}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Summary of the Case:
                  <textarea
                    name="caseSummary"
                    value={caseDetailsFormData.caseSummary}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Cause of Action:
                  <input
                    type="text"
                    name="causeOfAction"
                    value={caseDetailsFormData.causeOfAction}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Relief Sought:
                  <input
                    type="text"
                    name="reliefSought"
                    value={caseDetailsFormData.reliefSought}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Date of Cause of Action:
                  <input
                    type="date"
                    name="dateOfCauseOfAction"
                    value={caseDetailsFormData.dateOfCauseOfAction}
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
                <label className="form-label">
                  State:
                  <input
                    type="text"
                    name="state"
                    value={CaseDetailsForm.state}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  District:
                  <input
                    type="text"
                    name="district"
                    value={CaseDetailsForm.district}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Taluka:
                  <input
                    type="text"
                    name="taluka"
                    value={CaseDetailsForm.taluka}
                    onChange={handleChange}
                    className="form-input"
                  />
                </label>
                <label className="form-label">
                  Village:
                  <input
                    type="text"
                    name="village"
                    value={CaseDetailsForm.village}
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
        )}
      </div>
    );
};
  
export default CaseDetailsForm;