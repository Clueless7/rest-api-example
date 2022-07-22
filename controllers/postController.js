const User = require('../models/userModel')
const Post = require('../models/postModel')

const getAllPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ author: req.user._id })
    res.status(200).json(userPosts)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getPostById = async (req, res) => {
  try {
    const userPost = await Post.findById(req.params.postId)

    if (!userPost) {
      res.status(404).json({
        message: 'Post not found',
      })
      return
    }

    res.status(200).json(userPost)
  } catch (error) {
    res.status(404).json({
      message: 'Invalid post id',
    })
  }
}

const createPost = async (req, res) => {
  const { title, body } = req.body

  if (!title || !body) {
    res.status(400).json({
      message: 'Invalid data',
    })
    return
  }

  try {
    const createdPost = await Post.create({
      title,
      body,
      author: req.user._id,
    })

    if (!createdPost) {
      res.status(500).json({
        message: 'Server cannot create post',
      })

      return
    }

    const pushedPostUser = await User.updateOne(
      { _id: req.user._id },
      { $push: { posts: createdPost._id } }
    )

    if (!pushedPostUser) {
      res.status(500).json({
        message: 'Server cannot push post to user',
      })
    }

    res.status(201).json(createdPost)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId)

    if (!deletedPost) {
      res.status(404).json({
        message: 'Post not found',
      })
      return
    }

    res.status(200).json(deletedPost)
  } catch (error) {
    res.status(404).json({
      message: 'Invalid post id',
    })
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
}
