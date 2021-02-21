import create from 'zustand'
import { User, UserStoreState } from '../types'

const initialUser = () : User => {
  return {
    _id: '',
    githubId: '',
    username: '',
    displayName: '',
    githubAccessToken: '',
    favProgLang: '',
    bio: '',
    location: '',
    blog: '',
    profileUrl: '',
    photoUrl: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

const useStore = create<UserStoreState>(set => ({
  user: initialUser(),
  setUser: (user: User) => set(() => ({ user: user })),
  clearUser: () => set(() => ({ user: initialUser() }))
}))

export default useStore