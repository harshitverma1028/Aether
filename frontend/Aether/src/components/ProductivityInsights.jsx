import { useEffect, useState } from 'react'

import { getInsights } from '../services/analyticsService'

function ProductivityInsights() {

  const [insights, setInsights] = useState([])

  useEffect(() => {

    const fetchInsights = async () => {

      try {

        const data = await getInsights()

        setInsights(data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchInsights()

  }, [])

  return (
    <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mt-10'>

      <h2 className='text-3xl font-bold text-cyan-400 mb-8'>
        AI Productivity Intelligence
      </h2>

      <div className='flex flex-col gap-5'>

        {insights.map((insight, index) => (

          <div
            key={index}
            className='bg-slate-900 border border-slate-700 rounded-2xl p-5'
          >

            <p className='text-lg text-slate-200'>
              🤖 {insight}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ProductivityInsights