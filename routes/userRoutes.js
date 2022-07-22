const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require('../controllers/userController')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById)

module.exports = router
