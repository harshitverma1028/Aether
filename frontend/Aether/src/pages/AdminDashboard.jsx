import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function AdminDashboard() {

  return (
    <div className='flex bg-slate-950 min-h-screen text-white'>

      <Sidebar />

      <div className='flex-1 ml-72'>

        <Navbar />

        <div className='p-8'>

          <h1 className='text-5xl font-bold text-cyan-400'>
            Admin Dashboard
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>

            <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6'>
              <h2 className='text-xl font-bold'>
                Total Employees
              </h2>

              <p className='text-5xl text-cyan-400 mt-5'>
                128
              </p>
            </div>

            <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6'>
              <h2 className='text-xl font-bold'>
                Active Meetings
              </h2>

              <p className='text-5xl text-cyan-400 mt-5'>
                34
              </p>
            </div>

            <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6'>
              <h2 className='text-xl font-bold'>
                AI Efficiency
              </h2>

              <p className='text-5xl text-cyan-400 mt-5'>
                92%
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard