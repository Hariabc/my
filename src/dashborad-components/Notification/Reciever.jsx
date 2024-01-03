// ReceiverComponent.js
import React, { useEffect, useState } from 'react';
import { socket } from './socket'; // Assuming you have a separate file for socket connection

function ReceiverComponent() {
  const [notifications, setNotifications] = useState(["hi"]);
  // SenderComponent.js or ReceiverComponent.js
    useEffect(() => {
    const socket = io('http://localhost:5173'); // Adjust the URL to your server
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  
    // Cleanup the socket on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  

  useEffect(() => {
    // Listen for 'receiveNotification' events from the server
    socket.on('receiveNotification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    // Cleanup the socket listener on component unmount
    return () => {
      socket.off('receiveNotification');
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReceiverComponent;
