import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import TaskCard from '../components/TaskCard'
import AnalyticsChart from '../components/AnalyticsChart'
import AIInsights from '../components/AIInsights'
import ActivityFeed from '../components/ActivityFeed'
import AIAssistant from '../components/AIAssistant'

import VoiceAssistant from '../components/VoiceAssistant'
import ProductivityInsights from '../components/ProductivityInsights'


function Dashboard() {
  return (
    <div className="flex bg-linear min-h-screen text-white">
      <Sidebar />

      <div className='flex-1 ml-72'>
        <Navbar />

        <div className='p-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <StatCard title='Total Tasks' value='28' />
            <StatCard title='Meetings Today' value='6' />
            <StatCard title='Productivity Score' value='92%' />
            <StatCard title='AI Efficiency' value='87%'/>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10'>
            <AnalyticsChart />
            
            <AIInsights />
          </div>

          <div className='mt-10'>
          <AIAssistant />
          </div>

          

          <div className='mt-10'>
         <ProductivityInsights />
        </div>

          <div className='mt-10'>
            <h2 className='text-3xl font-bold mb-6'>
              Recent Tasks
            </h2>
             <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <TaskCard
                title='Finish AI Integration'
                priority='High'
                status='Pending'
              />

              <TaskCard
                title='Design Dashboard UI'
                priority='Medium'
                status='In Progress'
              />
            </div>
          </div>



        



          <div className='mt-10'>
            <ActivityFeed />
          </div>
        </div>
        <div className='fixed bottom-8 right-8'>
          
        </div>
      </div>
    </div>
  )
}

export default Dashboard