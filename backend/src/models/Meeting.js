import mongoose from 'mongoose'

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    date: {
      type: String,
    },

    time: {
      type: String,
    },

    participants: {
      type: String,
    },

    status: {
      type: String,
      default: 'Scheduled',
    },
  },
  {
    timestamps: true,
  }
)

const Meeting = mongoose.model(
  'Meeting',
  meetingSchema
)

export default Meeting