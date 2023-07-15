const Note = require('../model/Note')
const User = require('../model/User')
const asyncHandler = require('express-async-handler')

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find().lean()

  if (!user?.length) {
    return res.status(400).json({ message: 'No user found' })
  }
  

const createNewUser = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body
  if (!user || !title || !text) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const duplicate = await user.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()
  if (duplicate !== null) {
    return res.status(409).json({ message: 'Duplicate note title' })
  }

  const userObject = { user, title, text }
  const newUser = await user.create(noteObject)

  console.log(newUser)

  if (newUser) { // Created
    return res.status(201).json({ message: 'New  user created' })
  } else {
    return res.status(400).json({ message: 'Invalid user data received' })
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body

  if (!id || !user || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const note = await user.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const duplicate = await user.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate user title' })
  }

  user.user = user
  user.title = title
  user.text = text
  user.completed = completed

  const updatedUser = await user.save()

  res.json(`'${updatedUser.title}' updated`)
})

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'User ID required' })
  }

  const note = await user.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const result = await user.deleteUser()

  const reply = `User '${result.title}' with ID ${result._id} deleted`

  res.json(reply)
})

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}  
