import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import http from 'http'

import { Server } from 'socket.io'

import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import meetingRoutes from './routes/meetingRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config()

connectDB()

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      'https://aether-b14x.onrender.com',
      'https://aether-theta-two.vercel.app'
    ],
    methods: ['GET', 'POST'],
  },
})
app.set('io', io)

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/meetings', meetingRoutes)
app.use('/api/admin', adminRoutes)

app.get('/', (req, res) => {
  res.send('Backend Running')
})

io.on('connection', (socket) => {

  console.log('User Connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})