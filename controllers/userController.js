const User = require('../models/userModel')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({
      message: 'Invalid id',
    })
  }
}

const createUser = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({
      message: 'Invalid data',
    })
    return
  }

  try {
    const createdUser = await User.create({
      username,
      password,
    })
    res.status(201).json(createdUser)
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
}

const updateUserById = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({
      message: 'Invalid data',
    })
    return
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        password,
      },
      {
        new: true,
      }
    )

    if (!updatedUser) {
      res.status(404).json({
        message: 'User not found',
      })
      return
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(404).json({
      message: 'Invalid id',
    })
  }
}

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
      res.status(404).json({
        message: 'User not found',
      })
      return
    }

    res.json(deletedUser)
  } catch (error) {
    res.status(404).json({
      message: 'Invalid id',
    })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
