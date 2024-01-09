// Apps.js

import React, { useState } from 'react';
import './temp.css';
import {
  IoHomeSharp,
  IoBriefcaseSharp,
  IoPersonSharp,
  IoLogOutSharp,
  IoChatbubblesSharp,
  IoSettingsSharp,
  IoHelpCircleSharp,
} from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import client from './assets/client.png';
import Chat from './Chat/Chat';
import Profile from './client/Profile'; // Import your Profile component

const Apps = () => {
  const [notifications, setNotifications] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleChatButtonClick = () => {
    setSelectedComponent(<Chat />);
  };

  const handleProfileClick = () => {
    setSelectedComponent(<Profile />);
  };

  const closeComponents = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <img
          src={client}
          alt=""
          style={{
            width: '50px',
            height: '50px',
            marginBottom: '100px',
          }}
        />
        <IoHomeSharp size={35} color="#fff" style={{ paddingTop: '5px' }} />
        <IoBriefcaseSharp size={35} color="#fff" style={{ paddingTop: '5px' }} />
        <IoPersonSharp
          size={40}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
          onClick={handleProfileClick}
        />
        <IoLogOutSharp size={35} color="#fff" style={{ paddingTop: '5px' }} />
        <IoChatbubblesSharp
          size={40}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
          onClick={handleChatButtonClick}
        />
        <IoSettingsSharp size={35} color="#fff" style={{ paddingTop: '5px' }} />
        <IoHelpCircleSharp
          size={40}
          color="#fff"
          style={{ paddingTop: '5px', cursor: 'pointer' }}
        />
      </div>

      <div className="main-content" onClick={closeComponents}>
        <div className="header">
          <div className="user-info">
            <div className="user-name">John Doe</div>
          </div>
          <div className="notification-icon" onClick={() => setNotifications(notifications + 1)}>
            {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            <IoNotificationsOutline size={30} />
          </div>
        </div>
      <div className="dashborad-element-container">
      <div className="selected-component-container">
          {selectedComponent && <div className="selected-component">{selectedComponent}</div>}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Apps;
