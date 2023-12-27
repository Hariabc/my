import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import './JudgeConference.css';

const JudgeConference = () => {
  const [scheduledConferences, setScheduledConferences] = useState([]);
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const fetchScheduledConferences = async () => {
    // Replace with your actual data fetching function
    const conferences = await fetchConferences();
    setScheduledConferences(conferences);
  };

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${roomCode}`);
  };

  const joinConference = (conferenceDetails) => {
    navigate(`/enter-passcode/${conferenceDetails.passcode}`);
  };

  const scheduleConference = async () => {
    // Replace with your actual API call for scheduling a conference
    const response = await scheduleConferenceApi();
    if (response.success) {
      // If the conference is scheduled successfully, refresh the conference list
      fetchScheduledConferences();
    } else {
      // Handle scheduling failure, show an error message or take appropriate action
    }
  };

  useEffect(() => {
    fetchScheduledConferences();
  }, []);

  const meeting = async (element) => {
    const appID = 326790568;
    const serverSecret = "ad581563225a754f4e531ef7ae18ff1b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomCode,
      Date.now().toString(),
      "Venu"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  return (
    <div className="judge-conference-container">
      <h2>Schedule or Join a Conference</h2>

      <form onSubmit={submitCode} className="conference-form">
        <label>Enter Room Code</label>
        <input
          type="text"
          required
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button type="submit">Join Conference</button>
      </form>

      <div className="scheduled-conferences">
        <h2>Scheduled Conferences</h2>
        {scheduledConferences.length === 0 ? (
          <p>No scheduled conferences available at the moment. Schedule one now!</p>
        ) : (
          <ul>
            {scheduledConferences.map((conference) => (
              <li key={conference.id}>
                Conference ID: {conference.id} | Passcode: {conference.passcode}
                <button onClick={() => joinConference(conference)}>Join Conference</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="schedule-conference">
        <h2>Schedule a Conference</h2>
        <button onClick={scheduleConference}>Schedule Conference</button>
      </div>

      <div ref={meeting} className="video-container"></div>
    </div>
  );
};

export default JudgeConference;
