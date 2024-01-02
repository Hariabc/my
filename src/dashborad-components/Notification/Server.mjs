// server.mjs
import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io'; // Change the import

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server); // Change the usage

// Rest of the code...
// server.mjs
io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for custom event 'sendNotification'
  socket.on('sendNotification', (data) => {
    console.log('Received notification:', data);
    // Broadcast the notification to all connected clients
    io.emit('receiveNotification', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


const PORT = process.env.PORT || 5173;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
