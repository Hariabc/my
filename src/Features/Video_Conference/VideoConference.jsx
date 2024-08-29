import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Videoconference.css'; // Import your CSS file for styling

function Videoconference() {
  const [conferences, setConferences] = useState([]);
  const navigate = useNavigate();

  const handleJoinClick = (meetingID) => {
    // Redirect to Home.js when the Join button is clicked
    navigate(`/homecon/${meetingID}`);
  };

  useEffect(() => {
    // Fetch conferences for the specified client when the component mounts
    const fetchConferences = async () => {
      try {
        // Use Axios to make the GET request with the clientId in the URL
        const response = await axios.get(`http://localhost:5000/client/scheduledConferences`, {
          withCredentials: true,
        });
        const data = response.data;

        setConferences(data.scheduledConferences);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConferences();
  }, []); // Trigger the fetch when clientId changes

  return (
    <div className="video-conference-container">
      <h2 className='conference-heading'>SCHEDULED - CONFERENCES</h2>
      {conferences.length === 0 ? (
        <p>No scheduled conferences at the moment.</p>
      ) : (
        conferences.map(conference => (
          <div key={conference._id} className="conference-details">
            <div className="detail-group">
              <p>Case Number: {conference.caseNumber}</p>
              <p>Plaintiff: {conference.plaintiffName}</p>
              <p>Defendant: {conference.defendantName}</p>
            </div>
            <div className="detail-group">
              <p>Title: {conference.title}</p>
              <p> Desciption : {conference.description}</p>
              <p>Date: {new Date(conference.date).toLocaleString()}</p>
              <p><b>Meeting ID : {conference.meetingID}</b></p>
              <p>Hearing Mode: {conference.hearingMode}</p>
              <p>Status: {conference.hearingStatus}</p>
            </div>
            <button type="button" onClick={() => handleJoinClick(conference._id)} className="join-button">Join Conference</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Videoconference;
