import Task from '../models/Task.js'

export const createTask = async (req, res) => {
  try {

    const task = await Task.create(req.body)

    // Get socket.io instance
    const io = req.app.get('io')

    // Emit real-time event
    io.emit('taskCreated', {
      message: 'New task created',
      task,
    })

    res.status(201).json(task)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

export const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find()

    res.json(tasks)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

export const updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    // Real-time update event
    const io = req.app.get('io')

    io.emit('taskUpdated', {
      message: 'Task updated',
      task,
    })

    res.json(task)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}

export const deleteTask = async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id)

    // Real-time delete event
    const io = req.app.get('io')

    io.emit('taskDeleted', {
      message: 'Task deleted',
    })

    res.json({
      message: 'Task deleted',
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })
  }
}