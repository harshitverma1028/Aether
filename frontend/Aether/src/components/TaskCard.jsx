function TaskCard({ title, priority, status }) {
  return (
    <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold'>{title}</h2>

        <span className='text-sm bg-cyan-500 px-3 py-1 rounded-full'>
          {priority}
        </span>
      </div>

      <p className='text-slate-400 mt-4'>
        Status: {status}
      </p>
    </div>
  )
}

export default TaskCard