import mongoose from 'mongoose'

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log("connected")
  } catch (error) {
    throw new Error('Connection failed!')
  }
}

export default dbConnect
