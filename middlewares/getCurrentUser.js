const User = require('../models/userModel')

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
      return
    }

    req.user = user
    next()
  } catch (error) {
    res.status(404).json({
      message: 'Invalid id',
    })
  }
}

module.exports = getCurrentUser
