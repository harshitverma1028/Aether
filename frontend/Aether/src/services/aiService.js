import axios from 'axios'

const AI_API = 'http://127.0.0.1:8000'

export const askAI = async (prompt) => {

  const res = await axios.post(
    `${AI_API}/ask-ai`,
    { prompt }
  )

  return res.data.response
}