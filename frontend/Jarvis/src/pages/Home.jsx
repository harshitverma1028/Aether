import { Link } from 'react-router-dom'

function Home() {

  return (
    <div className='min-h-screen bg-slate-950 text-white overflow-hidden'>

      {/* Navbar */}

      <nav className='flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-lg'>

        <h1 className='text-4xl font-bold text-cyan-400'>
          AETHER
        </h1>

        <div className='flex gap-5'>

          <Link
            to='/login'
            className='px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all'
          >
            Login
          </Link>

          

        </div>

      </nav>

      {/* Hero Section */}

      <div className='flex flex-col justify-center items-center text-center px-6 py-28'>

        <h1 className='text-7xl font-extrabold leading-tight max-w-6xl bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>

          AI-Powered Smart Workplace Management System

        </h1>

        <p className='text-slate-400 text-2xl mt-8 max-w-3xl leading-relaxed'>

          Manage tasks, meetings, analytics, AI insights,
          team collaboration, and voice-powered workflows
          with a futuristic enterprise platform.

        </p>

        <div className='flex gap-6 mt-12'>

          <Link
            to='/register'
            className='bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-xl font-semibold transition-all shadow-2xl shadow-cyan-500/40'
          >
            Start Free
          </Link>

          <Link
            to='/login'
            className='border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 rounded-2xl text-xl font-semibold transition-all'
          >
            Login
          </Link>

        </div>

      </div>

      {/* Features Section */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-24'>

        <div className='bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:border-cyan-500/50 transition-all'>

          <div className='text-5xl mb-6'>
            🤖
          </div>

          <h2 className='text-3xl font-bold mb-4 text-cyan-400'>
            AI Assistant
          </h2>

          <p className='text-slate-400 text-lg leading-relaxed'>
            Smart AI assistant for productivity insights,
            scheduling, recommendations, and workplace automation.
          </p>

        </div>

        <div className='bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:border-cyan-500/50 transition-all'>

          <div className='text-5xl mb-6'>
            📊
          </div>

          <h2 className='text-3xl font-bold mb-4 text-cyan-400'>
            Productivity Analytics
          </h2>

          <p className='text-slate-400 text-lg leading-relaxed'>
            Track employee performance, productivity trends,
            AI insights, and team collaboration metrics.
          </p>

        </div>

        <div className='bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:border-cyan-500/50 transition-all'>

          <div className='text-5xl mb-6'>
            🎤
          </div>

          <h2 className='text-3xl font-bold mb-4 text-cyan-400'>
            Voice Commands
          </h2>

          <p className='text-slate-400 text-lg leading-relaxed'>
            Control tasks, meetings, and AI workflows
            using modern voice-powered interactions.
          </p>

        </div>

      </div>

      {/* Footer */}

      <footer className='border-t border-white/10 py-8 text-center text-slate-500'>

        © 2026 Smart Office AI Platform|All rights reserved <br />Harshit Verma

      </footer>

    </div>
  )
}

export default Home