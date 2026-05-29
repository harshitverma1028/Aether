import { useRef, useState } from 'react'
import axios from 'axios'
import useAuthStore from '../store/authStore'

function VoiceAssistant() {

  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const recognitionRef = useRef(null)

  const logout = useAuthStore(
    (state) => state.logout
  )

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {

      alert(
        'Speech Recognition not supported in this browser'
      )

      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = 'en-US'

    recognition.continuous = false

    recognition.interimResults = false

    recognitionRef.current = recognition

    recognition.start()

    setListening(true)

    recognition.onresult = (event) => {

      const text =
        event.results[0][0].transcript

      console.log('Voice Command:', text)

      setTranscript(text)

      handleCommand(text)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognition.onerror = (event) => {

      console.log(event.error)

      setListening(false)

      alert(
        `Voice Error: ${event.error}`
      )
    }
  }

  const handleCommand = async (command) => {

    const text =
      command.toLowerCase().trim()

    console.log(text)

    // =========================
    // CREATE TASK
    // =========================

    if (
      text.includes('task') &&
      (
        text.includes('create') ||
        text.includes('add')
      )
    ) {

      try {

        let title = 'Untitled Task'

        const titleMatch =
          text.match(
            /(?:title|titled)\s(.*?)(?:description|$)/
          )

        if (titleMatch) {
          title = titleMatch[1].trim()
        }

        await axios.post(
          'http://localhost:5000/api/tasks',
          {
            title,
            priority: 'Medium',
            status: 'Pending'
          }
        )

        alert(
          `Task "${title}" created successfully`
        )

      } catch (error) {

        console.log(error)

        alert(
          'Failed to create task'
        )
      }

      return
    }

    // =========================
    // CREATE MEETING
    // =========================

    if (
      text.includes('meeting') &&
      (
        text.includes('schedule') ||
        text.includes('create')
      )
    ) {

      try {

        let title = text
          .replace('schedule', '')
          .replace('create', '')
          .replace('meeting', '')
          .trim()

        if (!title) {
          title = 'New Meeting'
        }

        await axios.post(
          'http://localhost:5000/api/meetings',
          {
            title,
            status: 'Scheduled'
          }
        )

        alert(
          `Meeting "${title}" scheduled successfully`
        )

      } catch (error) {

        console.log(error)

        alert(
          'Failed to schedule meeting'
        )
      }

      return
    }

    // =========================
    // OPEN TASKS
    // =========================

    if (
      text.includes('open tasks') ||
      text.includes('show tasks') ||
      text.includes('show task') ||
      text.includes('open task') ||
      text.includes('open task page') ||
      text.includes('show task page') 
    ) {

      window.location.href = '/tasks'

      return
    }

    // =========================
    // OPEN MEETINGS
    // =========================

    if (
      text.includes('open meetings') ||
      text.includes('show meetings')  ||
      text.includes('open meeting') ||
      text.includes('show meeting') ||
      text.includes('open meetings page') ||
      text.includes('show meetings page')  
    ) {

      window.location.href = '/meetings'

      return
    }

    // =========================
    // DASHBOARD
    // =========================

    if (
      text.includes('dashboard')
    ) {

      window.location.href =
        '/dashboard'

      return
    }

    // =========================
    // LOGOUT
    // =========================

    if (
      text.includes('logout') ||
      text.includes('log out') ||
      text.includes('sign out') ||
      text.includes('signout')
    ) {

      logout()

      localStorage.clear()

      window.location.href = '/'

      return
    }

    // =========================
    // UNKNOWN COMMAND
    // =========================

    alert(
      `Command not recognized:\n${command}`
    )
  }

  return (
    <div className='bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mt-10 shadow-xl'>

      <h2 className='text-3xl font-bold text-cyan-400 mb-6'>
        Voice Assistant
      </h2>

      <button
        onClick={startListening}
        className={`px-6 py-4 rounded-2xl text-lg font-semibold transition-all ${
          listening
            ? 'bg-red-500 animate-pulse'
            : 'bg-cyan-500 hover:bg-cyan-600'
        }`}
      >
        {listening
          ? 'Listening...'
          : 'Start Voice Command'}
      </button>

      <div className='mt-6 bg-black/40 p-5 rounded-2xl border border-white/10'>

        <p className='text-slate-400'>
          Transcript:
        </p>

        <p className='mt-3 text-cyan-400 text-lg'>
          {transcript ||
            'No voice input yet'}
        </p>

      </div>

      <div className='mt-6 text-slate-400'>

        Try saying:

        <ul className='mt-3 flex flex-col gap-2 list-disc list-inside'>

          <li>
            Create task title Build Dashboard
          </li>

          <li>
            Schedule meeting Team Sync
          </li>

          <li>
            Open tasks
          </li>

          <li>
            Open meetings
          </li>

          <li>
            Go to dashboard
          </li>

          <li>
            Logout
          </li>

        </ul>

      </div>

    </div>
  )
}

export default VoiceAssistant