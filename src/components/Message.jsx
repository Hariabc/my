// ChatComponent.js

import React, { useState, useEffect } from 'react';
import WebSocket from 'websocket';

const ChatComponent = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://your-websocket-server-url');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (message) => {
      const newMessages = [...messages, JSON.parse(message.data)];
      setMessages(newMessages);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close();
    };
  }, [messages]);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== '') {
      const messageObject = {
        username,
        message: inputMessage,
      };
      socket.send(JSON.stringify(messageObject));
      setInputMessage('');
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Chat</h2>
          <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.username}:</strong> {msg.message}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
