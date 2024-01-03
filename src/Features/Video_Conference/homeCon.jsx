import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homeCon.css";

const HomeCon = () => {
  const [RoomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${RoomCode}`);
  };

  return (
    <div className="home-con-container">
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <div className="main-info">
            <h1 className="main-title">Welcome To Pre-Trial Conference</h1>
            <p className="subtitle">By E-Courts Services</p>
          </div>

          <form onSubmit={submitCode} className="enter-code-form">
            <div className="code-input">
              <label className="code-label">Enter Room Code</label>
              <input
                type="text"
                required
                placeholder="Enter Room Code"
                value={RoomCode}
                onChange={(e) => setRoomCode(e.target.value)}
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
