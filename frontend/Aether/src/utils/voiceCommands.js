import axios from 'axios'

export const handleVoiceCommand = async (
  command,
  logout
) => {

  const text =
    command.toLowerCase().trim()

  console.log(
    'Voice Command:',
    text
  )

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

      let title = text
        .replace('create task', '')
        .replace('add task', '')
        .trim()

      if (!title) {
        title = 'Untitled Task'
      }

      await axios.post(
        'https://aether-b14x.onrender.com/api/tasks',
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
        'https://aether-b14x.onrender.com/api/meetings',
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
    text.includes('open task') ||
    text.includes('show task') ||
    text.includes('task page')
  ) {

    window.location.href =
      '/tasks'

    return
  }

  // =========================
  // OPEN MEETINGS
  // =========================

  if (
    text.includes('open meetings') ||
    text.includes('show meetings') ||
    text.includes('open meeting') ||
    text.includes('show meeting') ||
    text.includes('meeting page')
  ) {

    window.location.href =
      '/meetings'

    return
  }

  // =========================
  // OPEN CALENDAR
  // =========================

  if (
    text.includes('calendar')
  ) {

    window.location.href =
      '/calendar'

    return
  }

  // =========================
  // OPEN ADMIN PANEL
  // =========================

  if (
    text.includes('admin')
  ) {

    window.location.href =
      '/admin'

    return
  }

  // =========================
  // OPEN AI ASSISTANT
  // =========================

  if (
    text.includes('ai assistant') ||
    text.includes('assistant')
  ) {

    window.location.href =
      '/ai-assistant'

    return
  }

  // =========================
  // DASHBOARD
  // =========================

  if (
    text.includes('dashboard') ||
    text.includes('home')
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