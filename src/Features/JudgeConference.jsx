import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JudgeConference = () => {
  const [scheduledMeetings, setScheduledMeetings] = useState([]);
  const navigate = useNavigate();

  const [meetingDetails, setMeetingDetails] = useState({
    date: '',
    time: '',
    location: '',
    caseNumber: '',
    meetingId: '',
  });

  const joinMeeting = (meetingId) => {
    navigate(`/conference/${meetingId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const cancelMeeting = async (meetingId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/meetings/cancel-meeting/${meetingId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Update the state to reflect the canceled meeting
        setScheduledMeetings((prevMeetings) => prevMeetings.filter((meeting) => meeting._id !== meetingId));
      } else {
        const errorData = await response.json();
        console.error('Error canceling meeting:', errorData.message);
      }
    } catch (error) {
      console.error('Error canceling meeting:', error);
    }
  };

  const scheduleMeeting = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/meetings/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingDetails),
      });

      const newMeeting = await response.json();

      setScheduledMeetings([...scheduledMeetings, newMeeting]);

      setMeetingDetails({
        date: '',
        time: '',
        location: '',
        caseNumber: '',
        meetingId: '',
      });
      // Redirect to the VideoConference page with the meetingId
    navigate(`/pre-trial/${newMeeting.meetingId}`);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/meetings/get-meetings');
        const meetings = await response.json();

        setScheduledMeetings(meetings);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ccc', padding: '20px' }}>
        <h2>Schedule a Meeting</h2>
        <form>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={meetingDetails.date}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={meetingDetails.time}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={meetingDetails.location}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Case Number:
            <input
              type="text"
              name="caseNumber"
              value={meetingDetails.caseNumber}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Meeting ID:
            <input
              type="text"
              name="meetingId"
              value={meetingDetails.meetingId}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={scheduleMeeting}>
            Schedule Meeting
          </button>
        </form>
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Scheduled Meetings</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {scheduledMeetings.map((meeting) => (
            <div
              key={meeting.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                width: '200px',
              }}
            >
              
              <strong>Date:</strong> {meeting.date} <br />
              <strong>Time:</strong> {meeting.time} <br />
              <strong>Location:</strong> {meeting.location} <br />
              <strong>Case Number:</strong> {meeting.caseNumber} <br />
              <strong>Meeting ID:</strong> {meeting.meetingId} <br/>
              <br />
              <button
                style={{ backgroundColor: 'green', color: 'white' }}
                onClick={() => joinMeeting(meeting.meetingId)}
              >
                Join
              </button>
              <button style={{ backgroundColor: 'blue', color: 'white' }}>
                Update
              </button>
              <button
  style={{ backgroundColor: 'red', color: 'white' }}
  onClick={() => cancelMeeting(meeting.id)}
>
  Cancel
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JudgeConference;
