import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import useAuthStore from '../store/authStore'
import socket from '../socket'
import WarpTransition from '../components/WarpTransition'

// Animated wave bars for logo
function WaveBars() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
      {[8, 16, 24, 16, 8].map((h, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            height: `${h}px`,
            borderRadius: '2px',
            background: 'linear-gradient(180deg, #a78bfa, #22d3ee)',
            animation: `wave 0.9s ease-in-out infinite`,
            animationDelay: `${[0, 0.15, 0.3, 0.15, 0][i]}s`,
          }}
        />
      ))}
    </div>
  )
}

// Floating particle dots
function Particles() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() > 0.7 ? '3px' : '2px',
            height: Math.random() > 0.7 ? '3px' : '2px',
            borderRadius: '50%',
            background: 'rgba(139,92,246,0.5)',
            left: `${Math.random() * 100}%`,
            animation: `floatUp ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: 0.2 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  )
}

// Mic icon SVG
function MicIcon() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="white" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ animation: 'pulseMic 2s ease-in-out infinite' }}
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0014 0" />
      <line x1="12" y1="21" x2="12" y2="17" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  )
}

function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
 const [formData, setFormData] = useState({
  email: '',
  password: ''
})

const [loading, setLoading] = useState(false)
const [showWarp, setShowWarp] = useState(false)
const [destination, setDestination] = useState('/dashboard')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('/auth/login', formData)
      login(res.data.user, res.data.token)
      socket.emit('userOnline', {
        id: res.data.user.id,
        name: res.data.user.name,
        role: res.data.user.role,
      })
      if (res.data.user.role === 'admin') {
        navigate('/admin')
      } else {
       setDestination('/dashboard')
      }
      setShowWarp(true)
      }
     catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>



    {showWarp && (
  <WarpTransition
    destination={destination}
    navigate={navigate}
  />
)}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

        * { box-sizing: border-box; }

        body {
          font-family: 'Inter', sans-serif;
          background: #030712;
          margin: 0;
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(1.4); opacity: 1; }
        }

        @keyframes floatUp {
          from { transform: translateY(100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          to { transform: translateY(-20px) translateX(40px); opacity: 0; }
        }

        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.1); }
        }

        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -30px) scale(1.15); }
        }

        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -40px); }
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }

        @keyframes pulseMic {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        .aether-inp {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px 16px 14px 44px;
          color: #fff;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }

        .aether-inp::placeholder { color: rgba(255, 255, 255, 0.25); }

        .aether-inp:focus {
          border-color: rgba(139, 92, 246, 0.5);
          background: rgba(139, 92, 246, 0.07);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
        }

        .aether-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #0891b2);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 8px;
        }

        .aether-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(124, 58, 237, 0.4);
          filter: brightness(1.08);
        }

        .aether-btn:active {
          transform: translateY(0) scale(0.99);
        }

        .aether-link {
          color: #a78bfa;
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .aether-link:hover { color: #22d3ee; }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, #7c3aed, transparent)',
          filter: 'blur(80px)', opacity: 0.35, top: -100, left: -100,
          animation: 'drift1 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, #06b6d4, transparent)',
          filter: 'blur(80px)', opacity: 0.35, bottom: -80, right: -80,
          animation: 'drift2 15s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, #8b5cf6, transparent)',
          filter: 'blur(80px)', opacity: 0.3, top: '50%', right: '20%',
          animation: 'drift3 10s ease-in-out infinite',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(139,92,246,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <Particles />

      {/* Main layout */}
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '24px', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          position: 'relative', width: 420, maxWidth: '100%',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: 40,
          backdropFilter: 'blur(40px)',
          animation: 'cardIn 0.8s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {/* Gradient border glow */}
          <div style={{
            position: 'absolute', inset: -1, borderRadius: 25, zIndex: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent 60%)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, animation: 'fadeUp 0.6s 0.2s both' }}>
              <WaveBars />
              <div style={{
                fontSize: 22, fontWeight: 900, letterSpacing: 4,
                background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                AETHER
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 32, animation: 'fadeUp 0.6s 0.3s both' }}>
              Voice Command Intelligence Platform
            </div>

            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20, animation: 'fadeUp 0.6s 0.35s both' }}>
              Sign in to continue
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <div style={{ position: 'relative', marginBottom: 16, animation: 'fadeUp 0.6s 0.4s both' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"
                  style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <input
                  type="email" name="email" placeholder="Enter your email"
                  onChange={handleChange} required className="aether-inp"
                />
              </div>

              {/* Password field */}
              <div style={{ position: 'relative', marginBottom: 16, animation: 'fadeUp 0.6s 0.5s both' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"
                  style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type="password" name="password" placeholder="Enter your password"
                  onChange={handleChange} required className="aether-inp"
                />
              </div>

              {/* Submit button */}
              <div style={{ animation: 'fadeUp 0.6s 0.6s both' }}>
                <button type="submit" className="aether-btn" disabled={loading}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <MicIcon />
                    {loading ? 'Signing in...' : 'Sign in'}
                  </div>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', animation: 'fadeUp 0.6s 0.65s both' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 1 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Register link */}
            <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s 0.7s both' }}>
              <Link to="/register" className="aether-link">
                Create a new account →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login