import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import socket from '../socket'
import NotificationPopup from '../components/NotificationPopup'

import {
  getTasks,
  createTask,
  deleteTask,
} from '../services/taskService'

function Tasks() {
    const [notification, setNotification] = useState('')

  const [tasks, setTasks] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  })

  const fetchTasks = async () => {
    try {
      const data = await getTasks()

      setTasks(data)
    } catch (error) {
      console.log(error)
    }
  }

 useEffect(() => {

  fetchTasks()

  socket.on('taskCreated', (data) => {

    fetchTasks()

    setNotification(data.message)

    setTimeout(() => {
      setNotification('')
    }, 3000)
  })

  return () => {
    socket.off('taskCreated')
  }

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
      await createTask(formData)

      fetchTasks()

      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)

      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex bg-slate-950 min-h-screen text-white'>
      
      <Sidebar />

      <div className='flex-1 ml-72'>
        
        <Navbar />

        <div className='p-8'>

          <h1 className='text-4xl font-bold mb-8'>
            Task Management
          </h1>

          <form
            onSubmit={handleSubmit}
            className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mb-10 flex flex-col gap-5'
          >

            <input
              type='text'
              name='title'
              placeholder='Task Title'
              value={formData.title}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            />

            <textarea
              name='description'
              placeholder='Task Description'
              value={formData.description}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            />

            <select
              name='priority'
              value={formData.priority}
              onChange={handleChange}
              className='bg-slate-800 p-4 rounded-xl outline-none'
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button className='bg-cyan-500 py-4 rounded-xl hover:bg-cyan-600 transition-all'>
              Create Task
            </button>
          </form>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

            {tasks.map((task) => (

              <div
                key={task._id}
                className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6'
              >

                <div className='flex justify-between items-center'>
                  
                  <h2 className='text-2xl font-bold'>
                    {task.title}
                  </h2>

                  <span className='bg-cyan-500 px-4 py-2 rounded-full text-sm'>
                    {task.priority}
                  </span>
                </div>

                <p className='text-slate-300 mt-4'>
                  {task.description}
                </p>

                <p className='mt-4 text-cyan-400'>
                  Status: {task.status}
                </p>

                <button
                  onClick={() => handleDelete(task._id)}
                  className='mt-5 bg-red-500 px-5 py-3 rounded-xl hover:bg-red-600'
                >
                  Delete
                </button>

              </div>
            ))}

          </div>

        </div>

      </div>
      <NotificationPopup message={notification} />

    </div>
  )
}

export default Tasks