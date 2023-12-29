import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoConference = () => {
  const { meetingId } = useParams();
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [passcode, setPasscode] = useState('');
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchMeetingInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/meetings/get-meeting/${meetingId}`);
        const meeting = await response.json();
        setMeetingInfo(meeting);
      } catch (error) {
        console.error('Error fetching meeting info:', error);
      }
    };

    fetchMeetingInfo();
  }, [meetingId]);

  const handleJoinMeeting = () => {
    // Validate passcode, make API call for authentication if needed
    if (passcodeIsValid()) {
      // Use the Zego SDK to join the meeting
      const appID = 326790568; // Replace with your app ID
      const serverSecret = 'ad581563225a754f4e531ef7ae18ff1b'; // Replace with your server secret
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        meetingId,
        Date.now().toString(),
        'Name'
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: document.getElementById('meeting-container'),
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });

      setJoining(true);
    } else {
      alert('Invalid passcode. Please try again.');
    }
  };

  const passcodeIsValid = () => {
    // Implement your passcode validation logic here
    // For simplicity, assume the passcode is valid
    return true;
  };

  return (
    <div>
      <h2>Video Conference Room</h2>
      {meetingInfo ? (
        <>
          <div>
            <strong>Date:</strong> {meetingInfo.date} <br />
            <strong>Time:</strong> {meetingInfo.time} <br />
            <strong>Location:</strong> {meetingInfo.location} <br />
            <strong>Case Number:</strong> {meetingInfo.caseNumber} <br />
            <strong>Meeting ID:</strong> {meetingInfo.meetingId} <br />
          </div>
          {joining ? (
            <div id="meeting-container" style={{ width: '100vw', height: '100vh' }}></div>
          ) : (
            <>
              <label>
                Enter Passcode:
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                />
              </label>
              <br />
              <button onClick={handleJoinMeeting}>Join Conference</button>
            </>
          )}
        </>
      ) : (
        <p>No meeting scheduled. Please check back later.</p>
      )}
    </div>
  );
};

export default VideoConference;
