import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  displayName: {
    type: String
  },
  githubAccessToken: {
    type: String,
    required: true
  },
  favProgLang: {
    type: String,
    default: 'html'
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  profileUrl: {
    type: String
  },
  photoUrl: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
})

const User = mongoose.model('User', userSchema)
export = User