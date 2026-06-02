import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
   const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await API.post('/auth/register', formData)

      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-transparent text-white'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8'
      >
        <h1 className='text-4xl font-black tracking-wider bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent' >
               <center>AETHER</center>
          </h1>

        <div className='mt-8 flex flex-col gap-5'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            onChange={handleChange}
            className='bg-slate-800 p-4 rounded-xl outline-none'
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={handleChange}
            className='bg-slate-800 p-4 rounded-xl outline-none'
          /> 
           <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleChange}
            className='bg-slate-800 p-4 rounded-xl outline-none'
          />

          <button className='bg-cyan-500 py-4 rounded-xl hover:bg-cyan-600 transition-all'>
            Register
          </button>

          <Link
            to='/login'
            className='text-center text-cyan-400'
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  )
  }

export default Register