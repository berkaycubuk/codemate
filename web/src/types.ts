export interface User {
  _id: string
  githubId: string
  username: string
  displayName: string
  githubAccessToken: string
  favProgLang: string
  bio: string
  location: string
  blog: string
  profileUrl: string
  photoUrl: string
  createdAt: Date
  updatedAt: Date
}

export type UserStoreState = {
  user: User
  setUser: (user: User) => any
  clearUser: () => any
}