const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
})

module.exports = mongoose.model('User', userSchema)
