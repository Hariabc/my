import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homeCon.css";

const HomeCon = () => {
  const [meetingID, setMeetingID] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();

    // Validate meetingID: Should be 8 characters, only alphabets (capital) and numbers
    const isValidMeetingID = /^[A-Z0-9]{8}$/.test(meetingID);

    if (isValidMeetingID) {
      navigate(`/room/${meetingID}`);
    } else {
      // Handle validation error (e.g., show an error message)
      console.error("Invalid Meeting ID. It should be 8 characters of only alphabets (capital) and numbers.");
    }
  };

  return (
    <div className="home-con-container">
      <div className="hero-section">
        <div className="overlay-V"></div>
        <div className="hero-content">
          <div className="main-info">
            <h1 className="main-title">Welcome To Pre-Trial Conference</h1>
            <p className="subtitle">By E-Courts Services</p>
          </div>

          <form onSubmit={submitCode} className="enter-code-form">
          <div className="code-input">
            <label className="code-label">Enter Meeting ID</label>
            <input
              type="text"
              required
              placeholder="Enter Meeting ID"
              value={meetingID}
              onChange={(e) => setMeetingID(e.target.value)}
              pattern="^[A-Z0-9]{8}$"
              title="Meeting ID should be 8 characters of only capital alphabets and numbers."
              className="code-input-field"
            />
          </div>
            
            <button
              type="submit"
              className="submit-button"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeCon;
