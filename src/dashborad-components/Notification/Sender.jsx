// SenderComponent.js
import React, { useState,useEffect } from 'react';
import { socket } from './socket'; // Assuming you have a separate file for socket connection

function SenderComponent() {
  const [notificationText, setNotificationText] = useState('');
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
  

  const sendNotification = () => {
    // Emit the 'sendNotification' event to the server
    socket.emit('sendNotification', { text: notificationText });
    console.log("22")
  };

  return (
    <div>
      <input
        type="text"
        value={notificationText}
        onChange={(e) => setNotificationText(e.target.value)}
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
}

export default SenderComponent;
