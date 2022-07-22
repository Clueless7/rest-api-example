const express = require('express')
const router = express.Router({ mergeParams: true })
const getCurrentUser = require('../middlewares/getCurrentUser')
const {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
} = require('../controllers/postController')

router
  .route('/')
  .get(getCurrentUser, getAllPosts)
  .post(getCurrentUser, createPost)
router
  .route('/:postId')
  .get(getCurrentUser, getPostById)
  .delete(getCurrentUser, deletePostById)

module.exports = router
