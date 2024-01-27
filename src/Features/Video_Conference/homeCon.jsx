
// // homeCon.jsx

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import "./homeCon.css";

// const HomeCon = () => {
//   const [meetingID, setMeetingID] = useState("");
//   const [scheduledMeetingID, setScheduledMeetingID] = useState("");
//   const navigate = useNavigate();
//   const { conferenceId } = useParams();

//   useEffect(() => {
//     const fetchScheduledMeetingID = async () => {
//       try {
//         // Assuming there is an API endpoint to fetch the scheduled meeting ID
//         const response = await axios.get(`http://localhost:5000/judge/scheduled-meeting/${conferenceId}`, {
//           withCredentials: true,
//         });
//         setScheduledMeetingID(response.data?.scheduledMeetingID || ""); // Handle the case where response.data or response.data.scheduledMeetingID may be undefined
//       } catch (error) {
//         console.error("Error fetching scheduled meeting ID:", error);
//       }
//     };
  
//     fetchScheduledMeetingID();
//   }, [conferenceId]);

//   const submitCode = (e) => {
//     e.preventDefault();

//     // Validate meetingID
//     const isValidMeetingID = /^[A-Z0-9]{8}$/.test(meetingID);

//     if (isValidMeetingID && meetingID === scheduledMeetingID) {
//       navigate(`/room/${meetingID}`);
//     } else {
//       // Handle validation error or mismatched meeting ID
//       console.error("Invalid Meeting ID or mismatched with the scheduled meeting ID.");
//     }
//   };

//   return (
//     <div className="home-con-container">
//       <div className="hero-section">
//       <div className="overlay-V"></div>
//         <div className="hero-content">
//           <div className="main-info">
//             <h1 className="main-title">Welcome To Pre-Trial Conference</h1>
//             <p className="subtitle">By E-Courts Services</p>
//           </div>
//         <form onSubmit={submitCode} className="enter-code-form">
//           <div className="code-input">
//             <label className="code-label">Enter Meeting ID</label>
//             <input
//               type="text"
//               required
//               placeholder="Enter Meeting ID"
//               value={meetingID}
//               onChange={(e) => setMeetingID(e.target.value)}
//               pattern="^[A-Z0-9]{8}$"
//               title="Meeting ID should be 8 characters of only capital alphabets and numbers."
//               className="code-input-field"
//             />
//           </div>
//           <button type="submit" className="submit-button">
//             Go
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };


// export default HomeCon;
