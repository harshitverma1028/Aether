function ActivityFeed() {
  const activities = [
    'Meeting scheduled with Design Team',
    'Backend API task completed',
    'AI generated weekly summary',
    'New employee joined workspace',
  ]

  return (
    <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl'>
      <h2 className='text-2xl font-bold mb-6 text-cyan-400'>
        Recent Activity
      </h2>

      <div className='flex flex-col gap-4'>
        {activities.map((item, index) => (
          <div
            key={index}
            className='bg-slate-900/60 p-4 rounded-xl border border-slate-800'
          > {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityFeed