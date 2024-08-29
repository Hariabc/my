// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./VideoConference.css";
// import { useNavigate } from 'react-router-dom';

// const AdvocateConference = () => {
//   const navigate = useNavigate();

//   const handleJoinClick = () => {
//     // Redirect to Home.js when the Join button is clicked
//     navigate(`/homecon`);  // Assuming you need to pass the conference ID to the Home component
//   };

//   const [conferences, setConference] = useState([]);

//   useEffect(() => {
//     const fetchScheduledConferences = async () => {
//       try {
//         const response = await axios.get('http://localhost:3002/api/conferences');
//         setConference(response.data);
//       } catch (error) {
//         console.error('Error fetching scheduled conferences:', error);
//       }
//     };

//     fetchScheduledConferences();
//   }, []);

//   return (
//     <div className='video-conference-container'>
//       <h2 className="video-conference-title">Scheduled Conferences</h2>

//       {conferences.length === 0 ? (
//         <p>No conferences scheduled by the judge.</p>
//       ) : (
//         // Conference List with Join Button
//         <ul className="conference-list">
//           {conferences.map((conference) => (
//             <li key={conference._id} className="conference-list-item">
//               <div className="conference-details">
//                 <strong className="conference-title">{conference.title}</strong> -{' '}
//                 <span className="conference-description">{conference.description}</span> -{' '}
//                 <span className="conference-date">{conference.date}</span>
//               </div>
//               <div className="conference-buttons">
//                 <button
//                   type="button"
//                   onClick={() => handleJoinClick(conference._id)}
//                   className="join-button"
//                 >
//                   Join
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AdvocateConference;
