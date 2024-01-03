// socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5173'); // Adjust the URL to your server

export { socket };
