import axios from 'axios'

const AI_API = 'http://127.0.0.1:8000'

export const getInsights = async () => {

  const res = await axios.get(
    `${AI_API}/productivity-insights`
  )

  return res.data.insights
}