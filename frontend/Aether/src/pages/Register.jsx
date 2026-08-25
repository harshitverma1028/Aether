import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

// Animated waveform bars for logo
function WaveBars() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '22px' }}>
      {[7, 14, 22, 14, 7].map((h, i) => (
        <div
          key={i}
          style={{
            width: '3px',
            height: `${h}px`,
            borderRadius: '1px',
            background: '#00D9FF',
            animation: `wave 0.9s ease-in-out infinite`,
            animationDelay: `${[0, 0.15, 0.3, 0.15, 0][i]}s`,
            boxShadow: '0 0 8px rgba(0,217,255,0.6)',
          }}
        />
      ))}
    </div>
  )
}

// Drifting signal particles
function Particles() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() > 0.7 ? '2px' : '1px',
            height: Math.random() > 0.7 ? '2px' : '1px',
            borderRadius: '50%',
            background: Math.random() > 0.85 ? '#39FF88' : '#00D9FF',
            left: `${Math.random() * 100}%`,
            animation: `floatUp ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  )
}

// Mic icon with signal pulse ring
function MicIcon() {
  return (
    <div style={{ position: 'relative', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', inset: -6, borderRadius: '50%',
        border: '1px solid rgba(255,46,136,0.6)',
        animation: 'pulseRing 1.6s ease-out infinite',
      }} />
      <svg
        width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="white" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10a7 7 0 0014 0" />
        <line x1="12" y1="21" x2="12" y2="17" />
        <line x1="8" y1="21" x2="16" y2="21" />
      </svg>
    </div>
  )
}

// HUD corner bracket
function CornerBracket({ position }) {
  const base = { position: 'absolute', width: 18, height: 18, borderColor: '#00D9FF', opacity: 0.6 }
  const styles = {
    tl: { ...base, top: -1, left: -1, borderTop: '2px solid', borderLeft: '2px solid', borderTopLeftRadius: 6 },
    tr: { ...base, top: -1, right: -1, borderTop: '2px solid', borderRight: '2px solid', borderTopRightRadius: 6 },
    bl: { ...base, bottom: -1, left: -1, borderBottom: '2px solid', borderLeft: '2px solid', borderBottomLeftRadius: 6 },
    br: { ...base, bottom: -1, right: -1, borderBottom: '2px solid', borderRight: '2px solid', borderBottomRightRadius: 6 },
  }
  return <div style={styles[position]} />
}

function Register() {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/auth/register', formData)
      navigate('/login')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap');

        * { box-sizing: border-box; }

        body {
          font-family: 'Inter', sans-serif;
          background: #04070C;
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

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }

        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .aether-inp {
          width: 100%;
          background: rgba(0, 217, 255, 0.04);
          border: 1px solid rgba(0, 217, 255, 0.14);
          border-radius: 8px;
          padding: 14px 16px 14px 44px;
          color: #EAF6FF;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }

        .aether-inp::placeholder { color: rgba(234,246,255,0.25); }

        .aether-inp:focus {
          border-color: rgba(0, 217, 255, 0.55);
          background: rgba(0, 217, 255, 0.07);
          box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
        }

        .aether-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #00B8D9, #00E08A);
          color: #04070C;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
          margin-top: 8px;
        }

        .aether-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(0, 217, 255, 0.35);
          filter: brightness(1.08);
        }

        .aether-btn:active {
          transform: translateY(0) scale(0.99);
        }

        .aether-btn svg { stroke: #04070C; }

        .aether-link {
          color: #00D9FF;
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .aether-link:hover { color: #39FF88; }

        .aether-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, #00647A, transparent)',
          filter: 'blur(90px)', opacity: 0.35, top: -100, left: -100,
          animation: 'drift1 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, #00A868, transparent)',
          filter: 'blur(90px)', opacity: 0.25, bottom: -80, right: -80,
          animation: 'drift2 15s ease-in-out infinite',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,217,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
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
          background: 'rgba(6,10,15,0.65)',
          border: '1px solid rgba(0,217,255,0.12)',
          borderRadius: 14, padding: 40,
          backdropFilter: 'blur(28px)',
          animation: 'cardIn 0.8s cubic-bezier(0.16,1,0.3,1) both',
          overflow: 'hidden',
        }}>
          {/* Scanline sweep */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '40%',
            background: 'linear-gradient(180deg, transparent, rgba(0,217,255,0.05), transparent)',
            animation: 'scan 6s linear infinite', pointerEvents: 'none',
          }} />

          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, animation: 'fadeUp 0.6s 0.2s both' }}>
              <WaveBars />
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 22, fontWeight: 700, letterSpacing: 4,
                color: '#EAF6FF',
              }}>
                AETHER
              </div>
            </div>

            <div className="aether-mono" style={{ fontSize: 11, color: 'rgba(234,246,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 28, animation: 'fadeUp 0.6s 0.3s both' }}>
              Voice Command Intelligence Platform
            </div>

            {/* Status line */}
            <div className="aether-mono" style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24,
              fontSize: 10, color: 'rgba(0,217,255,0.85)', letterSpacing: '1px',
              animation: 'fadeUp 0.6s 0.35s both',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', background: '#00D9FF',
                boxShadow: '0 0 6px #00D9FF', animation: 'blink 2s ease-in-out infinite',
              }} />
              NEW IDENTITY — PROVISIONING
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name field */}
              <div style={{ position: 'relative', marginBottom: 16, animation: 'fadeUp 0.6s 0.38s both' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,217,255,0.4)" strokeWidth="2" strokeLinecap="round"
                  style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>
                </svg>
                <input
                  type="text" name="name" placeholder="Enter your name"
                  onChange={handleChange} required className="aether-inp"
                />
              </div>

              {/* Email field */}
              <div style={{ position: 'relative', marginBottom: 16, animation: 'fadeUp 0.6s 0.4s both' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,217,255,0.4)" strokeWidth="2" strokeLinecap="round"
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,217,255,0.4)" strokeWidth="2" strokeLinecap="round"
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
                    {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
                  </div>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', animation: 'fadeUp 0.6s 0.65s both' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,217,255,0.1)' }} />
              <span className="aether-mono" style={{ fontSize: 10, color: 'rgba(234,246,255,0.25)', letterSpacing: 1 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,217,255,0.1)' }} />
            </div>

            {/* Login link */}
            <div style={{ textAlign: 'center', animation: 'fadeUp 0.6s 0.7s both' }}>
              <Link to="/login" className="aether-link">
                Already have an account? →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register