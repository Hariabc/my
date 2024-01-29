// JudgeConference.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./JudgeConference.css";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid,Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Paper ,TableContainer, Table, TableHead, TableRow, TableCell,  TableBody} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { padding } from '@mui/system';



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

const [showForm, setShowForm] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateConferenceId, setUpdateConferenceId] = useState('');
  const [selectedConferenceDetails, setSelectedConferenceDetails] = useState(null);

  const handleCaseNumberClick = (conference) => {
    setSelectedConferenceDetails(conference);
  };

  const handleClosePopup = () => {
    setSelectedConferenceDetails(null);
  };


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
     setShowForm(true);
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
    setShowForm(false);
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
  
  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);

    // Reset form fields and update mode when toggling the form
    if (!showForm) {
      setCaseNumber('');
      setPlaintiffName('');
      setPlaintiffEmail('');
      setDefendantName('');
      setDefendantEmail('');
      setAdvocateName('');
      setTitle('');
      setDescription('');
      setDate('');

      setUpdateMode(false);
      setUpdateConferenceId('');
    }
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
       <Typography variant="h4" className="event-scheduler-title" style={{ textAlign: 'center' }}>
        PRE-TRAIL CONFERENCES
      </Typography>
      <br></br>
      <Button
        variant="contained"
        color="primary"
        className="schedule-conference-button"
        onClick={handleToggleForm}
        style={{ display: 'block', margin: 'auto', marginTop: '10px' }}
      >
        {showForm ? 'Back to Scheduled Conferences' : 'Schedule a Conference'}
      </Button>
      <br></br>
      
      {showForm ?(
      <Paper elevation={3} className="event-form-container" >
      <Typography variant="h5" className="event-form-title" style={{ textAlign: 'center' }}>
        <br></br>
        {updateMode ? 'UPDATE CONFERENCE ' : 'SCHEDULE A CONFERENCE'}
      </Typography>
      <br></br>

      <form onSubmit={handleSubmit} className="event-form" style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
      <TextField
      label="Case Number"
      variant="outlined"
      value={caseNumber}
      onChange={handleCaseNumberChange}
      required
      fullWidth
      error={!validCaseNumber}
      helperText={!validCaseNumber ? 'Invalid Case Number' : ''}
    />
    </Grid>

    <Grid item xs={12} sm={6}>
    <TextField
      label="Plantiff Name"
      variant="outlined"
      value={plaintiffName}
      onChange={(e) => setPlaintiffName(e.target.value)}
      required
      fullWidth
    />
    </Grid>

    <Grid item xs={12} sm={6}>
    <TextField
      label="Plantiff Email"
      variant="outlined"
      value={plaintiffEmail}
      onChange={(e) => setPlaintiffEmail(e.target.value)}
      required
      fullWidth
    />
    </Grid>

    <Grid item xs={12} sm={6}>
    <TextField
      label="Defendant Name"
      variant="outlined"
      value={defendantName}
      onChange={(e) => setDefendantName(e.target.value)}
      required
      fullWidth
    />
    </Grid>
    
    <Grid item xs={12} sm={6}>
    <TextField
      label="Defendant Email"
      variant="outlined"
      value={defendantEmail}
      onChange={(e) => setDefendantEmail(e.target.value)}
      required
      fullWidth
    />
    </Grid>

    <Grid item xs={12} sm={6}>
    <TextField
      label="Advocate Name"
      variant="outlined"
      value={advocateName}
      onChange={(e) => setAdvocateName(e.target.value)}
      required
      fullWidth
    />
    </Grid>
        
    <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Grid>
      
      
        
          <Grid item xs={12}  style={{ display: 'flex', justifyContent: 'center', marginTop:'50px' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{marginBottom:'30px'}}
          >
            {updateMode ? 'Update Conference' : 'Schedule Conference'}
          </Button>
      {updateMode && (
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          style={{ marginLeft: '20px',paddingRight:'40px',paddingLeft:'40px', height:'37px' }}
          onClick={handleCancelUpdate}
        >
          Cancel Update
        </Button>
      )}
    </Grid>
  </Grid>
</form>
        </Paper>
      
      ):(

        <Paper elevation={3} className='event-list-container' style={{ width: '90%', margin: 'auto',marginTop:'40px' }}>
        <Typography variant='h5' className='event-list-title' style={{ textAlign: 'center' }}></Typography>
        {conferences.length === 0 ? (
          <p>No Conferences are available.</p>
        ) : (
          <TableContainer component={Paper} style={{ width: '100%', margin: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ color:'white',backgroundColor: '#003366', fontWeight: 'bold' ,fontSize:'15px'}}>S.NO</TableCell>
                  <TableCell align="center" style={{ color:'white',backgroundColor: '#003366', fontWeight: 'bold' ,fontSize:'15px'}}>CASE NUMBER</TableCell>
                  <TableCell align="center" style={{ color:'white',backgroundColor: '#003366', fontWeight: 'bold',fontSize:'15px' }}>MEETING ID</TableCell>
                  <TableCell align="center" style={{ color:'white',backgroundColor: '#003366' , fontWeight: 'bold',fontSize:'15px'}}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {conferences.map((conference, index) => (
                  <TableRow key={conference._id}>
                    <TableCell align="center" style={{fontSize:'15px'}}>{index + 1}</TableCell>
                    <TableCell align="center" style={{fontSize:'50px'}}>
                      <Button
                        type='button'
                        color='primary'
                        style={{fontSize:'15px'}}
                        onClick={() => handleCaseNumberClick(conference)}
                      >
                        {conference.caseNumber}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        {conference.meetingID}
                      </Typography>
                    </TableCell>
                      <TableCell align="center">
                      <Button
                        type='button'
                        variant='contained'
                        color='primary'
                        className='event-list-join-button'
                        onClick={() => handleJoinClick(conference.meetingID)}
                      >
                        Join
                      </Button>
                      <Button
                        type='button'
                        variant='contained'
                        color='secondary'
                        className='event-list-update-button'
                        onClick={() => handleUpdateClick(conference._id)}
                        disabled={updateMode}
                        style={{ marginLeft: '40px' }}
                      >
                        Update
                      </Button>
                      <Button
                        type='button'
                        variant='contained'
                        color='error'
                        className='event-list-delete-button'
                        onClick={() => handleDelete(conference._id)}
                        style={{ marginLeft: '40px' }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {selectedConferenceDetails && (
          <Dialog open={true} onClose={handleClosePopup} maxWidth="xl">
            <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}><b>CONFERENCE DETAILS</b></DialogTitle>
            <DialogContent style={{ width: '900px' }}>
              {/* Render the details in a way that suits your UI */}
              <div style={{ lineHeight: '2', fontSize: '18px' }}>
              <p><strong>Case Number:</strong> {selectedConferenceDetails.caseNumber}</p>
            <p><strong>Plaintiff Name:</strong> {selectedConferenceDetails.plaintiffName}</p>
            <p><strong>Plaintiff Email:</strong> {selectedConferenceDetails.plaintiffEmail}</p>
            <p><strong>Defendant Name:</strong> {selectedConferenceDetails.defendantName}</p>
            <p><strong>Defendant Email:</strong> {selectedConferenceDetails.defendantEmail}</p>
            <p><strong>Advocate Name:</strong> {selectedConferenceDetails.advocateName}</p>
            <p><strong>Title:</strong> {selectedConferenceDetails.title}</p>
            <p><strong>Description:</strong> {selectedConferenceDetails.description}</p>
            <p><strong>Date:</strong> {selectedConferenceDetails.date}</p>
                {/* Add other details as needed */}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePopup} color='primary'>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Paper>
    )}
    </div>
  );
};

export default JudgeConference;