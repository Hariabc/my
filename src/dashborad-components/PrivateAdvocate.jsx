// PrivateAdvocate.js

import React, { useState } from 'react';
import AdvocateList from './AdvoacateList';


import './privateadvocate.css';


const PrivateAdvocate = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    caste: '',
    age: '',
    relation: '',
    caseTitle: '',
    caseSummary: '',
    causeOfAction: '',
    reliefSought: '',
    partyNames: '',
    partyAddresses: '',
    partyPhoneNumbers: '',
    partyEmailAddresses: '',
    contracts: '',
    receipts: '',
    evidence: '',
    courtDivision: '',
    caseCategory: '',
    filingFee: '',
    pinCode: '',
    occupation: '',
    state:'',
    district:'',
    taluka:'',
    village:'',
  });
  
  const [isPlaintiffFormSubmitted, setIsPlaintiffFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission, e.g., sending data to a server
    console.log('Plaintiff Form submitted:', formData);
    // Update state to show the defendant form
    setIsPlaintiffFormSubmitted(true);
  };

  return (
    <div className="party-in-person-form">
      <h2 className="form-section-title">Party in Person Case Filing Form
      </h2> 
      {isPlaintiffFormSubmitted ? (
        // Render defendant form if plaintiff form is submitted
        <DefendantForm />
      ) : (
        // Render plaintiff form if it's not submitted
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Personal Information */}
        <div className="personal-details-section">
          <h3 className="section-title">Personal Details</h3>
          <div className="grid-half">
            <label className="form-label">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="form-label">
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
          <div className="grid-half">
            {/* Remove the Nationality field here */}
            <label className="form-label">
              Caste:
              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Caste</option>
                {/* Add caste options here */}
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label className="form-label">
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Relation:
              <select
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Relation</option>
                <option value="self">Self</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="wife">Wife</option>
                <option value="husband">Husband</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
        </div>
        {/* Contact Details */}
      <div className="contact-details-section">
        <h3 className="section-title">Contact Details</h3>
        <div className="grid-half">
          <label className="form-label">
            Email:
            <input
              type="email"
              name="partyEmailAddresses"
              value={formData.partyEmailAddresses}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Mobile No:
            <input
              type="tel"
              name="partyPhoneNumbers"
              value={formData.partyPhoneNumbers}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="grid-half">
          <label className="form-label">
            Address:
            <input
              type="text"
              name="partyAddresses"
              value={formData.partyAddresses}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Pin Code:
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label className="form-label">
            Occupation:
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>
      </div>

        {/* State Details */}
      <div className="state-details-section">
        <h3 className="section-title">State Details</h3>
        <div className="grid-half">
          <label className="form-label">
            State:
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select State</option>
              <option value="state1">State 1</option>
              <option value="state2">State 2</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label className="form-label">
            District:
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select District</option>
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              {/* Add more options as needed */}
            </select>
            </label>
        </div>
        <div className="grid-half">
          <label className="form-label">
            Taluka:
            <select
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Taluka</option>
              <option value="taluka1">Taluka 1</option>
              <option value="taluka2">Taluka 2</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <label className="form-label">
            Village:
            <select
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Village</option>
              <option value="village1">Village 1</option>
              <option value="village2">Village 2</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
      </div>

        {/* Submit Button */}
      <div className="submit-section">
        <button type="submit" className="submit-button">
          Submit Plaintiff Details
        </button>
      </div>
      </form>
      )}
    </div>
  );
};



const DefendantForm = () => {
  const [defendantFormData, setDefendantFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    caste: '',
    age: '',
    relation: '',
    partyEmailAddresses: '',
    partyPhoneNumbers: '',
    partyAddresses: '',
    pinCode: '',
    occupation: '',
    state: '',
    district: '',
    taluka: '',
    village: '',
  });
  
  const [isDefendantFormSubmitted, setDefendantFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDefendantFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle defendant form submission
    console.log('Defendant Form submitted:', defendantFormData);
    // You may want to redirect or show a success message after the form is submitted
    setDefendantFormSubmitted(true);
  };

  return (
    <div className="defendant-form">
      <h2 className="form-section-title">Defendant Details</h2>
      {isDefendantFormSubmitted ? (
        // Render defendant form if plaintiff form is submitted
        <CaseDetailsForm />
      ) : (
        // Render plaintiff form if it's not submitted
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Personal Information */}
        <div className="personal-details-section">
          <h3 className="section-title">Personal Details</h3>
          <div className="grid-half">
            <label className="form-label">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={defendantFormData.fullName}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Gender:
              <select
                name="gender"
                value={defendantFormData.gender}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="form-label">
              Date of Birth:
              <input
                type="date"
                name="dateOfBirth"
                value={defendantFormData.dateOfBirth}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
          <div className="grid-half">
            <label className="form-label">
              Caste:
              <select
                name="caste"
                value={defendantFormData.caste}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Caste</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label className="form-label">
              Age:
              <input
                type="number"
                name="age"
                value={defendantFormData.age}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Relation:
              <select
                name="relation"
                value={defendantFormData.relation}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Relation</option>
                <option value="self">Self</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="wife">Wife</option>
                <option value="husband">Husband</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
        </div>

        {/* Contact Details */}
        <div className="contact-details-section">
          <h3 className="section-title">Contact Details</h3>
          <div className="grid-half">
            <label className="form-label">
              Email:
              <input
                type="email"
                name="partyEmailAddresses"
                value={defendantFormData.partyEmailAddresses}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Mobile No:
              <input
                type="tel"
                name="partyPhoneNumbers"
                value={defendantFormData.partyPhoneNumbers}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
          <div className="grid-half">
            <label className="form-label">
              Address:
              <input
                type="text"
                name="partyAddresses"
                value={defendantFormData.partyAddresses}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Pin Code:
              <input
                type="text"
                name="pinCode"
                value={defendantFormData.pinCode}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Occupation:
              <input
                type="text"
                name="occupation"
                value={defendantFormData.occupation}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
        </div>

        {/* State Details */}
        <div className="state-details-section">
          <h3 className="section-title">State Details</h3>
          <div className="grid-half">
            <label className="form-label">
              State:
              <select
                name="state"
                value={defendantFormData.state}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select State</option>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label className="form-label">
              District:
              <select
                name="district"
                value={defendantFormData.district}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select District</option>
                <option value="district1">District 1</option>
                <option value="district2">District 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
          <div className="grid-half">
            <label className="form-label">
              Taluka:
              <select
                name="taluka"
                value={defendantFormData.taluka}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Taluka</option>
                <option value="taluka1">Taluka 1</option>
                <option value="taluka2">Taluka 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label className="form-label">
              Village:
              <select
                name="village"
                value={defendantFormData.village}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Village</option>
                <option value="village1">Village 1</option>
                <option value="village2">Village 2</option>
                {/* Add more options as needed */}
              </select>
            </label>
          </div>
        </div>

        {/* Submit Button for Defendant Form */}
        <div className="submit-section">
          <button type="submit" className="submit-button">
            Submit Defendant Details
          </button>
        </div>
      </form>
      )}
    </div>
  );
};

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
    courtType:'',
    courtName:'',
    caseCategory:'',
    filingFee:'',
  });

  const [isCaseDetailsFormSubmitted, setCaseDetailsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseDetailsFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Defendant Form submitted:', caseDetailsFormData);
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
              <div className="grid-half">
                {/* Court Details Fields */}
        <label className="form-label">
          Court Type:
          <select
            name="courtType"
            value={CaseDetailsForm.courtType}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Court Type</option>
            <option value="civil">Civil Court</option>
            <option value="criminal">Criminal Court</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label className="form-label">
          Court Name:
          <input
            type="text"
            name="courtName"
            value={CaseDetailsForm.courtName}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Case Category:
          <input
            type="text"
            name="caseCategory"
            value={CaseDetailsForm.caseCategory}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Filing Fee:
          <input
            type="text"
            name="filingFee"
            value={CaseDetailsForm.filingFee}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        </div>
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

const DocumentsForm = () => {
  const [documentsFormData, setDocumentsFormData] = useState({
    document1: null,
    document2: null,
    // Add more document fields as needed
  });

  const [isDocumentsFormSubmitted, setDocumentsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setDocumentsFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle document submission, e.g., send to server
    console.log('Documents submitted:', documentsFormData);
    // You may want to redirect or show a success message after submission
    setDocumentsFormSubmitted(true);
  };

  return (
    <div className="documents-form">
      <h2 className="form-section-title">Documents Uploading</h2>
      {isDocumentsFormSubmitted ? (
        // Render case details form if defendant form is submitted
        <ChooseAdvocate />
      ) : (
        // Render defendant form if it's not submitted

      <form onSubmit={handleSubmit} className="form-grid">
        <div className='documents-section'>
          <h3 className="section-title">Documents</h3>
          <div className='grid-half'>
        <label className="form-label">
          Upload Document 1:
          <input type="file" name="document1" onChange={handleChange} className="form-input" />
        </label>
        <label className="form-label">
          Upload Document 2:
          <input type="file" name="document2" onChange={handleChange} className="form-input" />
        </label>
        </div>
        </div>
        {/* Add more document upload fields as needed */}
        {/* Submit Button for Documents Form */}
        <div className="submit-section">
          <button type="submit" className="submit-button">
            Submit Documents
          </button>
        </div>
      </form>
      )}
    </div>
  );
};

const ChooseAdvocate = () => {
  const [chosenAdvocate, setChosenAdvocate] = useState(null);
  const [clientAdvocates, setClientAdvocates] = useState([]);
  const [isChooseAdvocateSubmitted, setChooseAdvocateSubmitted] = useState(false);

  const privateAdvocates = [
    { id: 1, name: 'John Doe', specialization: 'Family Law' },
    { id: 2, name: 'Jane Doe', specialization: 'Criminal Law' },
    // Add more private advocates as needed
  ];

  const handleChooseAdvocate = (advocate) => {
    setChosenAdvocate(advocate);
    setChooseAdvocateSubmitted(true);
  };

  const handleAddAdvocate = () => {
    setClientAdvocates((prevAdvocates) => [...prevAdvocates, chosenAdvocate]);
    setChosenAdvocate(null);
    setChooseAdvocateSubmitted(false);
  };

  const handleRemoveAdvocate = () => {
    setChosenAdvocate(null);
    setChooseAdvocateSubmitted(false);
  };

  const handleSendRequest = () => {
    // Implement logic to send request with selected advocates
    console.log('Sending request with advocates:', clientAdvocates);
  };

  return (
    <div className="chooseadvocate-form">
      <h2 className="form-section-title">Choosing Advocate</h2>

      {/* Use the new component */}
      <AdvocateList privateAdvocates={privateAdvocates} onChooseAdvocate={handleChooseAdvocate} />

      <div className="client-advocates-section">
        <h3 className="section-title">Your Advocates</h3>
        <ul>
          {clientAdvocates.map((advocate, index) => (
            <li key={index}>
              <p>Name: {advocate.name}</p>
              <p>Specialization: {advocate.specialization}</p>
              {/* Add more advocate details as needed */}
            </li>
          ))}
        </ul>
      </div>

      <div className="submit-section">
        {!chosenAdvocate ? (
          <button
            type="button"
            onClick={() => handleAddAdvocate(chosenAdvocate)}
            className="submit-button"
          >
            Add Advocate
          </button>
        ) : (
          <button type="button" onClick={handleRemoveAdvocate} className="submit-button">
            Remove Advocate
          </button>
        )}

        {clientAdvocates.length > 0 && (
          <button type="button" onClick={handleSendRequest} className="submit-button">
            Send Request
          </button>
        )}
      </div>
    </div>
  );
};

export default PrivateAdvocate;
