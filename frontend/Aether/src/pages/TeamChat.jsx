import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function TeamChat() {

  return (
    <div className='flex bg-slate-950 min-h-screen text-white'>

      <Sidebar />

      <div className='flex-1 ml-72'>

        <Navbar />

        <div className='p-8'>

          <h1 className='text-4xl font-bold text-cyan-400 mb-8'>
            Team Chat
          </h1>

          <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 h-150 flex flex-col justify-between'>

            <div className='flex flex-col gap-5'>

              <div className='bg-cyan-500 text-black p-4 rounded-2xl w-fit'>
                Hello team 👋
              </div>

              <div className='bg-slate-800 p-4 rounded-2xl w-fit self-end'>
                AI assistant meeting starts in 10 mins.
              </div>

            </div>

            <div className='flex gap-4 mt-6'>

              <input
                type='text'
                placeholder='Type message...'
                className='flex-1 bg-slate-800 p-4 rounded-2xl outline-none'
              />

              <button className='bg-cyan-500 px-6 rounded-2xl'>
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default TeamChat