import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import useThemeStore from '../store/themeStore'

function Navbar() {
  const logout = useAuthStore((state) => state.logout)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  return (
    <div className='w-full bg-black/30 backdrop-blur-xl backdrop-blur-lg border-b border-white/10 p-5 flex justify-between items-center'>
      
      <div>
        <h1 className='text-4xl font-black tracking-wider bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'>
            AETHER
          </h1>

        <p className='text-slate-400 text-sm mt-1'>
          Smart AI-powered office management system
        </p>
      </div>

      <div className='flex items-center gap-5'>

        <input
          type='text'
          placeholder='Search...'
          className='bg-slate-800 px-4 py-3 rounded-xl outline-none border border-slate-700 text-white'
        />

        <button className='relative text-2xl hover:scale-110 transition-all'>
          🔔

          <span className='absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-full'></span>
        </button>

       
        

        <button
          onClick={handleLogout}
          className='bg-linear-to-r from-sky-300 to-blue-400 px-5 py-3 rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-400/20 text-white'
        >
          Logout
        </button>

        <div className='w-12 h-12 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-black'>
          H
        </div>
      </div>
    </div>
  )
}

export default Navbar