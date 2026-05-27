import API from '../api/axios'

export const getMeetings = async () => {
  const res = await API.get('/meetings')

  return res.data
}

export const createMeeting = async (meetingData) => {
  const res = await API.post(
    '/meetings',
    meetingData
  )

  return res.data
}

export const deleteMeeting = async (id) => {
  const res = await API.delete(
    `/meetings/${id}`
  )

  return res.data
}