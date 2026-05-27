function AIInsights() {
  return (
    <div className='bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 backdrop-blur-lg'>
      <h2 className='text-2xl font-bold text-cyan-400'>
        AI Insights
      </h2>

      <div className='mt-6 flex flex-col gap-4'>
        <div className='bg-slate-900/60 p-4 rounded-xl'>
          Productivity increased by 18% this week.
        </div>

        <div className='bg-slate-900/60 p-4 rounded-xl'>
          3 meetings are overlapping tomorrow.
        </div>

        <div className='bg-slate-900/60 p-4 rounded-xl'>
          AI recommends focus mode from 2 PM - 5 PM.
        </div>
      </div>
      </div>
  )
}

export default AIInsights