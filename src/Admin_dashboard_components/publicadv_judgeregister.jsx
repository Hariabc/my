import React, { useState } from 'react';
import './Addreg.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Button, Paper, Typography } from '@mui/material';

export default function AddUsers() {
  const [showJudgesForm, setShowJudgesForm] = useState(false);
  const [showLawyersForm, setShowLawyersForm] = useState(false);

  const handleJudgesClick = () => {
    setShowJudgesForm(true);
    setShowLawyersForm(false);
  };

  const handleLawyersClick = () => {
    setShowJudgesForm(false);
    setShowLawyersForm(true);
  };

  const practiceAreas = [
    "Civil Law", "Criminal Law", "Family Law", "Corporate Law", "Tax Law",
    "Intellectual Property Law", "Environmental Law", "Human Rights Law", "International Law", "Other"
  ];
  const educationQualifications = [
    "Bachelor of Laws (LL.B.)", "Master of Laws (LL.M.)", "Doctor of Juridical Science (J.S.D.)", "Other"
  ];
  const barAssociations = [
    "Bar Council of India", "State Bar Council", "High Court Bar Association",
    "Supreme Court Bar Association", "Other"
  ];
  const jurisdictions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep",
    "Puducherry", "Other"
  ];
  const gender=["Male","Female","Others"]
  

  return (
    <div className="center-container">
      {!(showJudgesForm || showLawyersForm) && (
        <Paper elevation={10} className="add-users-box" style={{ width: '1300px', height: '200px', padding: '20px' }}>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            Click on one of those options to proceed
          </Typography>
          <br />
          <Grid container justify="center" spacing={10} className="add-users-container">
            <Grid item>
              <Button variant="contained" color="primary" size="large" onClick={handleJudgesClick}>
                Add Judges
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" size="large" onClick={handleLawyersClick}>
                Add Public Advocates
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      <div className="forms">
        {showJudgesForm && <JudgesForm />}
        {showLawyersForm && <LawyersForm />}
      </div>
    </div>
  );
}
function LawyersForm() {
    const [formData, setFormData] = useState({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      licenseNumber: '',
      educationQualifications: '',
      jurisdiction: '',
      barAssociation: '',
      yearsOfPractice: '',
      practiceArea: '',
      courtAdminId: '',
      isPrivateAdvocate: false,
      isAppointedByCourtAdmin: true,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const practiceAreas = [
      "Civil Law", "Criminal Law", "Family Law", "Corporate Law", "Tax Law",
      "Intellectual Property Law", "Environmental Law", "Human Rights Law", "International Law", "Other"
    ];
    const educationQualifications = [
      "Bachelor of Laws (LL.B.)", "Master of Laws (LL.M.)", "Doctor of Juridical Science (J.S.D.)", "Other"
    ];
    const barAssociations = [
      "Bar Council of India", "State Bar Council", "High Court Bar Association",
      "Supreme Court Bar Association", "Other"
    ];
    const jurisdictions = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
      "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
      "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep",
      "Puducherry", "Other"
    ];
    const gender=["Male","Female","Others"]

    const inputStyle = {
      marginBottom: '15px',
      padding: '10px',
      width: '100%',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '5px',
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Send form data to the backend endpoint
        const response = await axios.post('http://localhost:5000/advocate/public/register', formData);
        const { username} = formData;
      const userResponse = await axios.post('https://api-049FF9C5-DFDC-4991-B147-D2FDFDC72C54.sendbird.com/v3/users', {
          user_id: username,
          nickname: username,
          profile_url: 'https://example.com/profile-image.jpg'
        },{headers: {
          'Content-Type': 'application/json',
          'Api-Token': '2ef385818c2c2b64c09437dfbf7f5166c539d8f9',
        },}
        );
        console.log('User Response:', userResponse.data)
        // Handle success: show a success message, reset form, etc.
        console.log('Public advocate registered:', response.data);
        toast.success('Public advocate registered successfully!', { position: toast.POSITION.TOP_CENTER });
  
        // Reset the form fields
        setFormData({
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          gender: '',
          licenseNumber: '',
          educationQualifications: '',
          jurisdiction: '',
          barAssociation: '',
          yearsOfPractice: '',
          practiceArea: '',
          courtAdminId: '',
          isPrivateAdvocate: false,
          isAppointedByCourtAdmin: true,
        });
      } catch (error) {
        // Handle error: show error message, log the error, etc.
        toast.error('Failed to register public advocate. Please try again.', { position: toast.POSITION.TOP_CENTER });
        // alert('Failed to register public advocate. Please try again.');
      }
    };
  
    return (
      
      <div className="lawyers-form" style={{ maxWidth: '100%', marginTop: '30px', padding: '90px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <ToastContainer />
        <br></br>
        <br></br>

        <h1 style={{ marginTop: "90px" }}>
          PUBLIC ADVOCATE REGISTRATION
        </h1>
        
        <form className="lawyers-form-container" onSubmit={handleSubmit}>
          {/* Form fields and labels */}
          
          <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
            style={inputStyle}
          />
        </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              style={inputStyle}
            />
          </div>
          
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-input"
            style={inputStyle}
          />
        </div>
        <div className="form-group">
  <label htmlFor="gender" className="form-label">
    Gender:
  </label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="form-select"
    style={inputStyle}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>
        <div className="form-group">
          <label htmlFor="licenseNumber" className="form-label">
            License Number:
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="form-input"
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="educationQualifications" className="form-label">
            Education:
          </label>
          <select
            name="educationQualifications"
            value={formData.educationQualifications}
            onChange={handleChange}
            className="form-select"
            style={inputStyle}
          >
            <option value="">Select Education</option>
            {educationQualifications.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="jurisdiction" className="form-label">
            Jurisdiction:
          </label>
          <select
            name="jurisdiction"
            value={formData.jurisdiction}
            onChange={handleChange}
            className="form-select"
            style={inputStyle}
          >
            <option value="">Select Jurisdiction</option>
            {jurisdictions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="barAssociation" className="form-label">
            Bar Association:
          </label>
          <select
            name="barAssociation"
            value={formData.barAssociation}
            onChange={handleChange}
            className="form-select"
            style={inputStyle}
          >
            <option value="">Select Bar Association</option>
            {barAssociations.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="yearsOfPractice" className="form-label">
            Years of Practice:
          </label>
          <input
            type="number"
            name="yearsOfPractice"
            value={formData.yearsOfPractice}
            onChange={handleChange}
            className="form-input"
            style={inputStyle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="practiceArea" className="form-label">
            Practice Area:
          </label>
          <select
            name="practiceArea"
            value={formData.practiceArea}
            onChange={handleChange}
            className="form-select"
            style={inputStyle}
          >
            <option value="">Select Practice Area</option>
            {practiceAreas.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="courtAdminId" className="form-label">
            Court Admin ID:
          </label>
          <input
            type="text"
            name="courtAdminId"
            value={formData.courtAdminId}
            onChange={handleChange}
            className="form-input"
            style={inputStyle}
          />
        </div>
          <button type="submit" className="submit-button" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit
          </button>
        </form>
      </div>
    );
  }
  
  


function JudgesForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username:'',
    gender: '',
    education: '',
    courtAdminId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/judge/register', formData);
      console.log('Response:', response);
      const { username} = formData;
      const userResponse = await axios.post('https://api-049FF9C5-DFDC-4991-B147-D2FDFDC72C54.sendbird.com/v3/users', {
          user_id: username,
          nickname: username,
          profile_url: 'https://example.com/profile-image.jpg'
        },{headers: {
          'Content-Type': 'application/json',
          'Api-Token': '2ef385818c2c2b64c09437dfbf7f5166c539d8f9',
        },}
        );
        console.log('User Response:', userResponse.data)
      if (response && response.data) {
        console.log('Judge registered:', response.data);
        toast.success('Judge registered successfully');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          username:'',
          gender: '',
          education: '',
          courtAdminId: '',
        });
        // Handle success - show a success message or redirect to another page
      } else {
        console.error('Unexpected response:', response);
        // Handle unexpected response format or status
      }
    } catch (error) {
      console.error('Error registering judge:', error.response ? error.response.data : error.message);
      toast.error('Error registering judge');
      // Handle error - show an error message or alert
    }
  };
  
  

  return (
      <div className="judges-form">
          <ToastContainer/>
      <h2 style={{ marginBottom: "0", paddingBottom: "0" }}>
        JUDGE REGISTRATION FORM
      </h2>
      <br></br>
      <form className="judges-form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
              </div>
              <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
  <label htmlFor="gender" className="form-label">
    Gender:
  </label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="form-select"
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

        <div className="form-group">
          <label htmlFor="education" className="form-label">
            Education:
          </label>
          <input
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="form-input"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="courtAdminId" className="form-label">
            Court Admin ID:
          </label>
          <input
            type="text"
            name="courtAdminId"
            value={formData.courtAdminId}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}