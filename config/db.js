const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Connected on ${conn.connection.host}`)
  } catch (error) {
    console.log('Cannot connect to database')
    process.exit(1)
  }
}

module.exports = connectDB
