import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ─── Floating Particle Component ─── */
function Particle({ x, y, size, duration, delay }) {
  return (
    <motion.div
      className='absolute rounded-full pointer-events-none'
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-linear(circle, rgba(139,92,246,0.6) 0%, rgba(6,182,212,0.2) 100%)`,
      }}
      animate={{
        y: [0, -40, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

/* ─── Animated Counter ─── */
function Counter({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, title, description, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className='group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 overflow-hidden cursor-default'
      style={{ '--accent': accent }}
    >
      {/* glow on hover */}
      <div
        className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl'
        style={{ background: `radial-linear(circle at 50% 0%, ${accent}18 0%, transparent 70%)` }}
      />
      <div
        className='absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500'
        style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
      />

      <div className='relative z-10'>
        <div
          className='mb-6 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl'
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
        >
          {icon}
        </div>
        <h3 className='mb-3 text-xl font-bold text-white'>{title}</h3>
        <p className='text-slate-400 leading-relaxed text-sm'>{description}</p>
      </div>
    </motion.div>
  )
}

/* ─── Step Card ─── */
function StepCard({ number, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className='flex gap-6 items-start'
    >
      <div className='shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-violet-600/30 to-indigo-600/30 border border-violet-500/30 flex items-center justify-center text-violet-300 font-black text-xl'>
        {number}
      </div>
      <div>
        <h4 className='text-white font-bold text-lg mb-1'>{title}</h4>
        <p className='text-slate-400 text-sm leading-relaxed'>{description}</p>
      </div>
    </motion.div>
  )
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ quote, name, role, avatar, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className='rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8'
    >
      <div className='flex gap-1 mb-4'>
        {[...Array(5)].map((_, i) => (
          <span key={i} className='text-violet-400 text-sm'>★</span>
        ))}
      </div>
      <p className='text-slate-300 leading-relaxed mb-6 text-sm italic'>"{quote}"</p>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm'>
          {avatar}
        </div>
        <div>
          <div className='text-white font-semibold text-sm'>{name}</div>
          <div className='text-slate-500 text-xs'>{role}</div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Pricing Card ─── */
function PricingCard({ plan, price, features, highlighted, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`relative rounded-3xl p-8 flex flex-col ${
        highlighted
          ? 'bg-linear-to-b from-violet-600/20 to-indigo-600/10 border border-violet-500/40'
          : 'bg-white/5 border border-white/10'
      } backdrop-blur-xl`}
    >
      {highlighted && (
        <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 text-xs font-bold text-white'>
          MOST POPULAR
        </div>
      )}
      <div className='mb-6'>
        <div className='text-slate-400 text-sm font-medium mb-2'>{plan}</div>
        <div className='text-white'>
          <span className='text-5xl font-black'>{price}</span>
          {price !== 'Free' && <span className='text-slate-400 text-sm ml-1'>/mo</span>}
        </div>
      </div>
      <ul className='space-y-3 flex-1 mb-8'>
        {features.map((f, i) => (
          <li key={i} className='flex items-center gap-3 text-sm text-slate-300'>
            <span className='w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs shrink-0'>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        to='/register'
        className={`w-full text-center py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
          highlighted
            ? 'bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/30'
            : 'border border-white/10 bg-white/5 hover:bg-white/10 text-white'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  )
}

