import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import {
  getMeetings,
  createMeeting,
  deleteMeeting,
} from '../services/meetingService'

function Meetings() {

  const [meetings, setMeetings] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    participants: '',
  })

  const fetchMeetings = async () => {
    try {

      const data = await getMeetings()

      setMeetings(data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMeetings()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      await createMeeting(formData)

      fetchMeetings()

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        participants: '',
      })

    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {

      await deleteMeeting(id)

      fetchMeetings()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex bg-transparent min-h-screen text-white'>

      <Sidebar />

      <div className='flex-1 ml-72'>

        <Navbar />

        <div className='p-8'>

          <h1 className='text-4xl font-bold mb-8'>
            Meetings
          </h1>

          <form
            onSubmit={handleSubmit}
            className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mb-10 flex flex-col gap-5'
          >

            <input
              type='text'
              name='title'
              placeholder='Meeting Title'
              value={formData.title}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            />

            <textarea
              name='description'
              placeholder='Meeting Description'
              value={formData.description}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            />

            <input
              type='date'
              name='date'
              value={formData.date}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            />

            <input
              type='time'
              name='time'
              value={formData.time}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            />

            <input
              type='text'
              name='participants'
              placeholder='Participants'
              value={formData.participants}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            />

            <button className='bg-cyan-500 py-4 rounded-xl hover:bg-cyan-600 transition-all'>
              Schedule Meeting
            </button>

          </form>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

            {meetings.map((meeting) => (

              <div
                key={meeting._id}
                className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6'
              >

                <div className='flex justify-between items-center'>

                  <h2 className='text-2xl font-bold'>
                    {meeting.title}
                  </h2>

                  <span className='bg-cyan-500 px-4 py-2 rounded-full text-sm'>
                    {meeting.status}
                  </span>
                </div>

                <p className='text-slate-300 mt-4'>
                  {meeting.description}
                </p>

                <p className='mt-4 text-cyan-400'>
                  📅 {meeting.date}
                </p>

                <p className='mt-2 text-cyan-400'>
                  ⏰ {meeting.time}
                </p>

                <p className='mt-2 text-slate-300'>
                  👥 {meeting.participants}
                </p>

                <button
                  onClick={() =>
                    handleDelete(meeting._id)
                  }
                  className='mt-5 bg-blue-600 px-5 py-3 rounded-xl hover:bg-red-600'
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Meetings