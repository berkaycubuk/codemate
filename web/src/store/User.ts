import create from 'zustand'

type State = {
  user: {
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
}

interface User {
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

const useStore = create<State>(set => ({
  user: {
    githubId: '',
    username: '',
    displayName: '',
    githubAccessToken: '',
    favProgLang: '',
    bio: '',
    location: '',
    profileUrl: '',
    photoUrl: '',
  },
  setUser: (user) => set(() => ({ user: user }))
}))