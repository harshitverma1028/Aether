import axios from 'axios'

const AI_API = 'https://aether-1-rqsx.onrender.com'

export const getInsights = async () => {

  const res = await axios.get(
    `${AI_API}/productivity-insights`
  )

  return res.data.insights
}