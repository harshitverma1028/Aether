import { useEffect, useState } from 'react'

function VoiceAssistant() {

  const [listening, setListening] = useState(false)

  const [transcript, setTranscript] = useState('')

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported')
      return
    }

    const recognition = new SpeechRecognition()

    recognition.continuous = false

    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setListening(true)
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognition.onresult = (event) => {

      const text =
        event.results[0][0].transcript

      setTranscript(text)

      handleCommand(text)
    }

    if (listening) {
      recognition.start()
    }

  }, [listening])

  const handleCommand = (command) => {

    const text = command.toLowerCase()

    if (text.includes('tasks')) {
      window.location.href = '/tasks'
    }

    else if (text.includes('meetings')) {
      window.location.href = '/meetings'
    }

    else if (text.includes('dashboard')) {
      window.location.href = '/'
    }

    else {
      alert(`Command received: ${command}`)
    }
  }
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
    <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mt-10'>

      <h2 className='text-3xl font-bold text-cyan-400 mb-6'>
        Voice Assistant
      </h2>

      <button
        onClick={() => setListening(true)}
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

      <div className='mt-6 bg-slate-900 p-5 rounded-2xl border border-slate-700'>

        <p className='text-slate-400'>
          Transcript:
        </p>

        <p className='mt-3 text-cyan-400 text-lg'>
          {transcript || 'No voice input yet'}
        </p>

      </div>

      <div className='mt-6 text-slate-400'>
        Try saying:
        <ul className='mt-3 flex flex-col gap-2 list-disc list-inside'>
          <li>Open tasks</li>
          <li>Show meetings</li>
          <li>Go to dashboard</li>
        </ul>
      </div>

    </div>
  )
}

export default VoiceAssistant