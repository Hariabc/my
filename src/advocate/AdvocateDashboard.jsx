// import React from 'react'
// import Advocatenavbar from './advocatenavbar'
// import  './advocatenavbar.css'

// export default function AdvocateDashboard() {
//   return (
//     <>
//     <div className="hari">
//     <ul>
//           <li>
//             <a href="" >Home</a>
//           </li>
//           <li>
//             <a href="">About Us</a>
//           </li>
//           <li>
//             <a href="">Legal Services</a>
//           </li>
//           <li>
//             <a href="">Contact Us</a>
//           </li>
//           <li>
//             <a href="">Login/Register
//             </a>
//           </li>
//         </ul>
//     </div>
//     </>
//     )
// }
// Sidebar.js

import React, { useState } from 'react';
// import './Sidebar.css'; // Import your CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <button className="toggle-btn" onClick={toggleSidebar}>
        Toggle Sidebar
      </button><span><h1>hi</h1></span>
      {isOpen && (
        <div className="sidebar">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