/* ══════════════════════════════════
   MAIN HOME COMPONENT
══════════════════════════════════ */
function Home() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -80])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }))

  const features = [
    {
      icon: '🤖', title: 'AI Assistant', accent: '#8b5cf6',
      description: 'Intelligent AI assistant for workplace automation, smart recommendations, scheduling, and advanced real-time insights that learn from your workflow.',
    },
    {
      icon: '📊', title: 'Productivity Analytics', accent: '#06b6d4',
      description: 'Real-time productivity tracking, AI insights, collaboration metrics, and enterprise-grade reporting dashboards built for decision makers.',
    },
    {
      icon: '🎤', title: 'Voice Intelligence', accent: '#ec4899',
      description: 'Execute commands, manage workflows, and interact with your entire workspace using cutting-edge voice AI—hands-free, always on.',
    },
    {
      icon: '⚡', title: 'Real-Time Collaboration', accent: '#22d3ee',
      description: 'Live document co-editing, presence indicators, threaded comments, and instant notifications for teams across time zones.',
    },
    {
      icon: '📅', title: 'Smart Scheduling', accent: '#f472b6',
      description: 'AI-powered calendar that auto-resolves conflicts, suggests optimal meeting times, and integrates with all major calendar apps.',
    },
    {
      icon: '🌐', title: 'Workflow Automation', accent: '#34d399',
      description: 'Build no-code automation pipelines with 200+ integrations. Trigger actions across apps with intelligent conditional logic.',
    },
  ]

  const steps = [
    { number: '01', title: 'Create Your Workspace', description: 'Set up your personalized AETHER environment in under 60 seconds. Import your existing tools or start fresh.' },
    { number: '02', title: 'Connect Your Stack', description: 'Integrate with 200+ apps including Slack, Notion, Jira, Google Workspace, and your custom tools via API.' },
    { number: '03', title: 'Let AI Take the Wheel', description: 'AETHER learns your workflows, automates repetitive tasks, and surfaces insights you never knew existed.' },
    { number: '04', title: 'Scale With Confidence', description: 'From 5 to 5,000 team members, AETHER scales seamlessly with enterprise controls and dedicated support.' },
  ]

  const testimonials = [
    { quote: "AETHER cut our project turnaround time by 40%. The AI assistant feels like having a brilliant colleague available 24/7.", name: "Sarah Chen", role: "Head of Product, Finova Inc.", avatar: "SC", delay: 0 },
    { quote: "The voice intelligence feature alone saved our ops team 3 hours a day. The analytics dashboard is simply beautiful.", name: "Marcus Rivera", role: "COO, TechBridge Labs", avatar: "MR", delay: 0.1 },
    { quote: "We evaluated 12 platforms. AETHER's deep learning engine gives insights that others can't even dream of. Worth every penny.", name: "Priya Menon", role: "CTO, Axiom Ventures", avatar: "PM", delay: 0.2 },
  ]

  const pricing = [
    {
      plan: 'Starter', price: 'Free',
      features: ['Up to 5 users', 'Basic AI assistant', '10 automations/month', '5 GB storage', 'Email support'],
      highlighted: false,
    },
    {
      plan: 'Pro', price: '$29',
      features: ['Up to 50 users', 'Full AI assistant', 'Unlimited automations', '100 GB storage', 'Voice intelligence', 'Priority support', 'Advanced analytics'],
      highlighted: true,
    },
    {
      plan: 'Enterprise', price: '$99',
      features: ['Unlimited users', 'Custom AI models', 'Dedicated infrastructure', 'Unlimited storage', 'SSO & SAML', 'SLA guarantee', 'Dedicated CSM'],
      highlighted: false,
    },
  ]

  const integrations = ['Slack', 'Notion', 'Jira', 'GitHub', 'Figma', 'Salesforce', 'HubSpot', 'Zoom', 'Google', 'Microsoft', 'Stripe', 'Zapier']

  return (
    <div className='relative min-h-screen overflow-hidden bg-[#050816] text-white font-sans'>

      {/* ── Background Glows ── */}
      <div className='absolute -top-50 -left-25 h-125 w-125 rounded-full bg-violet-600/20 blur-3xl pointer-events-none' />
      <div className='absolute -bottom-50 -right-25 h-125 w-125 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-indigo-900/10 blur-3xl pointer-events-none' />

      {/* ── Grid Overlay ── */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none' />

      {/* ── Floating Particles ── */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        {particles.map(p => <Particle key={p.id} {...p} />)}
      </div>

      {/* ═══════════════════════ CONTENT ═══════════════════════ */}
      <div className='relative z-10'>

        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className='flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50'
        >
          <motion.h1
            className='text-4xl font-black tracking-wider bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'
            whileHover={{ scale: 1.04 }}
          >
            AETHER
          </motion.h1>

          <div className='hidden md:flex items-center gap-8 text-sm text-slate-400'>
            {['Features', 'How It Works', 'Pricing', 'Integrations'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className='hover:text-white transition-colors duration-300 cursor-pointer'>
                {item}
              </a>
            ))}
          </div>

          <div className='flex gap-4'>
            <Link to='/login'
              className='px-6 py-2.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 text-sm'>
              Login
            </Link>
            <Link to='/register'
              className='px-6 py-2.5 rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-violet-500/30 text-sm font-semibold'>
              Get Started
            </Link>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <motion.section
          style={{ y: heroY,  }}
          className='flex flex-col items-center justify-center text-center px-6 pt-32 pb-24'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className='mb-6 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-lg text-violet-300 text-xs tracking-[0.2em] font-semibold'
          >
            ✦ NEXT GENERATION AI WORKSPACE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className='max-w-6xl text-6xl md:text-8xl font-black leading-[1.05]'
          >
            <span className='bg-linear-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent'>
              AI-Powered Smart Workplace Management
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className='mt-10 max-w-3xl text-xl text-slate-400 leading-relaxed'
          >
            Transform workplace productivity using intelligent automation, voice-powered workflows,
            AI analytics, smart collaboration, and futuristic enterprise management.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className='mt-14 flex flex-wrap justify-center gap-6'
          >
            <Link to='/register'
              className='group relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 px-9 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl shadow-violet-500/30'>
              <span className='relative z-10'>Start Free Trial</span>
              <motion.div
                className='absolute inset-0 bg-white/10'
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Link>
            <Link to='/login'
              className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg px-9 py-4 text-lg font-semibold hover:bg-white/10 transition-all duration-300'>
              Watch Demo →
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className='mt-8 text-slate-500 text-sm'
          >
            No credit card required · 14-day free trial · Cancel anytime
          </motion.p>

          {/* Dashboard Preview */}
         <motion.div
  initial={{ opacity: 0, y: 60, scale: 0.95 }}
  animate={{
    opacity: 1,
    y: [0, -8, 0],
    scale: 1,
  }}
  transition={{
    opacity: { duration: 1 },
    y: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }}
  className='mt-20 w-full max-w-5xl mx-auto relative'
>
  <div className='relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.35)]'>

    {/* Background Glow */}
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      <div className='absolute top-10 left-20 w-72 h-72 bg-violet-5000/20 blur-[80px]' />
      <div className='absolute bottom-10 right-20 w-72 h-72 bg-cyan-8000/30 blur-[120px]' />
    </div>

    {/* Window Bar */}
    <div className='relative flex items-center gap-2 px-5 py-4 border-b border-white/20 bg-white/20'>
      <span className='w-3 h-3 rounded-full bg-red-500' />
      <span className='w-3 h-3 rounded-full bg-yellow-500' />
      <span className='w-3 h-3 rounded-full bg-green-500' />

      <div className='ml-4 flex-1 h-7 rounded-lg bg-white/10 flex items-center px-3'>
        <span className='text-slate-300 text-xs'>
          app.aether.ai/dashboard
        </span>
      </div>
    </div>

    {/* Dashboard Content */}
    <div className='relative p-6 grid grid-cols-4 gap-4'>

      {[
        {
          label: 'Tasks Automated',
          val: '1,284',
          color: 'from-violet-500/40 to-violet-500/10',
          accent: '#8b5cf6',
        },
        {
          label: 'Team Efficiency',
          val: '+47%',
          color: 'from-cyan-500/40 to-cyan-500/10',
          accent: '#06b6d4',
        },
        {
          label: 'Hours Saved',
          val: '320h',
          color: 'from-pink-500/40 to-pink-500/10',
          accent: '#ec4899',
        },
        {
          label: 'Active Members',
          val: '38',
          color: 'from-emerald-500/40 to-emerald-500/10',
          accent: '#10b981',
        },
      ].map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          whileHover={{
            y: -6,
            scale: 1.03,
          }}
          className={`rounded-2xl bg-linear-to-br ${stat.color}
          border p-4 backdrop-blur-md transition-all duration-300`}
          style={{
            borderColor: `${stat.accent}50`,
            boxShadow: `0 0 25px ${stat.accent}25`,
          }}
        >
          <div className='text-slate-200 text-sm font-medium mb-1'>
            {stat.label}
          </div>

          <div className='text-white text-3xl font-black tracking-tight'>
            {stat.val}
          </div>
        </motion.div>
      ))}

      {/* Productivity Chart */}
      <div className='col-span-3 rounded-2xl bg-white/10 border border-white/20 p-5 backdrop-blur-md'>
        <div className='text-white text-sm font-semibold mb-5'>
          Productivity Overview — Last 7 Days
        </div>

        <div className='flex items-end gap-3 h-28'>
          {[60, 80, 55, 90, 75, 95, 85].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 1 + i * 0.08,
                duration: 0.5,
                ease: 'easeOut',
              }}
              className='flex-1 rounded-t-xl origin-bottom'
              style={{
                height: `${h}%`,
                background:
                  'linear-gradient(to top, #8b5cf6, #06b6d4)',
                boxShadow:
                  '0 0 20px rgba(139,92,246,0.6)',
              }}
            />
          ))}
        </div>
      </div>

      {/* AI Status Card */}
      <div className='col-span-1 rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur-md flex flex-col justify-between'>
        <div>
          <div className='text-slate-200 text-sm font-semibold mb-4'>
            AI Status
          </div>

          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.9)]' />

            <span className='text-emerald-300 font-bold'>
              Online
            </span>
          </div>
        </div>

        <div className='text-slate-300 text-sm mt-5 space-y-1'>
          <div>Models Active: 3</div>
          <div>Queue: 0 Tasks</div>
          <div>Response Time: 0.4s</div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Fade */}
  <div className='absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#050816] to-transparent pointer-events-none' />
