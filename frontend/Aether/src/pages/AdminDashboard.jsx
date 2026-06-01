import { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

import {
  FaUsers,
  FaTasks,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa'

function AdminDashboard() {

  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {

    try {

      const usersRes = await axios.get(
        'https://aether-b14x.onrender.com/api/admin/users'
      )

      const tasksRes = await axios.get(
        'https://aether-b14x.onrender.com/api/tasks'
      )

      const meetingsRes = await axios.get(
        'https://aether-b14x.onrender.com/api/meetings'
      )

      setUsers(usersRes.data)
      setTasks(tasksRes.data)
      setMeetings(meetingsRes.data)

    } catch (error) {

      console.log(error)
    }
  }

  const pendingTasks =
    tasks.filter(
      task =>
        task.status?.toLowerCase() !== 'completed'
    ).length

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 text-white'>

  <Navbar />

  <div className='p-8'>

        <div className='p-8'>

          <h1 className='text-5xl font-bold mb-2'>
            Admin Dashboard
          </h1>

          <p className='text-slate-400'>
            Monitor your entire workspace from one place
          </p>

          {/* Stats Cards */}

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10'>

            <div className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-slate-400'>
                  Total Users
                </h2>
                <FaUsers className='text-cyan-400 text-2xl' />
              </div>

              <p className='text-5xl font-bold mt-4'>
                {users.length}
              </p>
            </div>

            <div className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-slate-400'>
                  Total Tasks
                </h2>
                <FaTasks className='text-green-400 text-2xl' />
              </div>

              <p className='text-5xl font-bold mt-4'>
                {tasks.length}
              </p>
            </div>

            <div className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-slate-400'>
                  Meetings
                </h2>
                <FaCalendarAlt className='text-purple-400 text-2xl' />
              </div>

              <p className='text-5xl font-bold mt-4'>
                {meetings.length}
              </p>
            </div>

            <div className='bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6'>
              <div className='flex justify-between items-center'>
                <h2 className='text-slate-400'>
                  Pending Tasks
                </h2>
                <FaClock className='text-yellow-400 text-2xl' />
              </div>

              <p className='text-5xl font-bold mt-4'>
                {pendingTasks}
              </p>
            </div>

          </div>

          {/* Recent Users */}

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6 mt-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Recent Users
            </h2>

            <div className='overflow-x-auto'>

              <table className='w-full'>

                <thead>

                  <tr className='border-b border-white/10 text-left'>

                    <th className='py-3'>Name</th>
                    <th>Email</th>
                    <th>Role</th>

                  </tr>

                </thead>

                <tbody>

                  {users.slice(0, 5).map(user => (

                    <tr
                      key={user._id}
                      className='border-b border-white/5'
                    >

                      <td className='py-4'>
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.role}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Recent Tasks */}

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6 mt-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Recent Tasks
            </h2>

            <div className='space-y-4'>

              {tasks.slice(0, 5).map(task => (

                <div
                  key={task._id}
                  className='bg-black/20 rounded-2xl p-4'
                >

                  <h3 className='font-bold'>
                    {task.title}
                  </h3>

                  <p className='text-slate-400'>
                    {task.status}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Meetings */}

          <div className='bg-white/5 border border-white/10 rounded-3xl p-6 mt-10'>

            <h2 className='text-2xl font-bold mb-5'>
              Upcoming Meetings
            </h2>

            <div className='space-y-4'>

              {meetings.slice(0, 5).map(meeting => (

                <div
                  key={meeting._id}
                  className='bg-black/20 rounded-2xl p-4'
                >

                  <h3 className='font-bold'>
                    {meeting.title}
                  </h3>

                  <p className='text-slate-400'>
                    {meeting.status}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard