import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AIAssistant from '../components/AIAssistant'

function AIAssistantPage() {

  return (
    <div className='flex bg-slate-950 min-h-screen text-white'>

      <Sidebar />

      <div className='flex-1 ml-72'>

        <Navbar />

        <div className='p-8'>

          <h1 className='text-4xl font-bold mb-8'>
            AI Assistant
          </h1>

          <AIAssistant />

        </div>

      </div>

    </div>
  )
}

export default AIAssistantPage