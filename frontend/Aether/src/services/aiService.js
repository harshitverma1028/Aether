import axios from 'axios'

const AI_API = 'https://aether-1-rqsx.onrender.com'

export const askAI = async (prompt) => {

  const res = await axios.post(
    `${AI_API}/ask-ai`,
    { prompt }
  )

  return res.data.response
}