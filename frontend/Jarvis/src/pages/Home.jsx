import { Link } from 'react-router-dom'

function Home() {

  return (

    <div className='relative min-h-screen overflow-hidden bg-[#050816] text-white'>

      {/* Background Glow */}

      <div className='absolute top-[-200px] left-[-100px] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-3xl'></div>

      <div className='absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl'></div>

      {/* Grid Overlay */}

      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]'></div>

      {/* Main Content */}

      <div className='relative z-10'>

        {/* Navbar */}

        <nav className='flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-xl'>

          <h1 className='text-4xl font-black tracking-wider bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'>
            AETHER
          </h1>

          <div className='flex gap-5'>

            <Link
              to='/login'
              className='px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300'
            >
              Login
            </Link>

            <Link
              to='/register'
              className='px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-violet-500/30'
            >
              Get Started
            </Link>

          </div>

        </nav>

        {/* Hero Section */}

        <section className='flex flex-col items-center justify-center text-center px-6 pt-32 pb-28'>

          <div className='mb-6 px-5 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 backdrop-blur-lg text-violet-300 text-sm tracking-wide'>
            NEXT GENERATION AI WORKSPACE
          </div>

          <h1 className='max-w-6xl text-6xl md:text-8xl font-black leading-[1.05]'>

            <span className='bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent'>

              AI-Powered Smart Workplace Management

            </span>

          </h1>

          <p className='mt-10 max-w-3xl text-xl text-slate-400 leading-relaxed'>

            Transform workplace productivity using intelligent automation,
            voice-powered workflows, AI analytics, smart collaboration,
            and futuristic enterprise management.

          </p>

          <div className='mt-14 flex flex-wrap justify-center gap-6'>

            <Link
              to='/register'
              className='group relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-9 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl shadow-violet-500/30'
            >

              <span className='relative z-10'>
                Start Free
              </span>

              <div className='absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all'></div>

            </Link>

            <Link
              to='/login'
              className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg px-9 py-4 text-lg font-semibold hover:bg-white/10 transition-all duration-300'
            >
              Login
            </Link>

          </div>

        </section>

        {/* Features */}

        <section className='grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-28'>

          <div className='group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-violet-500/40 transition-all duration-500 hover:-translate-y-2'>

            <div className='mb-6 text-6xl'>
              🤖
            </div>

            <h2 className='mb-4 text-3xl font-bold text-white'>
              AI Assistant
            </h2>

            <p className='text-slate-400 leading-relaxed text-lg'>
              Intelligent AI assistant for workplace automation,
              smart recommendations, scheduling, and advanced insights.
            </p>

          </div>

          <div className='group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2'>

            <div className='mb-6 text-6xl'>
              📊
            </div>

            <h2 className='mb-4 text-3xl font-bold text-white'>
              Productivity Analytics
            </h2>

            <p className='text-slate-400 leading-relaxed text-lg'>
              Real-time productivity tracking, AI insights,
              collaboration metrics, and enterprise reporting.
            </p>

          </div>

          <div className='group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-pink-500/40 transition-all duration-500 hover:-translate-y-2'>

            <div className='mb-6 text-6xl'>
              🎤
            </div>

            <h2 className='mb-4 text-3xl font-bold text-white'>
              Voice Intelligence
            </h2>

            <p className='text-slate-400 leading-relaxed text-lg'>
              Execute commands, manage workflows,
              and interact with your workspace using voice AI.
            </p>

          </div>

        </section>

        {/* Footer */}

        <footer className='border-t border-white/10 py-8 text-center text-slate-500 backdrop-blur-xl'>

          © 2026 AETHER AI Platform · All rights reserved

        </footer>

      </div>

    </div>

  )
}

export default Home