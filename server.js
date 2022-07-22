require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000

connectDB()

app.use(express.json())

app.use('/api/users', require('./routes/userRoutes'))
app.get('/', (req, res) => {
  res.send('Hi')
})
app.use((req, res) => {
  res.status(404).send('Page not found')
})

app.listen(PORT, () => {
  console.log('Listening on port 3000')
})
