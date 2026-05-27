import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Mon', productivity: 65 },
  { name: 'Tue', productivity: 78 },
  { name: 'Wed', productivity: 90 },
  { name: 'Thu', productivity: 81 },
  { name: 'Fri', productivity: 96 },
]
function AnalyticsChart() {
  return (
    <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl'>
      <h2 className='text-2xl font-bold mb-6 text-cyan-400'>
        Productivity Analytics
      </h2>

      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <XAxis dataKey='name' stroke='#94a3b8' />
          <YAxis stroke='#94a3b8' />
          <Tooltip />

          <Line
            type='monotone'
            dataKey='productivity'
            stroke='#06b6d4'
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
export default AnalyticsChart