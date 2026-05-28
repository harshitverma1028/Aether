import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import useAuthStore from '../store/authStore'

function Login() {
  const navigate = useNavigate()

  const login = useAuthStore((state) => state.login)

  const [formData, setFormData] = useState({
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
      const res = await API.post('/auth/login', formData)

      login(res.data.user, res.data.token)

      navigate('/dashboard')
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
        <h1 className='text-4xl font-bold text-center text-cyan-400'>
          Smart Office Login
        </h1>

        <div className='mt-8 flex flex-col gap-5'>
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
            Login
          </button>

          <Link
            to='/register'
            className='text-center text-cyan-400'
          >
            Create new account
          </Link>
        </div>
      </form>
      </div>
  )
}

export default Login