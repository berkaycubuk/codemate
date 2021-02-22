import mongoose from 'mongoose'

const connectionSchema = new mongoose.Schema({
  userOne: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  userTwo: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

const Connection = mongoose.model('Connection', connectionSchema)
export = Connection