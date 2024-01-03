// JudgeConference.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./JudgeConference.css";
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JudgeConference = () => {

  const navigate = useNavigate();

  const handleJoinClick = () => {
    // Redirect to Home.js when the Join button is clicked
    navigate('/homecon');
  };
  
  const [conferences, setConference] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
 
  const [updateMode, setUpdateMode] = useState(false);
  const [updateConferenceId, setUpdateConferenceId] = useState('');

  useEffect(() => {
    const fetchScheduledConferences = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/conferences');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (updateMode) {
        // If in update mode, handle the update logic
        await handleUpdate();
      } else {
        // If not in update mode, handle the create event logic
        const response = await axios.post('http://localhost:3002/api/conferences', {
          title,
          description,
          date,
          
        });
  
        console.log('Conference created:', response.data);
  
        // Update the events list after scheduling a new event
        setConference([...conferences, response.data]);
  
        // Reset form fields
        setTitle('');
        setDescription('');
        setDate('');
        
         // Show a custom-styled pop-up for event creation
         showCustomToast('Conference Scheduled successfully!', 'success');
    }
        
      
  
      // Add logic to handle success, e.g., update dashboard
    } catch (error) {
      console.error('Error handling conference:', error.message);
      // Add logic to handle errors
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/conferences/${id}`);
      setConference(
        conferences.filter((conference) => conference._id !== id)
      );
    } catch (error) {
      console.error('Error deleting conference:', error);
    }
  };


  const handleUpdateClick =  (id) => {
    // If not already in update mode, set the form fields and update mode
    if (!updateMode) {
      const conferenceToUpdate = conferences.find((conference) => conference._id === id);
  
      setTitle(conferenceToUpdate.title);
      setDescription(conferenceToUpdate.description);
      setDate(conferenceToUpdate.date);
    
  
      setUpdateMode(true);
      setUpdateConferenceId(id);
    }
  };

  const handleCancelUpdate = () => {
    setTitle('');
    setDescription('');
    setDate('');
    
    setUpdateMode(false);
    setUpdateConferenceId('');
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3002/api/conferences/${updateConferenceId}`, {
        title,
        description,
        date,
        
      });

      setConference((prevConference) =>
        prevConference.map((conference) =>
          conference._id === updateConferenceId
            ? { ...conference, title, description, date
            
            
            
            
            
            
            
            
            
            
            }
            : conference
        )
      );

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
                  <strong className="event-list-item-title">{conference.title}</strong> -{' '}
                  <span className="event-list-item-description">{conference.description}</span> -{' '}
                  <span className="event-list-item-date">{conference.date}</span>
                </div>
                <div className="event-buttons">
                <button
                    type="button"
                    onClick={() => handleJoinClick(conference._id)}
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
