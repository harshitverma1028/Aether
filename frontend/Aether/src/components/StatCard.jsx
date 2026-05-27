import { motion } from 'framer-motion'

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-7 shadow-xl hover:shadow-cyan-500/20 transition-all'
    >
      <h3 className='text-slate-400 text-lg'>
        {title}
      </h3>

      <p className='text-5xl font-bold mt-5 text-cyan-400'>
        {value}
      </p>
    </motion.div>
  )
}

export default StatCard