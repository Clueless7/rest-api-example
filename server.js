require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000

connectDB()

app.use(express.json())

app.use('/api/users/:userId/posts', require('./routes/postRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err)
    return res.status(400).send({ status: 404, message: err.message }) // Bad request
  }
  next()
})

app.listen(PORT, () => {
  console.log('Listening on port 3000')
})
