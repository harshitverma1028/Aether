import { io } from 'socket.io-client'

const socket = io('https://aether-b14x.onrender.com', {
  transports: ['polling', 'websocket'],
  withCredentials: true,
  autoConnect: true,
})

export default socket