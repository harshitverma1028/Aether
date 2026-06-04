import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import { handleVoiceCommand } from '../utils/voiceCommands'
import AetherOrb from './AetherOrb'

function WakeWordListener() {

  const [listening, setListening] =
    useState(false)

  const user = useAuthStore(
    (state) => state.user
  )

  const logout = useAuthStore(
    (state) => state.logout
  )

  useEffect(() => {

    if (!user) return

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {

      console.log(
        'Speech Recognition not supported'
      )

      return
    }

    let active = true

    const wakeRecognition =
      new SpeechRecognition()

    wakeRecognition.continuous = true

    wakeRecognition.interimResults = false

    wakeRecognition.lang = 'en-US'

    const startWakeRecognition = () => {

      if (!active) return

      try {

        wakeRecognition.start()

        console.log(
          'Wake Listener Started'
        )

      } catch (error) {

        console.log(error)

      }
    }

    wakeRecognition.onresult =
      (event) => {

        const text = String(
          event.results[
            event.results.length - 1
          ][0].transcript
        ).toLowerCase()

        console.log(
          'Wake Word:',
          text
        )

        if (

          text.includes('hey aether') ||

          text.includes('hey ether') ||

          text.includes('ether') ||

          text.includes('aether') ||

          text.includes('chirag') || 

          text.includes('gargi') ||
          text.includes('gaargi') ||
          text.includes('resona') ||
          text.includes('veyra') ||
          text.includes('invoca') ||
          text.includes('jarvis')
          

        ) {

          console.log(
            'Aether Activated'
          )

          setListening(true)

          wakeRecognition.stop()

          const speech =
            new SpeechSynthesisUtterance(
              'Yes Sir'
            )

          window.speechSynthesis.speak(
            speech
          )

          const commandRecognition =
            new SpeechRecognition()

          commandRecognition.lang =
            'en-US'

          commandRecognition.interimResults =
            false

          commandRecognition.continuous =
            false

          setTimeout(() => {

            try {

              commandRecognition.start()

            } catch (error) {

              console.log(error)

            }

          }, 1000)

          commandRecognition.onresult =
            async (event) => {

              const command =
                event.results[0][0]
                  .transcript

              console.log(
                'Command:',
                command
              )

              await handleVoiceCommand(
                command,
                logout
              )
            }

          commandRecognition.onend =
            () => {

              console.log(
                'Command Finished'
              )

              setListening(false)

              setTimeout(() => {

                startWakeRecognition()

              }, 1000)
            }

          commandRecognition.onerror =
            () => {

              setListening(false)

              setTimeout(() => {

                startWakeRecognition()

              }, 1000)
            }
        }
      }

    wakeRecognition.onend =
      () => {

        if (!active) return

        setTimeout(() => {

          startWakeRecognition()

        }, 8000)
      }

    wakeRecognition.onerror =
      (error) => {

        console.log(
          'Wake Error:',
          error
        )

        setTimeout(() => {

          startWakeRecognition()

        }, 8000)
      }

    startWakeRecognition()

    return () => {

      active = false

      wakeRecognition.stop()
    }

  }, [user, logout])

  return (
    <AetherOrb
      listening={listening}
    />
  )
}

export default WakeWordListener