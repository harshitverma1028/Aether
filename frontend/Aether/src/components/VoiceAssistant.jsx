import { useEffect, useRef, useState } from 'react'
import useAuthStore from '../store/authStore'
import axios from 'axios'

function VoiceAssistant() {

  const [listening, setListening] = useState(false)

  const [transcript, setTranscript] = useState('')

  const [aiResponse, setAiResponse] = useState('')

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
        'Speech Recognition not supported'
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

      setTranscript(text)

      handleCommand(text)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognition.onerror = (event) => {

      console.log(event.error)

      setListening(false)
    }
  }

  const speakResponse = (text) => {

    const speech =
      new SpeechSynthesisUtterance(text)

    speech.lang = 'en-US'

    speech.rate = 1

    speech.pitch = 1

    window.speechSynthesis.speak(speech)
  }

  const handleCommand = async (command) => {

    const text = command.toLowerCase()

    console.log(text)

    // CREATE TASK USING VOICE

    if (
      text.includes('create task')
    ) {

      try {

        let title = 'Untitled Task'

        let description = ''

        // Extract title

        if (
          text.includes('title')
        ) {

          title =
            text.split('title')[1]
              ?.split('description')[0]
              ?.trim()
        }

        // Extract description

        if (
          text.includes('description')
        ) {

          description =
            text.split('description')[1]
              ?.trim()
        }

        // CREATE TASK API




        await axios.post(
          'http://localhost:5000/api/tasks',
          {
            title,
            description,
            priority: 'Medium',
            status: 'Pending',
          }
        )



        const successMessage =
          `Task ${title} created successfully`

        setAiResponse(successMessage)

        speakResponse(successMessage)

        // Refresh Tasks Page

        window.dispatchEvent(
          new Event('taskCreated')
        )

      } catch (error) {

        console.log(error)

        setAiResponse(
          'Failed to create task'
        )

        speakResponse(
          'Failed to create task'
        )
      }
    }

    // OPEN TASKS

    else if (
      text.includes('open tasks') ||
      text.includes('show tasks')
    ) {

      speakResponse('Opening tasks')

      window.location.href = '/tasks'
    }

    // OPEN MEETINGS

    else if (
      text.includes('open meetings') ||
      text.includes('show meetings')
    ) {

      speakResponse('Opening meetings')

      window.location.href = '/meetings'
    }

    // DASHBOARD

    else if (
      text.includes('dashboard')
    ) {

      speakResponse('Opening dashboard')

      window.location.href = '/dashboard'
    }

    // OPEN AI PAGE

    else if (
      text.includes('open ai')
    ) {

      speakResponse(
        'Opening AI assistant'
      )

      window.location.href =
        '/ai-assistant'
    }

    // LOGOUT

    else if (

      text.includes('logout') ||

      text.includes('log out') ||

      text.includes('sign out')

    ) {

      speakResponse('Logging out')

      logout()

      localStorage.clear()

      setTimeout(() => {

        window.location.replace('/')

      }, 1500)
    }

    // AI CHAT

    else {

      try {

        const response = await fetch(
          'http://127.0.0.1:8000/ask-ai',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              prompt: text,
            }),
          }
        )

        const data = await response.json()

        setAiResponse(data.response)

        speakResponse(data.response)

      } catch (error) {

        console.log(error)

        setAiResponse(
          'AI Service is not running'
        )

        speakResponse(
          'AI Service is not running'
        )
      }
    }
  }

  // External Trigger Listener

  useEffect(() => {

    const startVoice = () => {
      startListening()
    }

    window.addEventListener(
      'startVoiceAssistant',
      startVoice
    )

    return () => {

      window.removeEventListener(
        'startVoiceAssistant',
        startVoice
      )
    }

  }, [])

  return (
    <div className='bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mt-10 shadow-2xl shadow-cyan-500/10'>

      <h2 className='text-3xl font-bold text-cyan-400 mb-6'>
        Voice AI Assistant
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

      <div className='mt-6 bg-black/40 p-5 rounded-2xl border border-white/10'>

        <p className='text-slate-400'>
          AI Response:
        </p>

        <p className='mt-3 text-white leading-relaxed'>
          {aiResponse ||
            'AI response will appear here'}
        </p>

      </div>

      <div className='mt-6 text-slate-400'>

        Try saying:

        <ul className='mt-3 flex flex-col gap-2 list-disc list-inside'>

          <li>
            Create task title Build dashboard description Complete frontend UI
          </li>

          <li>Open tasks</li>

          <li>Show meetings</li>

          <li>Go to dashboard</li>

          <li>Open AI assistant</li>

          <li>Logout</li>

          <li>
            How can I improve productivity?
          </li>

          <li>
            Give motivation for developers
          </li>

        </ul>

      </div>

    </div>
  )
}

export default VoiceAssistant