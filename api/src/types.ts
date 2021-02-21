import mongoose from 'mongoose'

export interface UserInfo {
  _id: mongoose.Types.ObjectId
  githubId: String
  username: String
  displayName: String
  githubAccessToken: String
  favProgLang: String
  bio: String
  location: String
  profileUrl: String
  photoUrl: String
}