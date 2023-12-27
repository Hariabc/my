import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import './VideoConference.css';

const VideoConference = () => {
  const [scheduledConferences, setScheduledConferences] = useState([]);
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const fetchScheduledConferences = async () => {
    // Replace with your actual data fetching function
    const conferences = await fetchData();
    setScheduledConferences(conferences);
  };

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${roomCode}`);
  };

  const joinConference = (conferenceDetails) => {
    navigate(`/enter-passcode/${conferenceDetails.passcode}`);
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
    <div>
      <div className="video-conference-container">
        <div className="video-conference-header">
          <h1 className="video-conference-title">Video Chat App</h1>
          <p className="video-conference-subtitle">With ZegoCloud</p>
        </div>

        <form onSubmit={submitCode} className="video-conference-form">
          <label className="form-label">Enter Room Code</label>
          <input
            type="text"
            required
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-button">
            Go
          </button>
        </form>
      </div>

      {scheduledConferences.length === 0 ? (
        <div className="message-container">
          <p>No scheduled conferences available at the moment. Please check back later.</p>
        </div>
      ) : (
        <>
          <h1 className="welcome-message">Welcome to Video Conference!</h1>
          <div className="conference-details-container">
            {scheduledConferences.map((conference) => (
              <div key={conference.id} className="conference-details">
                <p>Conference ID: {conference.id}</p>
                <p>Passcode: {conference.passcode}</p>
                <button onClick={() => joinConference(conference)} className="join-button">
                  Join Conference
                </button>
              </div>
            ))}
          </div>
          <div ref={meeting} className="video-container"></div>
        </>
      )}
    </div>
  );
};

export default VideoConference;
