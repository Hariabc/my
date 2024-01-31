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
        alert('Public advocate registered successfully!');
  
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
        console.error('Error registering public advocate:', error);
        // alert('Failed to register public advocate. Please try again.');
      }
    };
  
    return (
      <div className="lawyers-form">
        <br></br>
        <br></br>
        <h2 style={{ marginBottom: "0", paddingBottom: "0" }}>
          PUBLIC ADVOCATE REGISTRATION
        </h2>
        <form className="lawyers-form-container" onSubmit={handleSubmit}>
          {/* Form fields and labels */}
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
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
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
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
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
          <label htmlFor="licenseNumber" className="form-label">
            License Number:
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="educationQualifications" className="form-label">
            Education:
          </label>
          <input
            name="educationQualifications"
            value={formData.educationQualifications}
            onChange={handleChange}
            className="form-input"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="jurisdiction" className="form-label">
            Jurisdiction:
          </label>
          <input
            type="text"
            name="jurisdiction"
            value={formData.jurisdiction}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="barAssociation" className="form-label">
            Bar Association:
          </label>
          <input
            type="text"
            name="barAssociation"
            value={formData.barAssociation}
            onChange={handleChange}
            className="form-input"
          />
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="practiceArea" className="form-label">
            Practice Area:
          </label>
          <input
            type="text"
            name="practiceArea"
            value={formData.practiceArea}
            onChange={handleChange}
            className="form-input"
          />
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