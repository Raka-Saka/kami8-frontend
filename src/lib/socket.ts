import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

export default socket;
