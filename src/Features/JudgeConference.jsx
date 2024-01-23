// JudgeConference.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./JudgeConference.css";
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const JudgeConference = () => {

  const navigate = useNavigate();

  const handleJoinClick = (meetingID) => {
    // Redirect to Home.js when the Join button is clicked
    navigate(`/homecon/${meetingID}`);
  };
  
  const [conferences, setConference] = useState([]);
  const [caseNumber, setCaseNumber] = useState('');
  const [plaintiffName, setPlaintiffName] = useState('');
  const [defendantName, setDefendantName] = useState('');
  const [advocateName, setAdvocateName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  // Add these lines with other state variables
const [plaintiffEmail, setPlaintiffEmail] = useState('');
const [defendantEmail, setDefendantEmail] = useState('');

 
  const [updateMode, setUpdateMode] = useState(false);
  const [updateConferenceId, setUpdateConferenceId] = useState('');

  useEffect(() => {
    const fetchScheduledConferences = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/my-conferences', {
          withCredentials: true,
        });
        console.log(response.data);
        setConference(response.data);
      } catch (error) {
        console.error('Error fetching scheduled conferences:', error);
      }
    };

    fetchScheduledConferences();
  }, []); // Empty dependency array to fetch conferences only once on mount
   

  const showCustomToast = (message, type = 'info') => {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  
  
const generateMeetingID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let meetingID = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    meetingID += characters.charAt(randomIndex);
  }
  return meetingID;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (updateMode) {
        // If in update mode, handle the update logic
        await handleUpdate();
      } else {
        // If not in update mode, show the confirmation dialog
        handleConfirmCreate();
      }
  
        
      // Add logic to handle success, e.g., update dashboard
    } catch (error) {
      console.error('Error handling conference:', error.message);
      // Add logic to handle errors
    }
  };

  const handleConfirmCreate = () => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to create the conference?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            // If the user clicks "Yes", proceed with creating the conference
            await handleCreateConference();
          },
        },
        {
          label: 'No',
          onClick: () => {
            // If the user clicks "No", do nothing
          },
        },
      ],
    });
  };

  const handleCreateConference = async () => {
    try {
      const generatedMeetingID = generateMeetingID();

      // If not in update mode, handle the create event logic
      const response = await axios.post(
        'http://localhost:5000/judge/create-conference',
        {
          caseNumber,
          plaintiffName,
          plaintiffEmail, // Add plaintiff email
          defendantName,
          defendantEmail,
          advocateName,
          title,
          description,
          date,
          meetingID: generatedMeetingID,
        },
        {
          withCredentials: true, // Ensure credentials are sent
        }
      );

      console.log('Conference created:', response.data);

      // Update the conferences list after scheduling a new conference
      setConference([...conferences, response.data]);

      // Reset form fields
      setCaseNumber('');
      setPlaintiffName('');
      setPlaintiffEmail(''); // Clear plaintiff email
    setDefendantName('');
    setDefendantEmail('');
      setAdvocateName('');
      setTitle('');
      setDescription('');
      setDate('');

      // Show a custom-styled pop-up for conference creation
      showCustomToast(`Conference Scheduled successfully! Meeting ID: ${generatedMeetingID}`, 'success');



    } catch (error) {
      console.error('Error creating conference:', error.message);
      // Add logic to handle errors
    }
  };

  const handleDelete = async (conferenceId) => {
    try {
     await axios.delete(`http://localhost:5000/judge/delete-conference/${conferenceId}`, {
        withCredentials: true,
      });
  
        // If the server returns a successful response, update the conferences list
        setConference(conferences.filter((conference) => conference._id !== conferenceId)
        );
        showCustomToast('Conference deleted successfully!', 'success');
      
      
    } catch (error) {
      console.error('Error deleting conference:', error);
      showCustomToast('Failed to delete conference', 'error');
    }
  };
  


  const handleUpdateClick =  (conferenceId) => {
    // If not already in update mode, set the form fields and update mode
    if (!updateMode) {
      const conferenceToUpdate = conferences.find((conference) => conference._id === conferenceId);
      setCaseNumber(conferenceToUpdate.caseNumber);
      setPlaintiffName(conferenceToUpdate.plaintiffName);
      setPlaintiffEmail(conferenceToUpdate.plaintiffEmail);
      setDefendantName(conferenceToUpdate.defendantName);
      setDefendantEmail(conferenceToUpdate.defendantEmail);
      setAdvocateName(conferenceToUpdate.advocateName);
      setTitle(conferenceToUpdate.title);
      setDescription(conferenceToUpdate.description);
      setDate(conferenceToUpdate.date);
    
  
      setUpdateMode(true);
      setUpdateConferenceId(conferenceId);
    }
  };

  const handleCancelUpdate = () => {
    setCaseNumber('');
    setPlaintiffName('');
    setPlaintiffEmail(''); // Clear plaintiff email
    setDefendantName('');
    setDefendantEmail('');
    setAdvocateName('');
    setTitle('');
    setDescription('');
    setDate('');
    
    setUpdateMode(false);
    setUpdateConferenceId('');
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/judge/update-conference/${updateConferenceId}`, {
        caseNumber,
          plaintiffName,
          plaintiffEmail,
          defendantName,
          defendantEmail,
          advocateName,
          title,
          description,
          date,
     } ,{
          withCredentials: true, // Ensure credentials are sent
        });

      setConference((prevConference) =>
        prevConference.map((conference) =>
          conference._id === updateConferenceId
            ? { ...conference,caseNumber,
              plaintiffName,
              plaintiffEmail,
              defendantName,
              defendantEmail,
              advocateName,
              title,
              description,
              date,
            }
            : conference
        )
      );
      
      setCaseNumber('');
      setPlaintiffName('');
      setPlaintiffEmail(''); // Clear plaintiff email
    setDefendantName('');
    setDefendantEmail('');
      setAdvocateName('');
      setTitle('');
      setDescription('');
      setDate('');
      
      setUpdateMode(false);
      setUpdateConferenceId('');
     
      // Show a custom-styled pop-up for event update
      showCustomToast('Conference updated successfully!', 'success');


    } catch (error) {
      console.error('Error updating conference:', error.message);
      // Add logic to handle errors
    }
  };

  
  const [validCaseNumber, setValidCaseNumber] = useState(true);
  const fetchCaseDetails = async (enteredCaseNumber) => {
    try {
      // Make a request to fetch case details based on the case number
      const response = await axios.get(`http://localhost:5000/judge/mycases`, {
        withCredentials: true,
      });
  
      // Check if the entered caseNumber exists in the response
      const caseDetails = response.data.find((caseDetail) => caseDetail.caseNumber === enteredCaseNumber);
  
      if (caseDetails) {
        const { fullName: plaintiffFullName, partyEmailAddresses: plaintiffEmail } = caseDetails.plaintiffDetails;
        const { fullName: defendantFullName, partyEmailAddresses: defendantEmail } = caseDetails.defendantDetails || { fullName: 'None', partyEmailAddresses: 'None' };
        const { fullName: advocateFullName } = caseDetails.advocateDetails || { fullName: 'None' };
  
        setPlaintiffName(plaintiffFullName);
        setPlaintiffEmail(plaintiffEmail);
        setDefendantName(defendantFullName);
        setDefendantEmail(defendantEmail);
        setAdvocateName(advocateFullName);
        setValidCaseNumber(true);
      } else {
        setPlaintiffName('');
        setPlaintiffEmail('');
        setDefendantName('');
        setDefendantEmail('');
        setAdvocateName('None');
        setValidCaseNumber(false);
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
    }
  };

  const handleCaseNumberChange = async (e) => {
    const enteredCaseNumber = e.target.value;
    setCaseNumber(enteredCaseNumber);

    // Fetch case details when the case number changes
    await fetchCaseDetails(enteredCaseNumber);
  };



  
  

  
 

  return (
    <div className='event-scheduler'>
      <ToastContainer
        position="top-center" // Set the position to top-center
        autoClose={2000} // Adjust duration
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2  className="event-scheduler-title">Pre-trial Conferences</h2>

      {/* Schedule a new conference */}
      <div className="event-container">
      <form onSubmit={handleSubmit} className="event-form">
      <div className="input-box">
      <label className={`event-form-label ${validCaseNumber ? '' : 'invalid-case-number'}`}>
            Case Number:
            <input
              type="text"
              value={caseNumber}
              onChange={handleCaseNumberChange}
              required
              className={`event-form-input ${validCaseNumber ? '' : 'invalid-input'}`}
            />
          </label>
            <br />
            <label className="event-form-label">
  Plaintiff Name:
  <input
    type="text"
    value={plaintiffName}
    onChange={(e) => setPlaintiffName(e.target.value)}
    required
    className="event-form-input"
    disabled
  />
</label>
<br />

<label className="event-form-label">
  Plaintiff Email:
  <input
    type="email"
    value={plaintiffEmail}
    onChange={(e) => setPlaintiffEmail(e.target.value)}
    required
    className="event-form-input"
    disabled
  />
</label>
<br />

<label className="event-form-label">
  Defendant Name:
  <input
    type="text"
    value={defendantName}
    onChange={(e) => setDefendantName(e.target.value)}
    required
    className="event-form-input"
    disabled
  />
</label>
<br />

<label className="event-form-label">
  Defendant Email:
  <input
    type="email"
    value={defendantEmail}
    onChange={(e) => setDefendantEmail(e.target.value)}
    required
    className="event-form-input"
    disabled
  />
</label>
<br />

<label className="event-form-label">
  Advocate Name:
  <input
    type="text"
    value={advocateName}
    onChange={(e) => setAdvocateName(e.target.value)}
    required
    className="event-form-input"
    disabled
  />
</label>
<br />
        
          <label className="event-form-label">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="event-form-input"
            />
          </label>
          <br />

          <label className="event-form-label">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="event-form-textarea"
            />
          </label>
          <br />

          <label className="event-form-label">
            Date:
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="event-form-input"
            />
          </label>
          <br />

          
          </div>
          <br />

          <button type="submit" className="event-form-submit-button">
            {updateMode ? 'Update Conference' : 'Schedule Conference'}
          </button>
          {updateMode && (
    <button type="button" className="event-form-cancel-update-button" onClick={handleCancelUpdate}>
      Cancel Update
    </button>
  )}

        </form>

        {/* Event List */}
        <div className="event-list-container">
          <h2 className="event-list-title">Conference Scheduled!!</h2>
          {conferences.length === 0 ? (
    <p>No Conferences are available.</p>
  ) : (
          <ul className="event-list">
            {conferences.map((conference) => (
              <li key={conference._id} className="event-list-item">
                <div className="event-details">
        <strong className="event-list-item-title">Case Number:</strong> {conference.caseNumber} <br />
        <strong className="event-list-item-title">Plaintiff Name:</strong> {conference.plaintiffName} <br />
        <strong className="event-list-item-title">Defendant Name:</strong> {conference.defendantName} <br />
        <strong className="event-list-item-title">Advocate Name:</strong> {conference.advocateName} <br />
        <strong className="event-list-item-title">Title:</strong> {conference.title} <br />
        <strong className="event-list-item-title">Description:</strong> {conference.description} <br />
        <strong className="event-list-item-title">Date:</strong> {conference.date} <br />
        <strong className="event-list-item-title">Meeting ID:</strong> {conference.meetingID} <br />
      </div>
                <div className="event-buttons">
                <button
                    type="button"
                    onClick={() => handleJoinClick(conference.meetingID)}
                    className="event-list-join-button"
                  >
                    Join
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateClick(conference._id)}
                    className="event-list-update-button"
                    disabled={updateMode}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(conference._id)}
                    className="event-list-delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
  )}
        </div>
      </div>
    </div>
  );
};

export default JudgeConference;