</motion.div>
        </motion.section>

        {/* ── STATS ── */}
        <section className='px-10 pb-24'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
            {[
              { val: 50000, suffix: '+', label: 'Active Users' },
              { val: 98, suffix: '%', label: 'Uptime SLA' },
              { val: 200, suffix: '+', label: 'Integrations' },
              { val: 4, suffix: 'B+', label: 'Tasks Automated' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='text-center p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl'
              >
                <div className='text-4xl font-black bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'>
                  <Counter target={s.val} suffix={s.suffix} />
                </div>
                <div className='text-slate-400 text-sm mt-1'>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id='features' className='px-10 pb-28'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <div className='inline-block mb-4 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300 text-xs tracking-widest font-semibold'>
              EVERYTHING YOU NEED
            </div>
            <h2 className='text-5xl font-black bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent'>
              Built for the Modern Enterprise
            </h2>
            <p className='mt-4 text-slate-400 text-lg max-w-2xl mx-auto'>
              Nine powerful pillars that redefine how teams collaborate, automate, and grow.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto'>
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.07} />
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id='how-it-works' className='px-10 pb-28'>
          <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center'>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='mb-12'
              >
                <div className='inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs tracking-widest font-semibold'>
                  HOW IT WORKS
                </div>
                <h2 className='text-5xl font-black bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight'>
                  From Setup to Supercharged in Minutes
                </h2>
              </motion.div>

              <div className='space-y-8'>
                {steps.map((s, i) => <StepCard key={s.number} {...s} delay={i * 0.1} />)}
              </div>
            </div>

            {/* Animated orb visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='relative flex items-center justify-center h-96'
            >
              {/* Rings */}
              {[180, 260, 340].map((size, i) => (
                <motion.div
                  key={i}
                  className='absolute rounded-full border border-violet-500/20'
                  style={{ width: size, height: size }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
                />
              ))}
              {/* Core */}
              <motion.div
                className='w-28 h-28 rounded-full bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-5xl shadow-2xl shadow-violet-500/50'
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                🤖
              </motion.div>
              {/* Orbiting icons */}
              {['⚡', '🧠', '☁️', '🔐'].map((icon, i) => (
                <motion.div
                  key={i}
                  className='absolute w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-2xl'
                  animate={{ rotate: [i * 90, i * 90 + 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  style={{
                    transformOrigin: '0 0',
                    left: '50%',
                    top: '50%',
                    marginLeft: -24,
                    marginTop: -120,
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── INTEGRATIONS ── */}
        <section id='integrations' className='px-10 pb-28 overflow-hidden'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-14'
          >
            <div className='inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs tracking-widest font-semibold'>
              INTEGRATIONS
            </div>
            <h2 className='text-5xl font-black bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent'>
              Works With Your Existing Stack
            </h2>
            <p className='mt-4 text-slate-400 max-w-xl mx-auto'>
              200+ native integrations. Connect in one click, no code required.
            </p>
          </motion.div>

          {/* Marquee */}
          <div className='relative'>
            <div className='absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#050816] to-transparent z-10 pointer-events-none' />
            <div className='absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#050816] to-transparent z-10 pointer-events-none' />
            <motion.div
              className='flex gap-6'
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...integrations, ...integrations].map((name, i) => (
                <div key={i}
                  className='shrink-0 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-slate-300 text-sm font-semibold whitespace-nowrap'>
                  {name}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className='px-10 pb-28'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-14'
          >
            <div className='inline-block mb-4 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-300 text-xs tracking-widest font-semibold'>
              TESTIMONIALS
            </div>
            <h2 className='text-5xl font-black bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent'>
              Loved by Forward-Thinking Teams
            </h2>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id='pricing' className='px-10 pb-28'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-14'
          >
            <div className='inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs tracking-widest font-semibold'>
              PRICING
            </div>
            <h2 className='text-5xl font-black bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent'>
              Simple, Transparent Pricing
            </h2>
            <p className='mt-4 text-slate-400 max-w-xl mx-auto'>
              Start free. Scale as you grow. No hidden fees, ever.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {pricing.map((p, i) => (
              <PricingCard key={p.plan} {...p} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className='px-10 pb-28'>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-violet-500/30 bg-linear-to-br from-violet-900/40 via-indigo-900/40 to-[#050816] p-16 text-center'
          >
            <div className='absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-size-[30px_30px]' />
            <motion.div
              className='absolute top-0 left-0 right-0 h-px'
              style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(6,182,212,0.8), transparent)' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className='relative z-10'>
              <div className='text-violet-300 text-sm tracking-widest font-semibold mb-4'>✦ START TODAY</div>
              <h2 className='text-5xl md:text-6xl font-black bg-linear-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent leading-tight mb-6'>
                Ready to Redefine<br />How Your Team Works?
              </h2>
              <p className='text-slate-400 text-lg max-w-xl mx-auto mb-10'>
                Join 50,000+ professionals already using AETHER to automate the mundane and amplify what matters.
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                <Link to='/register'
                  className='group relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 px-10 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl shadow-violet-500/30'>
                  <span className='relative z-10'>Start Free Trial</span>
                  <motion.div className='absolute inset-0 bg-white/10' initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
                </Link>
                <Link to='/login'
                  className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg px-10 py-4 text-lg font-semibold hover:bg-white/10 transition-all'>
                  Schedule Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className='border-t border-white/10 backdrop-blur-xl'>
          <div className='max-w-7xl mx-auto px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10'>
            <div className='col-span-2 md:col-span-1'>
              <h3 className='text-2xl font-black bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3'>AETHER</h3>
              <p className='text-slate-500 text-sm leading-relaxed'>The AI-powered workplace platform built for the enterprises of tomorrow.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Support', links: ['Docs', 'API Reference', 'Status', 'Contact'] },
            ].map(col => (
              <div key={col.title}>
                <div className='text-white font-semibold text-sm mb-4'>{col.title}</div>
                <ul className='space-y-2'>
                  {col.links.map(l => (
                    <li key={l}><a href='#' className='text-slate-500 text-sm hover:text-slate-300 transition-colors'>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className='border-t border-white/5 px-10 py-6 flex flex-col items-center gap-3 text-slate-500 text-sm'>
           <center> <span>© 2026 AETHER AI Platform · All rights reserved</span> <br />
             <span className='text-slate-300'>Harshit Verma</span></center>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default Home
